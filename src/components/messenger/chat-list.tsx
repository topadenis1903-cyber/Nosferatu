import { useEffect, useMemo, useRef } from "react";
import { BellOff, Bookmark, Image as ImageIcon, FileText, Mail, Megaphone, MessageCircle, Mic, Pin, Search, Settings, SquarePen, User, Users, X } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  chatUnread,
  folderUnread,
  inFolder,
  lastMessage,
  listTime,
  messagePreview,
  previewPrefix,
  sortChats,
  type FolderId,
} from "@/lib/messenger/model";
import { useMessenger } from "@/lib/messenger/store";
import { Avatar } from "./avatar";
import { IconButton, NordMark } from "./ui";

const FOLDERS: { id: FolderId; label: string; icon: typeof MessageCircle }[] = [
  { id: "all", label: "Все", icon: MessageCircle },
  { id: "direct", label: "Личные", icon: User },
  { id: "group", label: "Группы", icon: Users },
  { id: "channel", label: "Каналы", icon: Megaphone },
  { id: "unread", label: "Непрочитанные", icon: Mail },
];

export function Rail() {
  const folder = useMessenger((s) => s.folder);
  const setFolder = useMessenger((s) => s.setFolder);
  const setActive = useMessenger((s) => s.setActive);
  const setSettingsOpen = useMessenger((s) => s.setSettingsOpen);
  const chats = useMessenger((s) => s.chats);
  const messages = useMessenger((s) => s.messages);

  return (
    <nav className="hidden w-16 shrink-0 flex-col items-center gap-1 border-r border-line bg-panel py-3 lg:flex" aria-label="Папки">
      <button
        type="button"
        className="tap mb-2 grid size-11 place-items-center rounded-full"
        aria-label="Все чаты"
        onClick={() => {
          setFolder("all");
          setActive(null);
        }}
      >
        <NordMark className="size-8" />
      </button>
      {FOLDERS.map((item) => {
        const Icon = item.icon;
        const count = folderUnread(item.id, chats, messages);
        const active = folder === item.id;
        return (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-pressed={active}
            onClick={() => setFolder(item.id)}
            className={cn(
              "tap relative grid size-11 place-items-center rounded-full transition-colors",
              active ? "bg-raised text-accent" : "text-muted hover:bg-raised hover:text-fg",
            )}
          >
            <Icon className="size-5" />
            {count > 0 && <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />}
          </button>
        );
      })}
      <button
        type="button"
        title="Избранное"
        aria-label="Избранное"
        onClick={() => setActive("saved")}
        className="tap grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg"
      >
        <Bookmark className="size-5" />
      </button>
      <div className="mt-auto">
        <IconButton label="Настройки" onClick={() => setSettingsOpen(true)}>
          <Settings className="size-5" />
        </IconButton>
      </div>
    </nav>
  );
}

