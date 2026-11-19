import { createFileRoute } from "@tanstack/react-router";
import { Messenger } from "@/components/messenger/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Messenger />;
}
