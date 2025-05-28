"use client";

import {
    ActionIcon,
    Button,
    Card,
    Center,
    Container,
    Group,
    Stack,
    Text,
    TextInput,
    ThemeIcon,
    Title,
} from "@mantine/core";
import {
    IconChevronLeft,
    IconChevronRight,
    IconFilter,
    IconInfoCircle,
    IconSearch
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function LancamentosPage() {
  const currentMonth = "Maio 2025";
  // TODO: Implement month navigation logic

  return (
    <Container fluid p="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Group>
              <Title order={2}>Lançamentos</Title>
            </Group>

            <Group>
              <ActionIcon variant="subtle" radius="xl">
                <IconChevronLeft size={20} />
              </ActionIcon>
              <Title order={4}>{currentMonth}</Title>
              <ActionIcon variant="subtle" radius="xl">
                <IconChevronRight size={20} />
              </ActionIcon>
            </Group>

            <Group>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button color="red" radius="md">
                  Nova Despesa
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button color="green" radius="md">
                  Nova Receita
                </Button>
              </motion.div>
            </Group>
          </Group>

          <Group grow mb="xl">
            <TextInput
              placeholder="Filtrar por..."
              leftSection={<IconFilter size={16} />}
              rightSection={<IconSearch size={16} />}
              radius="xl"
              size="md"
            />
          </Group>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Center py="xl">
              <Stack align="center" gap="md">
                <ThemeIcon size={60} radius="xl" variant="light" color="gray">
                  <IconInfoCircle size={30} />
                </ThemeIcon>
                <Text c="dimmed" size="lg">
                  Nenhuma movimentação no período.
                </Text>
              </Stack>
            </Center>
          </motion.div>
        </Card>
      </motion.div>
    </Container>
  );
}
