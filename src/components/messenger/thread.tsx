import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import {
  ArrowLeft,
  ArrowUp,
  Bell,
  BellOff,
  Bookmark,
  Check,
  CheckCheck,
  ChevronDown,
  Copy,
  FileText,
  Image as ImageIcon,
  Info,
  Mic,
  MoreHorizontal,
  Paperclip,
  Pause,
  Pencil,
  Pin,
  PinOff,
  Play,
  Reply,
  Search,
  Smile,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/cn";
import {
  clock,
  dayLabel,
  EMOJI,
  isSameDay,
  messagePreview,
  patternFrom,
  presence,
  REACTIONS,
  senderName,
  takePhoto,
  waveBars,
  type Chat,
  type Message,
} from "@/lib/messenger/model";
import { notify, useMessenger } from "@/lib/messenger/store";
import { Avatar } from "./avatar";
import { IconButton } from "./ui";
import { useDesktop } from "./use-client";

function sameCluster(list: Message[], index: number, dir: -1 | 1) {
  const a = list[index];
  const b = list[index + dir];
  if (!a || !b) return false;
  if (a.kind === "system" || b.kind === "system") return false;
  if (a.senderId !== b.senderId) return false;
  if (!isSameDay(a.createdAt, b.createdAt)) return false;
  return Math.abs(a.createdAt - b.createdAt) < 5 * 60 * 1000;
}

function ChatPhoto({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div className="mb-1 grid h-36 place-items-center rounded-xl bg-ink px-3 text-center text-sm text-muted">{alt}</div>;
  }
  return (
    <img
      src={src}
      alt={alt}
      className="mb-1 max-h-64 w-full rounded-xl object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function VoiceNote({ id, seconds, text, mine }: { id: string; seconds: number; text: string; mine: boolean }) {
  const bars = useMemo(() => waveBars(id), [id]);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const started = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      const ratio = Math.min(1, (now - started) / (seconds * 1000));
      setProgress(ratio);
      if (ratio < 1) frame = requestAnimationFrame(loop);
      else setPlaying(false);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [playing, seconds]);

  const shown = playing ? Math.round(progress * seconds) : seconds;
  return (
    <div className="min-w-56">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={playing ? "Пауза" : "Слушать"}
          onClick={(event) => {
            event.stopPropagation();
            if (playing) {
              setPlaying(false);
              return;
            }
            setProgress(0);
            setPlaying(true);
          }}
          className={cn(
            "tap grid size-11 shrink-0 place-items-center rounded-full",
            mine ? "bg-ink/40 text-fg" : "bg-accent text-accent-ink",
          )}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <span className="flex h-8 flex-1 items-center gap-0.5" aria-hidden="true">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn("w-0.5 rounded-full", index / bars.length < progress ? "bg-accent" : "bg-fg/35")}
              style={{ height: `${height}%` }}
            />
          ))}
        </span>
        <span className="text-xs tabular-nums text-fg/70">
          {Math.floor(shown / 60)}:{String(shown % 60).padStart(2, "0")}
        </span>
      </div>
      {text && <p className="mt-1 text-sm leading-relaxed">{text}</p>}
    </div>
  );
}

export function EmptyThread() {
  return (
    <div className="thread-bg flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-2xl tracking-widest">NORD</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted text-pretty">
        Выберите чат или начните новый. Личные переписки, группы и каналы остаются на этом устройстве.
      </p>
    </div>
  );
}

