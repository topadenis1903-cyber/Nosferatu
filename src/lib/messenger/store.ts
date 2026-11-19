import { create } from "zustand";
import { buildSeed } from "./seed";
import { pickReply } from "./replies";
import {
  newId,
  patternFrom,
  type Chat,
  type FolderId,
  type Gender,
  type Me,
  type Message,
  type MessageKind,
} from "./model";

const KEY = "nord-messenger-v1";

type Data = {
  me: Me;
  chats: Chat[];
  messages: Message[];
  drafts: Record<string, string>;
  activeId: string | null;
};

export type Outgoing = {
  kind: MessageKind;
  text?: string;
  voiceSec?: number;
  photo?: string;
  fileName?: string;
  fileSize?: string;
};

type MessengerState = Data & {
  folder: FolderId;
  listQuery: string;
  profileOpen: boolean;
  settingsOpen: boolean;
  createOpen: boolean;
  replyToId: string | null;
  editingId: string | null;
  editBackup: string | null;
  typing: Record<string, string>;
  pulseId: string | null;
  unreadMarker: { chatId: string; messageId: string } | null;
  threadSearch: string;
  threadSearchOpen: boolean;
  focusMessageId: string | null;
  setFolder: (folder: FolderId) => void;
  setListQuery: (query: string) => void;
  setActive: (id: string | null) => void;
  setProfileOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  setCreateOpen: (open: boolean) => void;
  setThreadSearchOpen: (open: boolean) => void;
  setThreadSearch: (query: string) => void;
  setDraft: (chatId: string, text: string) => void;
  startReply: (messageId: string) => void;
  startEdit: (messageId: string) => void;
  cancelComposerMode: () => void;
  sendCurrent: (chatId: string) => void;
  sendSpecial: (chatId: string, partial: Outgoing) => void;
  toggleReaction: (messageId: string, emoji: string) => void;
  deleteMessage: (messageId: string) => void;
  togglePin: (chatId: string) => void;
  toggleMute: (chatId: string) => void;
  updateMe: (patch: Partial<Me>) => void;
  createChat: (name: string) => void;
  openDirect: (name: string, gender: Gender) => void;
  saveToSaved: (messageId: string) => void;
  focusMessage: (messageId: string) => void;
  clearFocus: () => void;
  resetDemo: () => void;
};

const replyTimers = new Map<string, number>();

function snapshot(data: Data) {
  return {
    v: 1,
    me: data.me,
    chats: data.chats,
    messages: data.messages,
    drafts: data.drafts,
    activeId: data.activeId,
  };
}

function emptyUi() {
  return {
    folder: "all" as FolderId,
    listQuery: "",
    profileOpen: false,
    settingsOpen: false,
    createOpen: false,
    replyToId: null,
    editingId: null,
    editBackup: null,
    typing: {} as Record<string, string>,
    pulseId: null,
    unreadMarker: null,
    threadSearch: "",
    threadSearchOpen: false,
    focusMessageId: null,
  };
}

function loadData(): Data {
  const fresh = buildSeed();
  const blank: Data = { ...fresh, drafts: {}, activeId: null };
  if (typeof window === "undefined") return blank;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return blank;
    const parsed = JSON.parse(raw) as Partial<Data> & { v?: number };
    if (!parsed || parsed.v !== 1 || !parsed.me || !Array.isArray(parsed.chats) || !Array.isArray(parsed.messages)) {
      return blank;
    }
    const activeId = parsed.chats.some((chat) => chat.id === parsed.activeId) ? (parsed.activeId ?? null) : null;
    return {
      me: {
        name: String(parsed.me.name || fresh.me.name),
        username: String(parsed.me.username || fresh.me.username),
        about: String(parsed.me.about || ""),
      },
      chats: parsed.chats,
      messages: parsed.messages,
      drafts: parsed.drafts && typeof parsed.drafts === "object" ? parsed.drafts : {},
      activeId,
    };
  } catch {
    return blank;
  }
}

export function notify(
  title: string,
  description?: string,
  action?: { label: string; onClick: () => void },
) {
  if (typeof window === "undefined") return;
  void import("sonner").then(({ toast }) => {
    toast(title, {
      description,
      action: action ? { label: action.label, onClick: action.onClick } : undefined,
    });
  });
}

function clearReplyTimer(chatId: string) {
  const prev = replyTimers.get(chatId);
  if (prev) window.clearTimeout(prev);
  replyTimers.delete(chatId);
}

