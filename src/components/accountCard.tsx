import { Button, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconWallet } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function AccountCard() {
  const accountName = "Conta Inicial";
  const accountType = "Conta manual";
  const balance = "R$ 0,00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        style={{ height: "100%" }}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Minhas contas
            </Text>
            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm" wrap="nowrap">
                <ThemeIcon variant="light" size="lg" radius="md">
                  <IconWallet size={20} />
                </ThemeIcon>
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    {accountName}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {accountType}
                  </Text>
                </Stack>
              </Group>
              <Text size="sm" fw={500} c="blue">
                {balance}
              </Text>
            </Group>
          </Stack>
          <Button
            variant="light"
            fullWidth
            mt="md"
            onClick={() => {}}
          >
            Gerenciar contas
          </Button>
        </Stack>
      </Card>
    </motion.div>
  );
}
