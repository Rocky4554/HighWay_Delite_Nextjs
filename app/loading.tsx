// app/loading.tsx
"use client";

import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-3">
        <Loader2 className="h-10 w-10 animate-spin text-gray-600" />
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