export const useMessenger = create<MessengerState>((set, get) => ({
  ...loadData(),
  ...emptyUi(),

  setFolder: (folder) => set({ folder }),
  setListQuery: (listQuery) => set({ listQuery }),
  setProfileOpen: (profileOpen) => set({ profileOpen }),
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
  setCreateOpen: (createOpen) => set({ createOpen }),
  setThreadSearchOpen: (threadSearchOpen) =>
    set(threadSearchOpen ? { threadSearchOpen } : { threadSearchOpen, threadSearch: "" }),
  setThreadSearch: (threadSearch) => set({ threadSearch }),
  setDraft: (chatId, text) => set((s) => ({ drafts: { ...s.drafts, [chatId]: text.slice(0, 4000) } })),

  setActive: (id) => {
    const s = get();
    let drafts = s.drafts;
    if (s.editingId) {
      const editing = s.messages.find((m) => m.id === s.editingId);
      if (editing) drafts = { ...drafts, [editing.chatId]: s.editBackup ?? "" };
    }
    const first = id
      ? s.messages.find(
          (m) => m.chatId === id && m.senderId !== "me" && m.senderId !== "system" && !m.read,
        )
      : undefined;
    const needsRead = Boolean(
      id && s.messages.some((m) => m.chatId === id && m.senderId !== "me" && !m.read),
    );
    set({
      activeId: id,
      drafts,
      replyToId: null,
      editingId: null,
      editBackup: null,
      threadSearch: "",
      threadSearchOpen: false,
      profileOpen: false,
      unreadMarker: first && id ? { chatId: id, messageId: first.id } : null,
      messages: needsRead
        ? s.messages.map((m) => (m.chatId === id && m.senderId !== "me" ? { ...m, read: true } : m))
        : s.messages,
    });
  },

  startReply: (messageId) => {
    const message = get().messages.find((m) => m.id === messageId);
    if (!message || message.kind === "system") return;
    if (get().editingId) get().cancelComposerMode();
    set({ replyToId: messageId, editingId: null, editBackup: null });
  },

  startEdit: (messageId) => {
    const s = get();
    const message = s.messages.find((m) => m.id === messageId);
    if (!message || message.senderId !== "me" || message.kind !== "text") return;
    set({
      editingId: messageId,
      replyToId: null,
      editBackup: s.drafts[message.chatId] ?? "",
      drafts: { ...s.drafts, [message.chatId]: message.text },
    });
  },

  cancelComposerMode: () => {
    const s = get();
    if (s.editingId) {
      const message = s.messages.find((m) => m.id === s.editingId);
      if (message) {
        set({
          editingId: null,
          replyToId: null,
          editBackup: null,
          drafts: { ...s.drafts, [message.chatId]: s.editBackup ?? "" },
        });
        return;
      }
    }
    set({ editingId: null, replyToId: null, editBackup: null });
  },

  sendCurrent: (chatId) => {
    const s = get();
    const text = (s.drafts[chatId] ?? "").trim();
    if (!text) return;
    if (s.editingId) {
      set({
        messages: s.messages.map((m) => (m.id === s.editingId ? { ...m, text, edited: true } : m)),
        drafts: { ...s.drafts, [chatId]: "" },
        editingId: null,
        editBackup: null,
        replyToId: null,
      });
      return;
    }
    const message: Message = {
      id: newId("m"),
      chatId,
      senderId: "me",
      text,
      createdAt: Date.now(),
      kind: "text",
      read: false,
      replyToId: s.replyToId ?? undefined,
      reactions: [],
    };
    set({
      messages: [...s.messages, message],
      drafts: { ...s.drafts, [chatId]: "" },
      replyToId: null,
      pulseId: message.id,
    });
    window.setTimeout(() => {
      if (get().pulseId === message.id) set({ pulseId: null });
    }, 400);
    scheduleReply(chatId, text);
  },

  sendSpecial: (chatId, partial) => {
    const s = get();
    if (s.editingId) return;
    const caption = (partial.text ?? s.drafts[chatId] ?? "").trim();
    const message: Message = {
      id: newId("m"),
      chatId,
      senderId: "me",
      text: partial.kind === "text" ? caption : caption,
      createdAt: Date.now(),
      kind: partial.kind,
      read: false,
      replyToId: s.replyToId ?? undefined,
      reactions: [],
      voiceSec: partial.voiceSec,
      photo: partial.photo,
      fileName: partial.fileName,
      fileSize: partial.fileSize,
    };
    set({
      messages: [...s.messages, message],
      drafts: { ...s.drafts, [chatId]: "" },
      replyToId: null,
      pulseId: message.id,
    });
    const hint =
      partial.kind === "photo"
        ? `фото ${caption}`
        : partial.kind === "voice"
          ? "послушай голосовое"
          : partial.kind === "file"
            ? "смотри файл"
            : caption;
    scheduleReply(chatId, hint);
  },

  toggleReaction: (messageId, emoji) => {
    set({
      messages: get().messages.map((m) => {
        if (m.id !== messageId) return m;
        const reactions = [...m.reactions];
        const index = reactions.findIndex((r) => r.emoji === emoji);
        if (index === -1) reactions.push({ emoji, mine: true, others: 0 });
        else if (reactions[index].mine) {
          if (reactions[index].others === 0) reactions.splice(index, 1);
          else reactions[index] = { ...reactions[index], mine: false };
        } else reactions[index] = { ...reactions[index], mine: true };
        return { ...m, reactions };
      }),
    });
  },

  deleteMessage: (messageId) => {
    const message = get().messages.find((m) => m.id === messageId);
    if (!message) return;
    set({
      messages: get().messages.filter((m) => m.id !== messageId),
      replyToId: get().replyToId === messageId ? null : get().replyToId,
    });
    notify("Сообщение удалено", undefined, {
      label: "Вернуть",
      onClick: () => {
        const cur = get().messages;
        if (cur.some((m) => m.id === message.id)) return;
        set({
          messages: [...cur, message].sort((a, b) => a.createdAt - b.createdAt),
        });
      },
    });
  },

  togglePin: (chatId) =>
    set({
      chats: get().chats.map((chat) => (chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat)),
    }),
  toggleMute: (chatId) =>
    set({
      chats: get().chats.map((chat) => (chat.id === chatId ? { ...chat, muted: !chat.muted } : chat)),
    }),
  updateMe: (patch) => set((s) => ({ me: { ...s.me, ...patch } })),

  createChat: (name) => {
    const title = name.trim().slice(0, 40);
    if (!title) return;
    const id = newId("c");
    const chat: Chat = {
      id,
      kind: "direct",
      title,
      about: "Личный чат",
      gender: "n",
      pinned: false,
      muted: false,
      pattern: patternFrom(id),
      createdAt: Date.now(),
    };
    set((s) => ({ chats: [...s.chats, chat], createOpen: false, folder: "all", listQuery: "" }));
    get().setActive(id);
  },

  openDirect: (name, gender) => {
    const title = name.trim();
    if (!title) return;
    const existing = get().chats.find((chat) => chat.kind === "direct" && chat.title === title);
    if (existing) {
      get().setActive(existing.id);
      return;
    }
    const id = newId("c");
    const chat: Chat = {
      id,
      kind: "direct",
      title,
      about: "Личный чат",
      gender,
      pinned: false,
      muted: false,
      pattern: patternFrom(id),
      createdAt: Date.now(),
    };
    set((s) => ({ chats: [...s.chats, chat] }));
    get().setActive(id);
  },

  saveToSaved: (messageId) => {
    const message = get().messages.find((m) => m.id === messageId);
    if (!message || message.kind === "system") return;
    if (message.chatId === "saved") {
      notify("Уже в избранном");
      return;
    }
    const copy: Message = {
      ...message,
      id: newId("m"),
      chatId: "saved",
      senderId: "me",
      createdAt: Date.now(),
      read: true,
      replyToId: undefined,
      reactions: [],
    };
    set({ messages: [...get().messages, copy] });
    notify("В избранном");
  },

  focusMessage: (messageId) => set({ focusMessageId: messageId, profileOpen: false }),
  clearFocus: () => set({ focusMessageId: null }),

  resetDemo: () => {
    for (const timer of replyTimers.values()) window.clearTimeout(timer);
    replyTimers.clear();
    const fresh = buildSeed();
    set({
      ...fresh,
      drafts: {},
      activeId: null,
      ...emptyUi(),
    });
    notify("Демо-чаты возвращены");
  },
}));

