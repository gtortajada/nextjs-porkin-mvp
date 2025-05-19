"use client";

import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Collapse,
  Divider,
  Drawer,
  Group,
  MultiSelect,
  ScrollArea,
  Skeleton,
  Text,
  Textarea,
  TextInput,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBulb,
  IconChevronDown,
  IconChevronUp,
  IconLogout,
} from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { createContext, useEffect } from "react";

type IdeaSubmissionDrawerContextType = {
  openDrawer: () => void;
  closeDrawer: () => void;
  form: UseFormReturnType<{
    title: string;
    description: string;
    zodiac: string[];
  }>;
};
const IdeaSubmissionDrawerContext =
  createContext<IdeaSubmissionDrawerContextType>(
    {} as IdeaSubmissionDrawerContextType
  );

//! THIS IS A PLACEHOLDER COMPONENT, THE MOCKUP ITEMS SHOULD BE REPLACED WITH REAL DATA
function NavbarSection({
  title,
  mockupItems,
  open = true,
}: {
  title: string;
  mockupItems: number; //! In the future, this should be replaced with real data like [{title, linkTo}]
  open?: boolean;
}) {
  const [opened, { toggle }] = useDisclosure(open);

  return (
    <Box mb="md">
      <UnstyledButton onClick={toggle} w="100%">
        <Group justify="space-between">
          <Text fw={500}>{title}</Text>
          {opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </Group>
      </UnstyledButton>

      <Collapse in={opened}>
        {Array(mockupItems)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={false} />
          ))}
      </Collapse>
    </Box>
  );
}

//! @gtortajada TODO: This component should be moved to a separate file
function IdeaSubmissionDrawer({
  opened,
  onClose,
  form,
}: {
  opened: boolean;
  onClose: () => void;
  form: UseFormReturnType<{
    title: string;
    description: string;
    zodiac: string[];
  }>;
}) {
  const zodiacOptions = [
    { value: "aries", label: "Áries" },
    { value: "touro", label: "Touro" },
    { value: "gemeos", label: "Gêmeos" },
    { value: "cancer", label: "Câncer" },
    { value: "leao", label: "Leão" },
    { value: "virgem", label: "Virgem" },
    { value: "libra", label: "Libra" },
    { value: "escorpiao", label: "Escorpião" },
    { value: "sagitario", label: "Sagitário" },
    { value: "capricornio", label: "Capricórnio" },
    { value: "aquario", label: "Aquário" },
    { value: "peixes", label: "Peixes" },
  ];

  const handleSubmit = (values: typeof form.values) => {
    console.log("Submitting idea:", values);

    fetch("/api/ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        const responseParsed = response.json();
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Network response:", responseParsed);
        return responseParsed;
      })
      .then((data) => {
        console.log("Idea submitted successfully:", data);
        onClose();
        localStorage.removeItem("ideaSubmissionForm");
        form.reset();
      })
      .catch((error) => {
        console.error("Error submitting idea:", error);
      });
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        onClose();
      }}
      title="Cadastrar ideia"
      position="right"
      size="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Título"
          placeholder="Insira o título da ideia"
          required
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Descrição"
          placeholder="Descreva sua ideia em até 200 caracteres"
          required
          maxLength={200}
          mt="md"
          {...form.getInputProps("description")}
        />
        <MultiSelect
          label="Signos necessários no projeto"
          placeholder="Selecione os signos"
          data={zodiacOptions}
          required
          mt="md"
          {...form.getInputProps("zodiac")}
        />
        <Button type="submit" fullWidth mt="md">
          Enviar
        </Button>
      </form>
    </Drawer>
  );
}

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showDashboardLink = pathname !== "/dashboard";
  const [opened, { toggle }] = useDisclosure();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const form = useForm({
    initialValues: JSON.parse(
      typeof window !== "undefined"
        ? localStorage.getItem("ideaSubmissionForm") ||
            JSON.stringify({
              title: "",
              description: "",
              zodiac: [] as string[],
            })
        : JSON.stringify({
            title: "",
            description: "",
            zodiac: [] as string[],
          })
    ),
    validate: {
      title: (value) =>
        value.trim().length === 0 ? "Title is required" : null,
      description: (value) => {
        if (value.trim().length === 0) return "Description is required";
        if (value.length > 200)
          //! THIS VALIDATION IS NOT WORKING
          return "Description must be at most 200 characters";
        return null;
      },
      zodiac: (value) =>
        value.length === 0 ? "Select at least one zodiac sign" : null,
    },
  });
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ideaSubmissionForm", JSON.stringify(form.values));
    }
  }, [form.values]);

  return (
    <IdeaSubmissionDrawerContext.Provider
      value={{ openDrawer, closeDrawer, form }}
    >
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Group>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Title order={2}>Porkin</Title>
            </Group>

            <Button
              leftSection={<IconBulb size={20} />}
              onClick={openDrawer}
              visibleFrom="sm"
            >
              Cadastrar ideia
            </Button>
          </Group>
        </AppShell.Header>

        <IdeaSubmissionDrawer
          opened={drawerOpened}
          onClose={closeDrawer}
          form={form}
        />

        <AppShell.Navbar p="md">
          {showDashboardLink && (
            <AppShell.Section>
              <Link href="/dashboard">
                <Text size="lg" fw={700} mb="md">
                  Ir para central de ideias
                </Text>
              </Link>
              <Divider mb="md" />
            </AppShell.Section>
          )}

          <AppShell.Section grow component={ScrollArea}>
            <NavbarSection title="Minhas metas" mockupItems={2} />
            <Divider my="md" />
            <NavbarSection title="Meus gastos" mockupItems={2} />
            <Divider my="md" />
            <NavbarSection
              title="Meus recebimentos"
              mockupItems={2}
              open={false}
            />
          </AppShell.Section>

          <AppShell.Section>
            <Divider mb="md" />
            <Group gap="sm" justify="space-between">
              <Group gap="sm">
                <Avatar
                  src={session?.user?.image}
                  radius="xl"
                  size="md"
                  alt="User avatar"
                />
                <div>
                  <Text size="sm" fw={500}>
                    {session?.user?.name || "Anonymous"}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {session?.user?.email}
                  </Text>
                </div>
              </Group>

              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => signOut({ callbackUrl: "/login" })}
                title="Sign out"
              >
                <IconLogout size={20} stroke={1.5} />
              </ActionIcon>
            </Group>
          </AppShell.Section>
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </IdeaSubmissionDrawerContext.Provider>
  );
}

//! TODO: Check where is the best place to put this hook
// export const useIdeaSubmissionDrawer = () => {
//   return useContext(IdeaSubmissionDrawerContext);
// };
