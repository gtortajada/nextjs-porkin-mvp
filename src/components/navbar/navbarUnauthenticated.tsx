"use client";

import { Box, Burger, Button, Container, Group } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useState } from "react";

const NavbarUnauthenticated: FC = () => {
  const pathname = usePathname();
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [opened, setOpened] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("/");

  const toggleMenu = () => setOpened((o) => !o);

  const menuItems = useMemo(
    () => [
      { href: "/", label: "Início", sectionId: "hero" },
      { href: "#passos", label: "Como fazemos", sectionId: "passos" },
      { href: "#funcionalidades", label: "Recursos", sectionId: "funcionalidades"},
    ],
    []
  );

  const handleLinkClick = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = isMobile ? 80 : 100;
          const targetPosition = targetElement.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      } else if (href === "/") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      if (isMobile && opened) {
        setOpened(false);
      }
    },
    [isMobile, opened]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") {
        setActiveSection(pathname);
        return;
      }

      const scrollPosition = window.scrollY + 100;
      const sections = menuItems
        .map((item) => ({
          id: item.sectionId,
          href: item.href,
          element: document.getElementById(item.sectionId),
        }))
        .filter((section) => section.element);

      let currentSection = "/";

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const nextSection = sections[i + 1];

        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom = nextSection?.element
            ? nextSection.element.offsetTop
            : document.body.scrollHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = section.href;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, menuItems]);

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: 500,
    padding: "8px 8px",
    borderRadius: "4px",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
    fontSize: "0.875rem",
    cursor: "pointer",
    display: "block",
    border: "none",
    textAlign: "left" as const,
    position: "relative" as const,
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: "#e57c7f",
    fontWeight: 700,
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
        position: "fixed",
        top: 0,
        zIndex: 100,
        backgroundColor: "#1E133F",
        paddingTop: "8px",
        paddingBottom: "8px",
        width: "100%",
        boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
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
            style={{ display: "block", cursor: "pointer" }}
            onClick={() => handleLinkClick("/")}
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
          </Box>

          {!isMobile && (
            <>
              <Box
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Group gap="md">
                  {menuItems.map((item) => {
                    const isActive = activeSection === item.href;

                    return (
                      <motion.div
                        key={item.href}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Box
                          style={{
                            ...(isActive ? activeLinkStyle : linkStyle),
                          }}
                          onClick={() => handleLinkClick(item.href)}
                        >
                          {item.label}
                        </Box>
                      </motion.div>
                    );
                  })}
                </Group>
              </Box>

              <Group gap="sm" style={{ marginLeft: "auto", flexShrink: 0 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    color="white"
                    component={Link}
                    href="/login"
                    size="xs"
                  >
                    Login
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    color="white"
                    component={Link}
                    href="/register"
                    size="xs"
                  >
                    Comece já
                  </Button>
                </motion.div>
              </Group>
            </>
          )}

          {isMobile && (
            <>
              <Burger
                opened={opened}
                onClick={toggleMenu}
                color="#6F4AAA"
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
                      backgroundColor: "#342351",
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
                    {menuItems.map((item) => {
                      const isActive = activeSection === item.href;

                      return (
                        <Box
                          key={item.href}
                          style={{
                            ...(isActive ? activeLinkStyle : linkStyle),
                          }}
                          onClick={() => handleLinkClick(item.href)}
                        >
                          {item.label}
                        </Box>
                      );
                    })}

                    <Group
                      grow
                      style={{
                        borderTop: "1px solid #e0e0e0",
                        paddingTop: "1rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      <Button
                        variant="outline"
                        color="white"
                        component={Link}
                        href="/login"
                        onClick={() => setOpened(false)}
                        size="sm"
                      >
                        Login
                      </Button>
                      <Button
                        variant="outline"
                        color="white"
                        component={Link}
                        href="/register"
                        onClick={() => setOpened(false)}
                        size="sm"
                      >
                        Comece já
                      </Button>
                    </Group>
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

export default NavbarUnauthenticated;