function scheduleReply(chatId: string, userText: string) {
  const chat = useMessenger.getState().chats.find((item) => item.id === chatId);
  if (!chat || chat.kind === "saved" || chat.kind === "channel") return;
  clearReplyTimer(chatId);
  let senderId = chatId;
  let label = "печатает…";
  if (chat.kind === "group" && chat.members && chat.members.length > 0) {
    const member = chat.members[Math.floor(Math.random() * chat.members.length)];
    senderId = member.id;
    label = `${member.name.split(" ")[0]} печатает…`;
  }
  useMessenger.setState((s) => ({ typing: { ...s.typing, [chatId]: label } }));
  const delay = 900 + Math.random() * 1200;
  const timer = window.setTimeout(() => {
    replyTimers.delete(chatId);
    const state = useMessenger.getState();
    const current = state.chats.find((item) => item.id === chatId);
    if (!current) return;
    const text = pickReply(chatId, userText);
    const message: Message = {
      id: newId("m"),
      chatId,
      senderId,
      text,
      createdAt: Date.now(),
      kind: "text",
      read: state.activeId === chatId,
      reactions: [],
    };
    const typing = { ...state.typing };
    delete typing[chatId];
    useMessenger.setState({
      messages: [
        ...state.messages.map((item) =>
          item.chatId === chatId && item.senderId === "me" ? { ...item, read: true } : item,
        ),
        message,
      ],
      typing,
      pulseId: message.id,
    });
    window.setTimeout(() => {
      if (useMessenger.getState().pulseId === message.id) useMessenger.setState({ pulseId: null });
    }, 400);
    if (state.activeId !== chatId && !current.muted) {
      notify(current.title, text.slice(0, 140));
    }
  }, delay);
  replyTimers.set(chatId, timer);
}

if (typeof window !== "undefined") {
  useMessenger.subscribe((state, prev) => {
    if (
      state.me === prev.me &&
      state.chats === prev.chats &&
      state.messages === prev.messages &&
      state.drafts === prev.drafts &&
      state.activeId === prev.activeId
    ) {
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(snapshot(state)));
    } catch {
      /* ignore quota */
    }
  });
}