export function ChatList() {
  const chats = useMessenger((s) => s.chats);
  const messages = useMessenger((s) => s.messages);
  const folder = useMessenger((s) => s.folder);
  const setFolder = useMessenger((s) => s.setFolder);
  const query = useMessenger((s) => s.listQuery);
  const setQuery = useMessenger((s) => s.setListQuery);
  const activeId = useMessenger((s) => s.activeId);
  const setActive = useMessenger((s) => s.setActive);
  const drafts = useMessenger((s) => s.drafts);
  const setCreateOpen = useMessenger((s) => s.setCreateOpen);
  const setSettingsOpen = useMessenger((s) => s.setSettingsOpen);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ordered = useMemo(() => sortChats(chats, messages), [chats, messages]);
  const q = query.trim().toLowerCase();
  const filtered = ordered.filter((chat) => {
    const unread = chatUnread(chat.id, messages);
    if (!inFolder(chat, folder, unread)) return false;
    if (!q) return true;
    const last = lastMessage(chat.id, messages);
    const hay = [chat.title, chat.username ?? "", chat.about, last ? messagePreview(last) : ""].join(" ").toLowerCase();
    return hay.includes(q);
  });
  const online = ordered.filter((chat) => chat.kind === "direct" && chat.online);
  const showPins = folder === "all" && !q && filtered.some((chat) => chat.pinned);
  let pinHeader = false;
  let restHeader = false;

  return (
    <section className={cn("flex min-h-0 w-full min-w-0 flex-col bg-panel lg:w-96 lg:shrink-0 lg:border-r lg:border-line", activeId && "hidden lg:flex")}>
      <header className="flex items-center gap-1 px-2 pt-3">
        <h1 className="px-2 font-display text-xl tracking-widest">NORD</h1>
        <div className="ml-auto flex">
          <IconButton label="Настройки" className="lg:hidden" onClick={() => setSettingsOpen(true)}>
            <Settings className="size-5" />
          </IconButton>
          <IconButton label="Новый чат" onClick={() => setCreateOpen(true)}>
            <SquarePen className="size-5" />
          </IconButton>
        </div>
      </header>
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск"
            aria-label="Поиск чатов"
            className="h-11 w-full rounded-full border border-line bg-ink pr-11 pl-10 text-base text-fg transition-colors placeholder:text-muted lg:text-sm"
          />
          {query && (
            <button
              type="button"
              aria-label="Очистить поиск"
              onClick={() => setQuery("")}
              className="tap absolute top-1/2 right-1 grid size-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-fg"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto px-3 pb-2 lg:hidden">
        {FOLDERS.map((item) => {
          const count = folderUnread(item.id, chats, messages);
          const active = folder === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFolder(item.id)}
              className={cn(
                "tap h-11 shrink-0 rounded-full px-4 text-sm font-medium",
                active ? "bg-accent text-accent-ink" : "bg-raised text-muted",
              )}
            >
              {item.label}
              {count > 0 ? ` ${count}` : ""}
            </button>
          );
        })}
      </div>
      {online.length > 0 && !q && folder === "all" && (
        <div className="scroll-thin flex gap-3 overflow-x-auto px-4 pb-3">
          {online.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => setActive(chat.id)}
              className="tap flex w-16 shrink-0 flex-col items-center gap-1"
            >
              <Avatar name={chat.title} pattern={chat.pattern} online kind={chat.kind} />
              <span className="w-full truncate text-center text-xs text-muted">{chat.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      )}
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto" role="list" aria-label="Чаты">
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-muted">
            {q ? "Никого не нашли" : "В этой папке пока пусто"}
          </p>
        )}
        {filtered.map((chat) => {
          const unread = chatUnread(chat.id, messages);
          const last = lastMessage(chat.id, messages);
          const draft = (drafts[chat.id] ?? "").trim();
          const active = chat.id === activeId;
          let header: string | null = null;
          if (showPins && chat.pinned && !pinHeader) {
            pinHeader = true;
            header = "Закреплённые";
          } else if (showPins && !chat.pinned && !restHeader) {
            restHeader = true;
            header = "Все чаты";
          }
          return (
            <div key={chat.id}>
              {header && <p className="px-4 pt-3 pb-1 text-xs text-muted">{header}</p>}
              <button
                type="button"
                role="listitem"
                aria-current={active ? "true" : undefined}
                onClick={() => setActive(chat.id)}
                className={cn(
                  "relative flex w-full items-center gap-3 px-3 py-2 text-left",
                  active ? "bg-raised" : "hover:bg-raised/70",
                )}
              >
                <span className={cn("absolute top-2 bottom-2 left-0 w-0.5 rounded-full", active ? "bg-accent" : "bg-transparent")} />
                <Avatar name={chat.title} pattern={chat.pattern} online={chat.online} kind={chat.kind} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className={cn("truncate", unread ? "font-semibold" : "font-medium")}>{chat.title}</span>
                    <span className={cn("ml-auto flex shrink-0 items-center gap-1 text-xs tabular-nums", unread ? "text-accent" : "text-muted")}>
                      {chat.muted && <BellOff className="size-3" />}
                      {last ? listTime(last.createdAt) : ""}
                    </span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-2">
                    <span className={cn("flex min-w-0 flex-1 items-center gap-1 text-sm", unread ? "text-fg" : "text-muted")}>
                      {draft ? (
                        <span className="truncate text-accent">Черновик: {draft}</span>
                      ) : last ? (
                        <>
                          {last.kind === "voice" && <Mic className="size-3.5 shrink-0" />}
                          {last.kind === "photo" && <ImageIcon className="size-3.5 shrink-0" />}
                          {last.kind === "file" && <FileText className="size-3.5 shrink-0" />}
                          <span className="truncate">
                            {previewPrefix(chat, last)}
                            {messagePreview(last)}
                          </span>
                        </>
                      ) : (
                        <span className="truncate">Нет сообщений</span>
                      )}
                    </span>
                    {unread > 0 && (
                      <span
                        className={cn(
                          "grid h-5 min-w-5 place-items-center rounded-full px-1 text-xs font-semibold tabular-nums",
                          chat.muted ? "bg-line text-muted" : "bg-accent text-accent-ink",
                        )}
                      >
                        {unread > 99 ? "99+" : unread}
                      </span>
                    )}
                    {chat.pinned && unread === 0 && <Pin className="size-3 shrink-0 text-muted" />}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
