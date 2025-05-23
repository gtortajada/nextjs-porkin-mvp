"use client";

import { Box, Burger, Button, Container, Group } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

const NavbarUnauthenticated: FC = () => {
  const pathname = usePathname();
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => setOpened((o) => !o);

  // Menu items specific to the unauthenticated navbar
  const menuItems = [
    { href: "/", label: "Início" },
    { href: "#passos", label: "Como fazemos" },
    { href: "#funcionalidades", label: "Recursos" },
  ];

  // Styles copied from NavbarAuthenticated
  const linkStyle = {
    textDecoration: "none",
    color: "#4c1d95",
    fontWeight: 500,
    padding: "0 8px",
    borderRadius: "4px",
    backgroundColor: "transparent",
    transition: "all 0.2s ease",
    fontSize: "0.875rem", // Smaller font size
  };

  // Active link style might need adjustment based on how active state is determined for hash links
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

  // Logo dimensions copied from NavbarAuthenticated
  const logoWidthDesktop = 160;
  const logoOriginalWidth = 1024;
  const logoOriginalHeight = 311;
  const logoAspectRatio = logoOriginalWidth / logoOriginalHeight;
  const logoHeightDesktop = logoWidthDesktop / logoAspectRatio;
  const logoWidthMobile = 100;
  const logoHeightMobile = logoWidthMobile / logoAspectRatio;


  return (
    <Box
      component="nav"
      // Removed py="md"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffff00", // Yellow background
        paddingTop: '8px', // Added padding for logo height
        paddingBottom: '8px',
      }}
    >
      <Container size="xl">
        <Group
          gap="md"
          align="center"
          justify="space-between"
          // Added minHeight and flexWrap
          style={{ flexWrap: 'nowrap', minHeight: isMobile ? logoHeightMobile : logoHeightDesktop }}
        >
          {/* Logo container with updated dimensions */}
          <Box
            style={{
              width: isMobile ? logoWidthMobile : logoWidthDesktop,
              height: isMobile ? logoHeightMobile : logoHeightDesktop,
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/Logo.png" // Ensure this path is correct
              alt="Logo do Porkin App"
              fill // Use fill
              style={{
                objectFit: "contain", // Keep aspect ratio
              }}
              priority
              // Updated sizes attribute
              sizes={`(max-width: 768px) ${logoWidthMobile}px, ${logoWidthDesktop}px`}
              // Removed width/height props to avoid conflict with fill
            />
          </Box>

          {/* Desktop Menu & Auth Buttons */} 
          {!isMobile && (
            // Use flexGrow and justify flex-end for right alignment
            <Group gap="md" justify="flex-end" style={{ flexGrow: 1, flexWrap: 'nowrap' }}>
              {/* Menu Items */} 
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={item.href}
                    // Apply smaller font size and adjusted padding
                    style={pathname === item.href ? activeLinkStyle : linkStyle}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {/* Auth Buttons - Kept original buttons, wrapped in Group */}
              <Group gap="sm" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <Button
                     variant="outline"
                     color="violet" // Consider adjusting colors for yellow background
                     component={Link}
                     href="/login"
                     size="xs" // Make buttons smaller to fit better?
                   >
                     Login
                   </Button>
                 </motion.div>
                 <motion.div
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                 >
                   <Button
                     variant="filled"
                     color="pink" // Consider adjusting colors for yellow background
                     component={Link}
                     href="/register"
                     size="xs" // Make buttons smaller to fit better?
                   >
                     Comece já
                   </Button>
                 </motion.div>
              </Group>
            </Group>
          )}

          {/* Mobile Burger & Menu */} 
          {isMobile && (
            <>
              <Burger
                opened={opened}
                onClick={toggleMenu}
                color="#4c1d95" // Changed color for contrast
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
                      // Adjusted top position
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
                      borderTop: '1px solid #e0e0e0',
                    }}
                  >
                    {/* Mobile Menu Items */} 
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        // Apply smaller font size and adjusted padding
                        style={pathname === item.href ? activeLinkStyle : linkStyle}
                        onClick={() => setOpened(false)}
                      >
                        {item.label}
                      </Link>
                    ))}

                    {/* Mobile Auth Buttons - Kept original buttons */}
                    <Group grow style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1rem', marginTop: '0.5rem' }}>
                      <Button
                        variant="outline"
                        color="violet"
                        component={Link}
                        href="/login"
                        onClick={() => setOpened(false)}
                        size="sm"
                      >
                        Login
                      </Button>
                      <Button
                        variant="filled"
                        color="pink"
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

