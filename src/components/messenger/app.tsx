import { useEffect } from "react";
import { Toaster } from "sonner";
import { chatUnread } from "@/lib/messenger/model";
import { useMessenger } from "@/lib/messenger/store";
import { ChatList, Rail } from "./chat-list";
import { CreateDialog, ProfilePanel, SettingsDialog } from "./panels";
import { EmptyThread, Thread } from "./thread";
import { NordMark } from "./ui";
import { useClient } from "./use-client";

export function Messenger() {
  const client = useClient();
  if (!client) return <Boot />;
  return <App />;
}

function Boot() {
  return (
    <div className="flex h-dvh items-center justify-center bg-ink text-fg" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <NordMark className="size-12" />
        <p className="font-display tracking-widest">NORD</p>
      </div>
    </div>
  );
}

function App() {
  const activeId = useMessenger((s) => s.activeId);
  const chats = useMessenger((s) => s.chats);
  const messages = useMessenger((s) => s.messages);
  const profileOpen = useMessenger((s) => s.profileOpen);
  const chat = chats.find((item) => item.id === activeId) ?? null;

  useEffect(() => {
    const unread = chats.reduce((sum, item) => sum + chatUnread(item.id, messages), 0);
    document.title = unread > 0 ? `(${unread}) NORD` : "NORD";
  }, [chats, messages]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const state = useMessenger.getState();
      if (state.createOpen || state.settingsOpen) return;
      if (state.editingId || state.replyToId) {
        state.cancelComposerMode();
        return;
      }
      if (state.threadSearchOpen) {
        state.setThreadSearchOpen(false);
        return;
      }
      if (state.profileOpen) {
        state.setProfileOpen(false);
        return;
      }
      if (window.matchMedia("(max-width: 1023px)").matches && state.activeId) state.setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-dvh overflow-hidden bg-ink text-fg">
      <Rail />
      <ChatList />
      <main className={activeId ? "relative flex min-w-0 flex-1 flex-col" : "relative hidden min-w-0 flex-1 flex-col lg:flex"}>
        {chat ? <Thread chat={chat} /> : <EmptyThread />}
        {profileOpen && chat && <ProfilePanel chat={chat} />}
      </main>
      <CreateDialog />
      <SettingsDialog />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-panel)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-line)",
          },
        }}
      />
    </div>
  );
}
