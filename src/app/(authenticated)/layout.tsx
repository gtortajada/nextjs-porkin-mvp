"use client";

import { Box, Container } from "@mantine/core";
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
      <Container maw="48rem">
        <main>{children}</main>
      </Container>
    </Box>
  );
}
