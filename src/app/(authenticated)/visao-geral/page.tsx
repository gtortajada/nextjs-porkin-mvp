"use client";

import { InfoCard, InfoCardPlaceholder } from "@/components/infoCard";
import {
  Box,
  Card,
  Container,
  Grid,
  Group,
  Space,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconArrowDownCircle, IconArrowUpCircle } from "@tabler/icons-react";

interface QuickAccessButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

function QuickAccessButton({ icon, label, color }: QuickAccessButtonProps) {
  return (
    <UnstyledButton
      onClick={() => {}}
      style={(theme) => ({
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        transition: "background-color 150ms ease",
        "&:hover": {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Stack align="center" gap="xs">
        <ThemeIcon color={color} variant="light" size="lg" radius="xl">
          {icon}
        </ThemeIcon>
        <Text size="xs" ta="center">
          {label}
        </Text>
      </Stack>
    </UnstyledButton>
  );
}

export default function DashboardPage() {
  return (
    <Container fluid p="lg">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
        <Group justify="space-between" align="flex-start">
          <Group>
            <Box>
              <Text size="lg">Olá,</Text>
              <Text size="xl" fw={700}>
                Gustavo!
              </Text>
            </Box>
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                meta a ser alcançada
              </Text>
              <Text size="lg" fw={500} c="blue">
                R$ 5.000,00
              </Text>
            </Stack>
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                receita mensal
              </Text>
              <Text size="lg" fw={500} c="green">
                R$ 3.350,00
              </Text>
            </Stack>
            <Stack gap={0}>
              <Text size="xs" c="dimmed">
                despesa mensal
              </Text>
              <Text size="lg" fw={500} c="red">
                R$ 2.530,62
              </Text>
            </Stack>
          </Group>

          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Adicionar
            </Text>
            <Group>
              <QuickAccessButton
                icon={<IconArrowDownCircle size={18} />}
                label="DESPESA"
                color="red"
              />
              <QuickAccessButton
                icon={<IconArrowUpCircle size={18} />}
                label="RECEITA"
                color="green"
              />
            </Group>
          </Stack>
        </Group>
      </Card>
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            title="Total economizado"
            value="R$ 1.480,00"
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Próximas contas a pagar"
            message="No momento você não possui contas a pagar"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Próximas contas a receber"
            message="Você não possui contas a receber pendentes"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Maiores gastos do mês atual"
            message="Sem gastos no período"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Limite de gastos do mês atual"
            message="Nenhum Limite de Gasto definido para o período"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}></Grid.Col>
      </Grid>
      <Space h="xl" />
    </Container>
  );
}
