"use client";

import { useEffect, useRef } from "react";
import { useSession } from "@/lib/auth-client";
import { syncBackendToken } from "@/utils/authApi";

export function BackendAuthSync() {
  const { data: session } = useSession();
  const syncedUserId = useRef(null);

  useEffect(() => {
    const userId = session?.user?.id;
    const email = session?.user?.email;

    if (!userId || syncedUserId.current === userId) {
      return;
    }

    syncBackendToken(userId, email)
      .then(() => {
        syncedUserId.current = userId;
      })
      .catch((error) => {
        console.error("Failed to sync backend JWT:", error);
      });
  }, [session?.user?.id]);

  return null;
}
