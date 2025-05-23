"use client";

import { FC, useState } from 'react';
import { Burger, Container, Group, Box, Text } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavbarAuthenticated: FC = () => {
  const pathname = usePathname();
  const { width } = useViewportSize();
  const isMobile = width < 768;
  const [opened, setOpened] = useState(false);
  
  const toggleMenu = () => setOpened((o) => !o);
  
  const menuItems = [
    { href: '/visao-geral', label: 'Visão geral' },
    { href: '/lancamentos', label: 'Lançamentos' },
    { href: '/relatorios', label: 'Relatórios' },
    { href: '/metas', label: 'Metas' },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3 },
    },
  };

  return (
    <Box
      component="nav"
      py="md"
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid rgba(233, 213, 255, 0.5)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Container size="xl">
        <Group justify="space-between" align="center">
          <Text
            fw={700}
            size="xl"
            c="violet.9"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            SeuLogo
          </Text>

          {isMobile ? (
            <>
              <Burger
                opened={opened}
                onClick={toggleMenu}
                color="violet"
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
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      backgroundColor: 'white',
                      padding: '1rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      width: '100%',
                      zIndex: 99,
                    }}
                  >
                    {menuItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        style={{
                          textDecoration: 'none',
                          color: pathname === item.href ? '#db2777' : '#4c1d95',
                          fontWeight: pathname === item.href ? 700 : 500,
                          padding: '8px 16px',
                          borderRadius: '4px',
                          backgroundColor: pathname === item.href ? 'rgba(233, 213, 255, 0.2)' : 'transparent',
                          transition: 'all 0.2s ease',
                        }}
                        onClick={() => setOpened(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Group gap="md">
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href}
                    style={{
                      textDecoration: 'none',
                      color: pathname === item.href ? '#db2777' : '#4c1d95',
                      fontWeight: pathname === item.href ? 700 : 500,
                      padding: '8px 16px',
                      borderRadius: '4px',
                      backgroundColor: pathname === item.href ? 'rgba(233, 213, 255, 0.2)' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </Group>
          )}
        </Group>
      </Container>
    </Box>
  );
};

export default NavbarAuthenticated;