export function Thread({ chat }: { chat: Chat }) {
  const messages = useMessenger((s) => s.messages);
  const me = useMessenger((s) => s.me);
  const drafts = useMessenger((s) => s.drafts);
  const replyToId = useMessenger((s) => s.replyToId);
  const editingId = useMessenger((s) => s.editingId);
  const typing = useMessenger((s) => s.typing[chat.id]);
  const pulseId = useMessenger((s) => s.pulseId);
  const marker = useMessenger((s) => s.unreadMarker);
  const threadSearch = useMessenger((s) => s.threadSearch);
  const threadSearchOpen = useMessenger((s) => s.threadSearchOpen);
  const focusMessageId = useMessenger((s) => s.focusMessageId);
  const setActive = useMessenger((s) => s.setActive);
  const setProfileOpen = useMessenger((s) => s.setProfileOpen);
  const setDraft = useMessenger((s) => s.setDraft);
  const sendCurrent = useMessenger((s) => s.sendCurrent);
  const sendSpecial = useMessenger((s) => s.sendSpecial);
  const startReply = useMessenger((s) => s.startReply);
  const startEdit = useMessenger((s) => s.startEdit);
  const cancelComposerMode = useMessenger((s) => s.cancelComposerMode);
  const toggleReaction = useMessenger((s) => s.toggleReaction);
  const deleteMessage = useMessenger((s) => s.deleteMessage);
  const saveToSaved = useMessenger((s) => s.saveToSaved);
  const togglePin = useMessenger((s) => s.togglePin);
  const toggleMute = useMessenger((s) => s.toggleMute);
  const setThreadSearch = useMessenger((s) => s.setThreadSearch);
  const setThreadSearchOpen = useMessenger((s) => s.setThreadSearchOpen);
  const clearFocus = useMessenger((s) => s.clearFocus);

  const desktop = useDesktop();
  const draft = drafts[chat.id] ?? "";
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showJump, setShowJump] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stickRef = useRef(true);
  const pinningRef = useRef(false);

  const shown = useMemo(() => {
    const base = messages
      .filter((message) => message.chatId === chat.id)
      .sort((a, b) => a.createdAt - b.createdAt);
    const q = threadSearch.trim().toLowerCase();
    if (!q) return base;
    return base.filter((message) => {
      const who = senderName(chat, message.senderId, me.name).toLowerCase();
      return messagePreview(message).toLowerCase().includes(q) || message.text.toLowerCase().includes(q) || who.includes(q);
    });
  }, [messages, chat, threadSearch, me.name]);

  const lastId = shown[shown.length - 1]?.id;
  const status = presence(chat);

  useEffect(() => {
    setSelectedId(null);
    setRecording(false);
    setSeconds(0);
    stickRef.current = true;
  }, [chat.id]);

  useEffect(() => {
    const el = scrollerRef.current;
    const content = contentRef.current;
    if (!el || !content) return;
    const pin = () => {
      if (!stickRef.current || threadSearch.trim()) return;
      pinningRef.current = true;
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(() => {
        pinningRef.current = false;
      });
    };
    pin();
    const observer = new ResizeObserver(pin);
    observer.observe(content);
    return () => observer.disconnect();
  }, [chat.id, shown.length, lastId, threadSearch, typing]);

  useEffect(() => {
    if (!desktop) return;
    inputRef.current?.focus();
  }, [chat.id, desktop]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [draft, chat.id, recording]);

  useEffect(() => {
    if (!recording) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [recording]);

  useEffect(() => {
    if (recording && seconds >= 60) {
      const voiceSec = Math.max(1, seconds);
      setRecording(false);
      setSeconds(0);
      sendSpecial(chat.id, { kind: "voice", voiceSec });
    }
  }, [recording, seconds, chat.id, sendSpecial]);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (threadSearch.trim()) {
      el.scrollTop = 0;
      setShowJump(false);
      return;
    }
    const last = shown[shown.length - 1];
    if (last?.senderId === "me") stickRef.current = true;
    if (stickRef.current) {
      pinningRef.current = true;
      el.scrollTop = el.scrollHeight;
      requestAnimationFrame(() => {
        pinningRef.current = false;
      });
      setShowJump(false);
      return;
    }
    setShowJump(el.scrollHeight - el.scrollTop - el.clientHeight > 140);
  }, [chat.id, shown.length, lastId, threadSearch, typing, shown]);

  useEffect(() => {
    if (!focusMessageId) return;
    const node = document.querySelector(`[data-mid="${CSS.escape(focusMessageId)}"]`);
    node?.scrollIntoView({ block: "center" });
    clearFocus();
  }, [focusMessageId, clearFocus]);

  const selected = shown.find((message) => message.id === selectedId) ?? null;
  const reply = messages.find((message) => message.id === replyToId && message.chatId === chat.id);
  const editing = messages.find((message) => message.id === editingId && message.chatId === chat.id);

  function sendText() {
    sendCurrent(chat.id);
    setSelectedId(null);
  }

  function finishVoice() {
    const voiceSec = Math.max(1, seconds);
    setRecording(false);
    setSeconds(0);
    sendSpecial(chat.id, { kind: "voice", voiceSec });
  }

  function appendEmoji(emoji: string) {
    const el = inputRef.current;
    const start = el?.selectionStart ?? draft.length;
    const end = el?.selectionEnd ?? draft.length;
    const next = `${draft.slice(0, start)}${emoji}${draft.slice(end)}`.slice(0, 4000);
    setDraft(chat.id, next);
    requestAnimationFrame(() => {
      el?.focus();
      const pos = start + emoji.length;
      el?.setSelectionRange(pos, pos);
    });
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col">
      <header className="flex items-center gap-1 border-b border-line bg-panel px-1 py-1">
        <IconButton label="К чатам" className="lg:hidden" onClick={() => setActive(null)}>
          <ArrowLeft className="size-5" />
        </IconButton>
        <button
          type="button"
          onClick={() => setProfileOpen(true)}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-xl px-1 py-1 text-left hover:bg-raised"
        >
          <Avatar name={chat.title} pattern={chat.pattern} size="lg" online={chat.online} kind={chat.kind} />
          <span className="min-w-0">
            <span className="block truncate font-medium">{chat.title}</span>
            <span className={cn("block truncate text-xs", typing || status.live ? "text-accent" : "text-muted")}>
              {typing ?? status.label}
            </span>
          </span>
        </button>
        <IconButton
          label="Поиск в чате"
          onClick={() => setThreadSearchOpen(!threadSearchOpen)}
          className={threadSearchOpen ? "text-accent" : undefined}
        >
          <Search className="size-5" />
        </IconButton>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <IconButton label="Ещё">
              <MoreHorizontal className="size-5" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={6} className="pop z-50 w-56 p-1">
              <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised" onSelect={() => setProfileOpen(true)}>
                <Info className="size-4" /> Профиль
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised" onSelect={() => togglePin(chat.id)}>
                {chat.pinned ? <PinOff className="size-4" /> : <Pin className="size-4" />}
                {chat.pinned ? "Открепить" : "Закрепить"}
              </DropdownMenu.Item>
              <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-3 text-sm outline-none data-[highlighted]:bg-raised" onSelect={() => toggleMute(chat.id)}>
                {chat.muted ? <Bell className="size-4" /> : <BellOff className="size-4" />}
                {chat.muted ? "Включить уведомления" : "Без звука"}
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </header>
      {threadSearchOpen && (
        <div className="border-b border-line bg-panel px-3 py-2">
          <input
            autoFocus
            value={threadSearch}
            onChange={(event) => setThreadSearch(event.target.value)}
            placeholder="Поиск в чате"
            aria-label="Поиск в чате"
            className="h-11 w-full rounded-full border border-line bg-ink px-4 text-base outline-none placeholder:text-muted"
          />
          <p className="px-2 pt-1 text-xs text-muted tabular-nums">
            {threadSearch.trim() ? `${shown.length} совп.` : "Ищите по тексту"}
          </p>
        </div>
      )}
      <div
        ref={scrollerRef}
        className="thread-bg scroll-thin relative min-h-0 flex-1 overflow-y-auto px-3 py-3"
        onScroll={(event) => {
          if (pinningRef.current) return;
          const el = event.currentTarget;
          const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
          stickRef.current = distance < 140;
          setShowJump(distance > 140);
        }}
      >
        <div ref={contentRef}>
        {shown.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            {threadSearch.trim() ? "Ничего не найдено" : "Напишите первое сообщение"}
          </p>
        )}
        {shown.map((message, index) => {
          if (message.kind === "system") {
            return (
              <p key={message.id} className="my-3 text-center">
                <span className="rounded-full bg-panel px-3 py-1 text-xs text-muted">{message.text}</span>
              </p>
            );
          }
          const mine = message.senderId === "me";
          const prev = sameCluster(shown, index, -1);
          const next = sameCluster(shown, index, 1);
          const showDate = index === 0 || !isSameDay(shown[index - 1].createdAt, message.createdAt);
          const quoted = message.replyToId ? messages.find((item) => item.id === message.replyToId) : undefined;
          const grouped = chat.kind === "group" && !mine;
          return (
            <div key={message.id} data-mid={message.id} className={pulseId === message.id ? "rise" : undefined}>
              {marker?.chatId === chat.id && marker.messageId === message.id && (
                <div className="my-3 flex items-center gap-3 text-xs text-accent">
                  <span className="h-px flex-1 bg-accent/40" />
                  Непрочитанные
                  <span className="h-px flex-1 bg-accent/40" />
                </div>
              )}
              {showDate && (
                <div className="my-3 flex justify-center">
                  <span className="rounded-full bg-panel px-3 py-1 text-xs text-muted">{dayLabel(message.createdAt)}</span>
                </div>
              )}
              <div className={cn("mb-1 flex", mine ? "justify-end" : "justify-start", next ? "mb-0.5" : "mb-2")}>
                {grouped && (
                  <span className="mr-2 w-8 shrink-0 self-end">
                    {!next && (
                      <Avatar
                        name={senderName(chat, message.senderId, me.name)}
                        pattern={patternFrom(message.senderId)}
                        size="sm"
                        badge={false}
                      />
                    )}
                  </span>
                )}
                <div className={cn("min-w-0", chat.kind === "channel" ? "bubble-wide" : "bubble")}>
                  <div
                    onClick={() => setSelectedId((current) => (current === message.id ? null : message.id))}
                    onDoubleClick={() => startReply(message.id)}
                    className={cn(
                      "cursor-pointer px-3 py-2 text-fg",
                      mine ? "bg-out" : "bg-raised",
                      "rounded-2xl",
                      mine && next && "rounded-br-md",
                      mine && prev && "rounded-tr-md",
                      !mine && next && "rounded-bl-md",
                      !mine && prev && "rounded-tl-md",
                      selectedId === message.id && "ring-2 ring-accent",
                    )}
                  >
                    {grouped && !prev && (
                      <p className="mb-0.5 text-xs font-medium text-accent">{senderName(chat, message.senderId, me.name)}</p>
                    )}
                    {message.replyToId && (
                      <div className="mb-1 border-l-2 border-accent pl-2">
                        <p className="text-xs font-medium text-accent">
                          {quoted ? senderName(chat, quoted.senderId, me.name) : "Сообщение"}
                        </p>
                        <p className="truncate text-xs text-fg/70">{quoted ? messagePreview(quoted) : "Удалено"}</p>
                      </div>
                    )}
                    {message.kind === "photo" && message.photo && (
                      <ChatPhoto src={message.photo} alt={message.text || "Фото"} />
                    )}
                    {message.kind === "file" && (
                      <div className="mb-1 flex items-center gap-2 rounded-xl bg-ink/45 px-2 py-1">
                        <span className="grid size-11 place-items-center rounded-full bg-accent/15 text-accent">
                          <FileText className="size-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm">{message.fileName}</span>
                          <span className="block text-xs text-fg/70">{message.fileSize}</span>
                        </span>
                      </div>
                    )}
                    {message.kind === "voice" ? (
                      <VoiceNote id={message.id} seconds={message.voiceSec ?? 1} text={message.text} mine={mine} />
                    ) : (
                      message.kind !== "file" &&
                      message.text && <p className="text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">{message.text}</p>
                    )}
                    <p className="mt-1 flex items-center justify-end gap-1 text-xs text-fg/70 tabular-nums">
                      {message.edited && <span>ред.</span>}
                      <span>{clock(message.createdAt)}</span>
                      {mine &&
                        (message.read ? <CheckCheck className="size-3.5 text-accent" /> : <Check className="size-3.5" />)}
                    </p>
                  </div>
                  {message.reactions.length > 0 && (
                    <div className={cn("mt-1 flex flex-wrap gap-1", mine && "justify-end")}>
                      {message.reactions.map((reaction) => (
                        <button
                          key={reaction.emoji}
                          type="button"
                          onClick={() => toggleReaction(message.id, reaction.emoji)}
                          className={cn(
                            "rounded-full px-2 py-1 text-xs",
                            reaction.mine ? "bg-accent/20 text-fg" : "bg-panel text-muted",
                          )}
                        >
                          {reaction.emoji}{" "}
                          <span className="tabular-nums">{reaction.others + (reaction.mine ? 1 : 0)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {typing && !threadSearch.trim() && (
          <div className="flex items-center gap-2 px-1 py-1 text-xs text-accent" aria-live="polite">
            <span className="flex gap-1" aria-hidden="true">
              <i className="typing-dot" />
              <i className="typing-dot d2" />
              <i className="typing-dot d3" />
            </span>
            {typing}
          </div>
        )}
        </div>
      </div>
      {showJump && !threadSearch.trim() && (
        <button
          type="button"
          aria-label="Вниз"
          onClick={() => {
            const el = scrollerRef.current;
            if (!el) return;
            stickRef.current = true;
            el.scrollTop = el.scrollHeight;
            setShowJump(false);
          }}
          className="tap absolute right-4 bottom-28 z-10 grid size-11 place-items-center rounded-full border border-line bg-panel text-fg"
        >
          <ChevronDown className="size-5" />
        </button>
      )}
      {selected && (
        <div className="scroll-thin flex items-center gap-1 overflow-x-auto border-t border-line bg-panel px-2 py-1">
          {REACTIONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              aria-label={`Реакция ${emoji}`}
              className="tap grid size-11 shrink-0 place-items-center rounded-full text-lg hover:bg-raised"
              onClick={() => toggleReaction(selected.id, emoji)}
            >
              {emoji}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 bg-line" />
          <IconButton label="Ответить" onClick={() => startReply(selected.id)}>
            <Reply className="size-5" />
          </IconButton>
          <IconButton
            label="Скопировать"
            onClick={() => {
              const text = selected.text || messagePreview(selected);
              void navigator.clipboard.writeText(text).then(
                () => notify("Скопировано"),
                () => notify("Не удалось скопировать"),
              );
            }}
          >
            <Copy className="size-5" />
          </IconButton>
          {selected.senderId === "me" && selected.kind === "text" && (
            <IconButton label="Изменить" onClick={() => startEdit(selected.id)}>
              <Pencil className="size-5" />
            </IconButton>
          )}
          {chat.kind !== "saved" && (
            <IconButton label="В избранное" onClick={() => saveToSaved(selected.id)}>
              <Bookmark className="size-5" />
            </IconButton>
          )}
          <IconButton
            label="Удалить"
            onClick={() => {
              deleteMessage(selected.id);
              setSelectedId(null);
            }}
          >
            <Trash2 className="size-5" />
          </IconButton>
        </div>
      )}
      {chat.kind === "channel" ? (
        <div className="safe-bottom border-t border-line bg-panel px-4 py-4 text-center text-sm text-muted">
          Канал только для чтения · вы подписаны
        </div>
      ) : recording ? (
        <div className="safe-bottom flex items-center gap-2 border-t border-line bg-panel px-2 py-2">
          <IconButton
            label="Отменить запись"
            onClick={() => {
              setRecording(false);
              setSeconds(0);
            }}
          >
            <Trash2 className="size-5" />
          </IconButton>
          <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-accent">
            <span className="size-2 rounded-full bg-accent" />
            <span className="tabular-nums">
              {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
            </span>
            <span className="truncate text-muted">Запись голосового</span>
          </div>
          <button
            type="button"
            aria-label="Отправить голосовое"
            onClick={finishVoice}
            className="tap grid size-11 place-items-center rounded-full bg-accent text-accent-ink"
          >
            <ArrowUp className="size-5" />
          </button>
        </div>
      ) : (
        <div className="safe-bottom border-t border-line bg-panel px-2 py-2">
          {(reply || editing) && (
            <div className="mb-2 flex items-center gap-2 border-l-2 border-accent px-2">
              <div className="min-w-0 flex-1 py-1">
                <p className="text-xs font-medium text-accent">{editing ? "Редактирование" : senderName(chat, reply?.senderId ?? "", me.name)}</p>
                <p className="truncate text-xs text-muted">{editing ? editing.text : reply ? messagePreview(reply) : ""}</p>
              </div>
              <IconButton label="Отмена" onClick={cancelComposerMode}>
                <X className="size-5" />
              </IconButton>
            </div>
          )}
          <div className="flex items-end gap-1">
            <Popover.Root>
              <Popover.Trigger asChild>
                <IconButton label="Вложение">
                  <Paperclip className="size-5" />
                </IconButton>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content side="top" align="start" sideOffset={8} className="pop z-50 w-52 p-1">
                  <Popover.Close asChild>
                    <button
                      type="button"
                      className="flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-raised"
                      onClick={() => {
                        const photo = takePhoto();
                        sendSpecial(chat.id, { kind: "photo", photo: photo.src, text: draft });
                      }}
                    >
                      <ImageIcon className="size-4" /> Фото
                    </button>
                  </Popover.Close>
                  <Popover.Close asChild>
                    <button
                      type="button"
                      className="flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm hover:bg-raised"
                      onClick={() =>
                        sendSpecial(chat.id, {
                          kind: "file",
                          fileName: "Заметка.pdf",
                          fileSize: "240 КБ",
                          text: draft,
                        })
                      }
                    >
                      <FileText className="size-4" /> Файл
                    </button>
                  </Popover.Close>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <Popover.Root>
              <Popover.Trigger asChild>
                <IconButton label="Эмодзи">
                  <Smile className="size-5" />
                </IconButton>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content side="top" align="start" sideOffset={8} className="pop z-50 w-96 p-2">
                  <div className="grid grid-cols-8">
                    {EMOJI.map((emoji) => (
                      <Popover.Close asChild key={emoji}>
                        <button
                          type="button"
                          className="tap grid size-11 place-items-center rounded-lg text-lg hover:bg-raised"
                          onClick={() => appendEmoji(emoji)}
                        >
                          {emoji}
                        </button>
                      </Popover.Close>
                    ))}
                  </div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <textarea
              id="composer"
              ref={inputRef}
              rows={1}
              value={draft}
              maxLength={4000}
              placeholder={chat.kind === "saved" ? "Заметка" : "Сообщение"}
              aria-label={chat.kind === "saved" ? "Заметка" : "Сообщение"}
              onChange={(event) => setDraft(chat.id, event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendText();
                }
              }}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-ink px-4 py-2.5 text-base leading-relaxed outline-none placeholder:text-muted"
            />
            {draft.trim() || editing ? (
              <button
                type="button"
                aria-label={editing ? "Сохранить" : "Отправить"}
                disabled={!draft.trim()}
                onClick={sendText}
                className="tap grid size-11 place-items-center rounded-full bg-accent text-accent-ink disabled:opacity-40"
              >
                <ArrowUp className="size-5" />
              </button>
            ) : (
              <button
                type="button"
                aria-label="Голосовое сообщение"
                onClick={() => {
                  setSeconds(0);
                  setRecording(true);
                }}
                className="tap grid size-11 place-items-center rounded-full bg-raised text-fg"
              >
                <Mic className="size-5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
