import { Button, Card, Center, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCreditCard } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function CardPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ height: "100%" }}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Stack gap="md">
            <Text size="sm" fw={500}>
              Meus cartões
            </Text>
            <Center style={{ flexGrow: 1 }}>
              <Stack align="center" gap="xs">
                <ThemeIcon variant="light" color="gray" size={40} radius="xl">
                  <IconCreditCard size={24} />
                </ThemeIcon>
                <Text size="sm" c="dimmed">
                  Adicione seu primeiro cartão
                </Text>
              </Stack>
            </Center>
          </Stack>
          <Button variant="light" fullWidth mt="md" onClick={() => {}}>
            Gerenciar cartões
          </Button>
        </Stack>
      </Card>
    </motion.div>
  );
}
