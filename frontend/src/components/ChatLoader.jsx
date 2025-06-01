import { LoaderIcon } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <LoaderIcon className="animate-spin w-8 h-8 text-blue-500" />
      <p className="mt-2 text-sm">Connecting to chat...</p>
    </div>
  );
}

export default ChatLoader;
