import {
  Box,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import {
  IconArrowDownCircle,
  IconArrowUpCircle,
  IconArrowsLeftRight,
  IconUpload,
} from "@tabler/icons-react";
import classes from "./quickAcess.module.css";

interface QuickAccessButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

function QuickAccessButton({ icon, label, color }: QuickAccessButtonProps) {
  return (
    <UnstyledButton className={classes.button} onClick={() => {}}>
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

export function QuickAccess() {
  const userName = "Gustavo!";
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
      <Group justify="space-between" align="flex-start">
        <Group>
          <Box mb="lg">
            <Text size="lg">Bom dia,</Text>
            <Text size="xl" fw={700}>
              {userName}
            </Text>
          </Box>{" "}
          <Stack gap={0}>
            <Text size="xs" c="dimmed">
              receita mensal
            </Text>
            <Text size="lg" fw={500} c="green">
              R$ 0,00
            </Text>
          </Stack>
          <Stack gap={0}>
            <Text size="xs" c="dimmed">
              despesa mensal
            </Text>
            <Text size="lg" fw={500} c="red">
              R$ 0,00
            </Text>
          </Stack>
          <ThemeIcon variant="light" size="lg" radius="xl">
            <IconArrowsLeftRight size={18} />
          </ThemeIcon>
        </Group>

        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Acesso rápido
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
            <QuickAccessButton
              icon={<IconArrowsLeftRight size={18} />}
              label="TRANSF."
              color="blue"
            />
            <QuickAccessButton
              icon={<IconUpload size={18} />}
              label="IMPORTAR"
              color="gray"
            />
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
