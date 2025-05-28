"use client";

import { Box } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return null;
  return (
    <Box mih="100vh" px={{ base: "xl", sm: "xxl", md: "xl", lg: "xxl" }}>
      <Box maw={1200} mx="auto">
        <main>{children}</main>
      </Box>
    </Box>
  );
}
