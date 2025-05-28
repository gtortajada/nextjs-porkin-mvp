import { Box, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { motion } from "framer-motion";
import React from "react";

interface InfoCardProps {
  title: string;
  value?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  color?: string;
}

export function InfoCard({
  title,
  value,
  icon,
  children,
  color = "green",
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ height: "100%" }}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group gap="xs" align="center" wrap="nowrap">
              <Box bg={color} w={4} h={16} style={{ borderRadius: "2px" }} />
              <Text size="sm" c="dimmed">
                {title}
              </Text>
              {icon && (
                <ThemeIcon variant="light" size="xs" radius="xl">
                  {icon}
                </ThemeIcon>
              )}
            </Group>
            {value && (
              <Text size="lg" fw={500}>
                {value}
              </Text>
            )}
          </Group>
          {children && (
            <Box mt="md" style={{ flexGrow: 1 }}>
              {children}
            </Box>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}

export function InfoCardPlaceholder({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <InfoCard title={title} color="gray.5">
      <Text size="sm" c="dimmed" ta="center" mt="md">
        {message}
      </Text>
    </InfoCard>
  );
}
