"use client";

import {
  Box,
  Burger,
  Button,
  Container,
  Group,
  Title
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";

const NavbarAuthenticated: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [opened, setOpened] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    setSignOutLoading(true);
    try {
      await signOut({ redirect: false });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setSignOutLoading(false);
      if (isMobile) setOpened(false);
    }
  };

  const toggleMenu = () => setOpened((o) => !o);

  const menuItems = [
    { href: "/visao-geral", label: "Visão geral" },
    { href: "/lancamentos", label: "Lançamentos" },
    { href: "/relatorios", label: "Relatórios" },
  ];

  const linkStyle = {
    textDecoration: "none",
    color: "#b047f9",
    fontWeight: 500,
    padding: "0 8px",
    borderRadius: "4px",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
    fontSize: "0.875rem",
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#e57c7f",
    fontWeight: 700,
    backgroundColor: "rgba(233, 213, 255, 0.2)",
    padding: "8px 8px",
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

  return (
    <Box
      component="nav"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffff0000",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <Container size="xl">
        <Group
          gap="md"
          align="center"
          style={{
            flexWrap: "nowrap",
            minHeight: isMobile ? logoHeightMobile : logoHeightDesktop,
          }}
        >
          {/* Logo - fixed width */}
          <Box
            style={{
              width: isMobile ? logoWidthMobile : logoWidthDesktop,
              height: isMobile ? logoHeightMobile : logoHeightDesktop,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logo.png"
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
            <>
              {/* Centered menu items */}
              <Box
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Group gap="md">
                  {menuItems.map((item) => (
                    <motion.div
                      key={item.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={item.href}
                        style={
                          pathname === item.href ? activeLinkStyle : linkStyle
                        }
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </Group>
              </Box>

              {/* Right-aligned user/sign-out */}
              <Box style={{ flexShrink: 0 }}>
                {session?.user && (
                  <Group gap="xs">
                    <span
                      style={{
                        fontSize: "0.875rem",
                        color: "#8b6ebb",
                      }}
                    >
                      {session.user.name}
                    </span>
                    <Button
                      onClick={handleSignOut}
                      loading={signOutLoading}
                      variant="outline"
                      color="violet"
                      size="xs"
                      radius="sm"
                      styles={{
                        root: {
                          borderColor: "#6f4aaa",
                          color: "#8b6ebb",
                          "&:hover": {
                            backgroundColor: "rgba(111, 74, 170, 0.1)",
                          },
                        },
                      }}
                    >
                      Sair
                    </Button>
                  </Group>
                )}
              </Box>
            </>
          )}

          {isMobile && (
            <>
              <Burger
                opened={opened}
                onClick={toggleMenu}
                color="#6f4aaa"
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
                          <Title
                            style={{
                              fontSize: "0.875rem",
                              color: "#6f4aaa",
                            }}
                          >
                            {session?.user?.name}
                          </Title>
                          <Button
                            onClick={handleSignOut}
                            loading={signOutLoading}
                            variant="outline"
                            color="violet"
                            size="sm"
                            radius="sm"
                            styles={{
                              root: {
                                borderColor: "#6f4aaa",
                                color: "#8b6ebb",
                                "&:hover": {
                                  backgroundColor: "rgba(111, 74, 170, 0.1)",
                                },
                              },
                            }}
                          >
                            Sair
                          </Button>
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
