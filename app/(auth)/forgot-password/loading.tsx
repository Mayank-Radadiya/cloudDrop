import { CloudLightning } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background text-foreground transition-colors duration-300">
      <div className="relative flex items-center justify-center">
        <CloudLightning className="h-14 w-14 text-primary animate-bounce drop-shadow-lg transition-all duration-500" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground animate-fade-in">
          Loading your files...
        </p>
        <div className="flex items-center justify-center gap-4">
          <span className="h-3 w-3 animate-ping rounded-full bg-primary opacity-75" />
          <span className="h-3 w-3 animate-ping rounded-full bg-primary opacity-75" />{" "}
          <span className="h-3 w-3 animate-ping rounded-full bg-primary opacity-75" />{" "}
        </div>
      </div>
    </div>
  );
}
