"use client";

import { Box, Burger, Container, Group, Title } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

const useSession = () => {
  return {
    data: {
      user: {
        name: "Usuário Exemplo",
      },
    },
    status: "authenticated",
  };
};

const signOut = () => {
  console.log("Logout clicked");
};

const NavbarAuthenticated: FC = () => {
  const pathname = usePathname();
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [opened, setOpened] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setOpened((o) => !o);

  const menuItems = [
    { href: "/visao-geral", label: "Visão geral" },
    { href: "/lancamentos", label: "Lançamentos" },
    { href: "/relatorios", label: "Relatórios" },
  ];

  const linkStyle = {
    textDecoration: "none",
    color: "#4c1d95",
    fontWeight: 500,
    padding: "0 8px",
    borderRadius: "4px",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
    fontSize: "0.875rem",
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#db2777",
    fontWeight: 700,
    backgroundColor: "rgba(233, 213, 255, 0.2)",
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3 },
    },
  };

  const logoWidthDesktop = 140;
  const logoOriginalWidth = 1024;
  const logoOriginalHeight = 311;
  const logoAspectRatio = logoOriginalWidth / logoOriginalHeight;
  const logoHeightDesktop = logoWidthDesktop / logoAspectRatio;
  const logoWidthMobile = 100;
  const logoHeightMobile = logoWidthMobile / logoAspectRatio;

  const imageVersion =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || new Date().getTime();

  return (
    <Box
      component="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffff00",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Container size="xl">
        <Group
          gap="md"
          align="center"
          justify="space-between"
          style={{
            flexWrap: "nowrap",
            minHeight: isMobile ? logoHeightMobile : logoHeightDesktop,
          }}
        >
          <Box
            style={{
              width: isMobile ? logoWidthMobile : logoWidthDesktop,
              height: isMobile ? logoHeightMobile : logoHeightDesktop,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={`/images/logo.png?v=${imageVersion}`}
              alt="Logo Porkin App"
              fill
              style={{
                objectFit: "contain",
              }}
              priority
              sizes={`(max-width: 768px) ${logoWidthMobile}px, ${logoWidthDesktop}px`}
            />
          </Box>

          {!isMobile && (
            <Group
              gap="md"
              justify="flex-end"
              style={{ flexGrow: 1, flexWrap: "nowrap" }}
            >
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    style={pathname === item.href ? activeLinkStyle : linkStyle}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              {session?.user && (
                <Group gap="xs" style={{ marginLeft: "auto", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.875rem" }}>
                    {session.user.name}
                  </span>
                  <button
                    onClick={() => signOut()}
                    style={{
                      background: "none",
                      border: "1px solid #4c1d95",
                      color: "#4c1d95",
                      padding: "3px 6px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    }}
                  >
                    Sair
                  </button>
                </Group>
              )}
            </Group>
          )}

          {isMobile && (
            <>
              <Burger
                opened={opened}
                onClick={toggleMenu}
                color="#4c1d95"
                size="sm"
                aria-label="Toggle navigation"
              />
              <AnimatePresence>
                {opened && (
                  <motion.div
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    style={{
                      position: "absolute",
                      top: `calc(${logoHeightMobile}px + 16px + 1px)`,
                      left: 0,
                      right: 0,
                      backgroundColor: "white",
                      padding: "1rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      width: "100%",
                      zIndex: 99,
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        style={
                          pathname === item.href ? activeLinkStyle : linkStyle
                        }
                        onClick={() => setOpened(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    {session?.user && (
                      <Box
                        style={{
                          borderTop: "1px solid #e0e0e0",
                          paddingTop: "1rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <Group justify="space-between" align="center">
                          <Title style={{ fontSize: "0.875rem" }}>
                            {session?.user?.name}!
                          </Title>
                          <button
                            onClick={() => {
                              signOut();
                              setOpened(false);
                            }}
                            style={{
                              background: "none",
                              border: "1px solid #4c1d95",
                              color: "#4c1d95",
                              padding: "3px 6px",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                          >
                            Sair
                          </button>
                        </Group>
                      </Box>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </Group>
      </Container>
    </Box>
  );
};

export default NavbarAuthenticated;
