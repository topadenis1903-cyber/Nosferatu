export type Gender = "f" | "m" | "n";
export type ChatKind = "direct" | "group" | "channel" | "saved";
export type FolderId = "all" | "direct" | "group" | "channel" | "unread";
export type Pattern = 0 | 1 | 2 | 3 | 4 | 5;
export type MessageKind = "text" | "voice" | "photo" | "file" | "system";

export type Member = { id: string; name: string; gender: Gender };

export type Chat = {
  id: string;
  kind: ChatKind;
  title: string;
  username?: string;
  about: string;
  phone?: string;
  gender: Gender;
  online?: boolean;
  lastSeen?: number;
  pinned: boolean;
  muted: boolean;
  pattern: Pattern;
  createdAt: number;
  members?: Member[];
  subscribers?: number;
};

export type Reaction = { emoji: string; mine: boolean; others: number };

export type Message = {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: number;
  kind: MessageKind;
  read: boolean;
  replyToId?: string;
  edited?: boolean;
  voiceSec?: number;
  photo?: string;
  fileName?: string;
  fileSize?: string;
  reactions: Reaction[];
};

export type Me = { name: string; username: string; about: string };

export const MEDIA = [
  { src: "/media/forest.jpg", alt: "Снежная тропа между соснами" },
  { src: "/media/aurora.jpg", alt: "Северное сияние над замёрзшим озером" },
  { src: "/media/river.jpg", alt: "Река в синий час" },
  { src: "/media/desk.jpg", alt: "Стол с набросками и чашка кофе" },
] as const;

export const EMOJI = [
  "😀", "😁", "😂", "😊", "😍", "😎", "🤔", "😅",
  "😢", "👍", "👏", "🔥", "❤️", "✨", "🎉", "👀",
  "🙏", "⭐", "❄️", "🌙", "⚡", "💬", "📌", "🎵",
];

export const REACTIONS = ["❤️", "👍", "😂", "🔥", "👀", "🎉"];

let photoCursor = 0;

export function takePhoto() {
  const item = MEDIA[photoCursor % MEDIA.length];
  photoCursor += 1;
  return item;
}

export function newId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

export function patternFrom(id: string): Pattern {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return (h % 6) as Pattern;
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "•";
  if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase("ru");
  return (parts[0][0] + parts[1][0]).toLocaleUpperCase("ru");
}

export function plural(n: number, one: string, few: string, many: string) {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

export function formatCount(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function clock(ts: number) {
  const d = new Date(ts);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function startOfDay(ts: number) {
  const d = new Date(ts);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

export function isSameDay(a: number, b: number) {
  return startOfDay(a) === startOfDay(b);
}

export function isToday(ts: number) {
  return isSameDay(ts, Date.now());
}

export function isYesterday(ts: number) {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return isSameDay(ts, y.getTime());
}

const WD = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
const MON = ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const MONF = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

export function listTime(ts: number) {
  if (isToday(ts)) return clock(ts);
  if (isYesterday(ts)) return "вчера";
  const d = new Date(ts);
  if (Date.now() - ts < 7 * 24 * 3600 * 1000) return WD[d.getDay()] ?? "";
  return `${d.getDate()} ${MON[d.getMonth()] ?? ""}`;
}

export function dayLabel(ts: number) {
  if (isToday(ts)) return "Сегодня";
  if (isYesterday(ts)) return "Вчера";
  const d = new Date(ts);
  return `${d.getDate()} ${MONF[d.getMonth()] ?? ""}`;
}

export function messagePreview(m: Message) {
  if (m.kind === "voice") return "Голосовое сообщение";
  if (m.kind === "photo") return m.text.trim() ? m.text : "Фото";
  if (m.kind === "file") return m.fileName ?? "Файл";
  return m.text;
}

export function previewPrefix(chat: Chat, m: Message) {
  if (m.senderId === "me") {
    if (chat.kind === "saved" || chat.kind === "channel") return "";
    return "Вы: ";
  }
  if (chat.kind === "group") {
    const name = chat.members?.find((x) => x.id === m.senderId)?.name.split(" ")[0];
    return name ? `${name}: ` : "";
  }
  return "";
}

export function senderName(chat: Chat, senderId: string, meName: string) {
  if (senderId === "me") return meName;
  const member = chat.members?.find((m) => m.id === senderId);
  if (member) return member.name;
  return chat.title;
}

export function chatUnread(chatId: string, messages: Message[]) {
  let n = 0;
  for (const m of messages) {
    if (m.chatId === chatId && m.senderId !== "me" && m.senderId !== "system" && !m.read) n += 1;
  }
  return n;
}

export function lastMessage(chatId: string, messages: Message[]) {
  let best: Message | undefined;
  for (const m of messages) {
    if (m.chatId !== chatId || m.kind === "system") continue;
    if (!best || m.createdAt >= best.createdAt) best = m;
  }
  return best;
}

export function inFolder(chat: Chat, folder: FolderId, unread: number) {
  if (folder === "all") return true;
  if (folder === "unread") return unread > 0;
  if (folder === "direct") return chat.kind === "direct" || chat.kind === "saved";
  return chat.kind === folder;
}

export function sortChats(chats: Chat[], messages: Message[]) {
  const act = (c: Chat) => {
    let max = c.createdAt;
    for (const m of messages) if (m.chatId === c.id && m.createdAt > max) max = m.createdAt;
    return max;
  };
  return [...chats].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return act(b) - act(a);
  });
}

export function presence(chat: Chat): { label: string; live: boolean } {
  if (chat.kind === "saved") return { label: "заметки себе", live: false };
  if (chat.kind === "group") {
    const n = (chat.members?.length ?? 0) + 1;
    return { label: `${n} ${plural(n, "участник", "участника", "участников")}`, live: false };
  }
  if (chat.kind === "channel") {
    const n = chat.subscribers ?? 0;
    return {
      label: `${formatCount(n)} ${plural(n, "подписчик", "подписчика", "подписчиков")}`,
      live: false,
    };
  }
  if (chat.online) return { label: "в сети", live: true };
  const verb = chat.gender === "f" ? "была" : chat.gender === "m" ? "был" : "был(а)";
  if (!chat.lastSeen) return { label: "не в сети", live: false };
  if (isToday(chat.lastSeen)) return { label: `${verb} в ${clock(chat.lastSeen)}`, live: false };
  if (isYesterday(chat.lastSeen)) return { label: `${verb} вчера`, live: false };
  return { label: `${verb} недавно`, live: false };
}

export function waveBars(seed: string, n = 26) {
  let h = 0;
  for (const c of seed) h = (h * 33 + c.charCodeAt(0)) >>> 0;
  const out: number[] = [];
  for (let i = 0; i < n; i += 1) {
    h = (h * 1664525 + 1013904223) >>> 0;
    out.push(28 + (h % 72));
  }
  return out;
}

export function folderUnread(folder: FolderId, chats: Chat[], messages: Message[]) {
  let n = 0;
  for (const chat of chats) {
    const u = chatUnread(chat.id, messages);
    if (u > 0 && inFolder(chat, folder, u) && (folder !== "all" || true)) {
      if (folder === "all") n += u;
      else if (inFolder(chat, folder, u)) n += u;
    }
  }
  return n;
}
