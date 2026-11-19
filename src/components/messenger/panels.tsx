import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, Bell, BellOff, Pin, PinOff, X } from "lucide-react";
import { initials, plural } from "@/lib/messenger/model";
import { useMessenger } from "@/lib/messenger/store";
import { Avatar } from "./avatar";
import { IconButton } from "./ui";
import type { Chat } from "@/lib/messenger/model";

export function ProfilePanel({ chat }: { chat: Chat }) {
  const messages = useMessenger((s) => s.messages);
  const setProfileOpen = useMessenger((s) => s.setProfileOpen);
  const togglePin = useMessenger((s) => s.togglePin);
  const toggleMute = useMessenger((s) => s.toggleMute);
  const setThreadSearchOpen = useMessenger((s) => s.setThreadSearchOpen);
  const focusMessage = useMessenger((s) => s.focusMessage);
  const openDirect = useMessenger((s) => s.openDirect);
  const photos = messages.filter((message) => message.chatId === chat.id && message.kind === "photo" && message.photo);
  const notes = messages.filter((message) => message.chatId === chat.id && message.kind !== "system").length;

  return (
    <aside className="absolute inset-0 z-30 flex min-h-0 flex-col bg-panel lg:static lg:w-80 lg:shrink-0 lg:border-l lg:border-line">
      <header className="flex items-center gap-1 px-1 py-1">
        <IconButton label="Назад" onClick={() => setProfileOpen(false)}>
          <ArrowLeft className="size-5" />
        </IconButton>
        <p className="font-medium">Профиль</p>
      </header>
      <div className="scroll-thin min-h-0 flex-1 overflow-y-auto px-5 pb-8">
        <div className="flex flex-col items-center pt-4 text-center">
          <Avatar name={chat.title} pattern={chat.pattern} size="xl" online={chat.online} kind={chat.kind} />
          <h2 className="mt-4 text-xl font-semibold text-balance">{chat.title}</h2>
          {chat.username && <p className="text-sm text-accent">@{chat.username}</p>}
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted text-pretty">{chat.about}</p>
        </div>
        <div className="mt-5 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => togglePin(chat.id)}
            className="tap flex h-11 items-center gap-2 rounded-full bg-raised px-4 text-sm"
          >
            {chat.pinned ? <PinOff className="size-4" /> : <Pin className="size-4" />}
            {chat.pinned ? "Открепить" : "Закрепить"}
          </button>
          {chat.kind !== "saved" && (
            <button
              type="button"
              onClick={() => toggleMute(chat.id)}
              className="tap flex h-11 items-center gap-2 rounded-full bg-raised px-4 text-sm"
            >
              {chat.muted ? <Bell className="size-4" /> : <BellOff className="size-4" />}
              {chat.muted ? "Звук" : "Тихо"}
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setProfileOpen(false);
            setThreadSearchOpen(true);
          }}
          className="mt-3 h-11 w-full rounded-full border border-line text-sm text-fg hover:bg-raised"
        >
          Искать в переписке
        </button>
        {chat.phone && (
          <div className="mt-6">
            <p className="text-xs text-muted">Телефон</p>
            <p className="mt-1 text-sm tabular-nums">{chat.phone}</p>
          </div>
        )}
        {chat.kind === "saved" && (
          <p className="mt-6 text-sm text-muted">{notes} {plural(notes, "заметка", "заметки", "заметок")}</p>
        )}
        {chat.kind === "group" && chat.members && (
          <div className="mt-6">
            <p className="text-xs text-muted">Участники</p>
            <ul className="mt-2">
              {chat.members.map((member) => (
                <li key={member.id}>
                  <button
                    type="button"
                    onClick={() => openDirect(member.name, member.gender)}
                    className="flex h-12 w-full items-center gap-3 rounded-xl px-1 text-left hover:bg-raised"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-raised font-display text-xs">
                      {initials(member.name)}
                    </span>
                    <span className="truncate text-sm">{member.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {photos.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-muted">Фото</p>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {photos.map((message) => (
                <button key={message.id} type="button" onClick={() => focusMessage(message.id)} className="overflow-hidden rounded-lg">
                  <img src={message.photo} alt={message.text || "Фото"} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export function CreateDialog() {
  const open = useMessenger((s) => s.createOpen);
  const setOpen = useMessenger((s) => s.setCreateOpen);
  const createChat = useMessenger((s) => s.createChat);
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) setName("");
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70" />
        <Dialog.Content className="pop fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-5">
          <div className="flex items-start gap-3">
            <Dialog.Title className="font-display text-lg tracking-wide">Новый чат</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Закрыть" className="tap ml-auto grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg">
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-1 text-sm text-muted">
            Напишите человеку. Ответ придёт прямо здесь.
          </Dialog.Description>
          <form
            className="mt-4"
            onSubmit={(event) => {
              event.preventDefault();
              createChat(name);
            }}
          >
            <label className="text-xs text-muted" htmlFor="new-chat-name">
              Имя
            </label>
            <input
              id="new-chat-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoFocus
              maxLength={40}
              placeholder="Например, Ника"
              className="mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={!name.trim()}
              className="tap mt-4 h-11 w-full rounded-full bg-accent font-medium text-accent-ink disabled:opacity-40"
            >
              Начать переписку
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function SettingsDialog() {
  const open = useMessenger((s) => s.settingsOpen);
  const setOpen = useMessenger((s) => s.setSettingsOpen);
  const me = useMessenger((s) => s.me);
  const updateMe = useMessenger((s) => s.updateMe);
  const resetDemo = useMessenger((s) => s.resetDemo);
  const [name, setName] = useState(me.name);
  const [username, setUsername] = useState(me.username);
  const [about, setAbout] = useState(me.about);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    if (!open) return;
    setName(me.name);
    setUsername(me.username);
    setAbout(me.about);
    setConfirm(false);
  }, [open, me]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/70" />
        <Dialog.Content className="pop fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-5">
          <div className="flex items-start gap-3">
            <Dialog.Title className="font-display text-lg tracking-wide">Вы</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" aria-label="Закрыть" className="tap ml-auto grid size-11 place-items-center rounded-full text-muted hover:bg-raised hover:text-fg">
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-1 text-sm leading-relaxed text-muted text-pretty">
            Так вас видно в чатах. Переписка хранится только в этом браузере — это не Telegram и не чужой аккаунт.
          </Dialog.Description>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              updateMe({
                name: name.trim().slice(0, 40) || me.name,
                username: username.replace(/^@/, "").replace(/\s/g, "").slice(0, 24) || me.username,
                about: about.trim().slice(0, 140),
              });
              setOpen(false);
            }}
          >
            <label className="block text-xs text-muted">
              Имя
              <input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} className="mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base text-fg outline-none" />
            </label>
            <label className="block text-xs text-muted">
              Имя пользователя
              <input value={username} onChange={(event) => setUsername(event.target.value)} maxLength={24} className="mt-1 h-11 w-full rounded-xl border border-line bg-ink px-3 text-base text-fg outline-none" />
            </label>
            <label className="block text-xs text-muted">
              О себе
              <textarea value={about} onChange={(event) => setAbout(event.target.value)} maxLength={140} rows={3} className="mt-1 w-full resize-none rounded-xl border border-line bg-ink px-3 py-2 text-base text-fg outline-none" />
            </label>
            <button type="submit" className="tap h-11 w-full rounded-full bg-accent font-medium text-accent-ink">
              Сохранить
            </button>
          </form>
          <button
            type="button"
            onClick={() => {
              if (!confirm) {
                setConfirm(true);
                return;
              }
              resetDemo();
              setOpen(false);
            }}
            className="mt-3 h-11 w-full rounded-full text-sm text-muted hover:bg-raised hover:text-fg"
          >
            {confirm ? "Точно вернуть демо-чаты" : "Вернуть демо-чаты"}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
