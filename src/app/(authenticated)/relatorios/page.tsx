"use client";

import {
    ActionIcon,
    Button,
    Card,
    Center,
    Container,
    Group,
    Stack,
    Tabs,
    Text,
    Title
} from "@mantine/core";
import {
    IconAdjustments,
    IconChevronLeft,
    IconChevronRight,
    IconDownload,
    IconPrinter,
    IconRefresh,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function RelatoriosPage() {
  const currentMonth = "Maio 2025";
  //TODO: Implement month navigation logic

  return (
    <Container size="md" py="lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={2}>Relatórios</Title>

            <Group>
              <ActionIcon variant="subtle" size="lg">
                <IconChevronLeft size={20} />
              </ActionIcon>
              <Text fw={500}>{currentMonth}</Text>
              <ActionIcon variant="subtle" size="lg">
                <IconChevronRight size={20} />
              </ActionIcon>
            </Group>
          </Group>

          <Tabs defaultValue="categorias">
            <Tabs.List mb="md">
              <Tabs.Tab value="categorias" color="green">
                Categorias
              </Tabs.Tab>
              <Tabs.Tab value="entradas-saidas">Entradas x Saídas</Tabs.Tab>
              <Tabs.Tab value="contas">Contas</Tabs.Tab>
              <Tabs.Tab value="tags">Tags</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="categorias">
              <Group justify="space-between" mb="lg">
                <Text fw={500}>Categorias</Text>

                <Group>
                  <Button
                    variant="outline"
                    leftSection={<IconAdjustments size={16} />}
                    size="sm"
                  >
                    Filtros
                  </Button>

                  <Group>
                    <ActionIcon variant="light" color="green" radius="xl">
                      <IconRefresh size={18} />
                    </ActionIcon>
                    <ActionIcon variant="light" radius="xl">
                      <IconPrinter size={18} />
                    </ActionIcon>
                    <ActionIcon variant="light" radius="xl">
                      <IconDownload size={18} />
                    </ActionIcon>
                  </Group>
                </Group>
              </Group>

              <Center py={50}>
                <Stack align="center" gap="sm">
                  <Text c="dimmed" ta="center">
                    Nenhum lançamento no período
                  </Text>
                </Stack>
              </Center>
            </Tabs.Panel>

            <Tabs.Panel value="entradas-saidas">
              <Center py={50}>
                <Text c="dimmed">Conteúdo de Entradas x Saídas</Text>
              </Center>
            </Tabs.Panel>

            <Tabs.Panel value="contas">
              <Center py={50}>
                <Text c="dimmed">Conteúdo de Contas</Text>
              </Center>
            </Tabs.Panel>

            <Tabs.Panel value="tags">
              <Center py={50}>
                <Text c="dimmed">Conteúdo de Tags</Text>
              </Center>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </motion.div>
    </Container>
  );
}
