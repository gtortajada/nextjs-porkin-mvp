"use client";

import { AccountCard } from "@/components/accountCard";
import { BlogDropdown } from "@/components/blogDropdown";
import { CardPlaceholder } from "@/components/cardPlaceholder";
import { InfoCard, InfoCardPlaceholder } from "@/components/infoCard";
import { QuickAccess } from "@/components/quickAcess";
import { Container, Grid, Space } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <Container fluid p="lg">
      <QuickAccess />
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            title="Saldo geral"
            value="R$ 0,00"
            icon={<IconEye size={14} />}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCard
            title="Todas as faturas"
            value="R$ 0,00"
            icon={<IconEye size={14} />}
            color="green"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <AccountCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <CardPlaceholder />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Contas a pagar"
            message="No momento você não possui contas a pagar"
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
            title="Contas a receber"
            message="Você não possui contas a receber pendentes"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <InfoCardPlaceholder
            title="Limite de gastos de Maio"
            message="Nenhum Limite de Gasto definido para o período"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <BlogDropdown />
        </Grid.Col>
      </Grid>
      <Space h="xl" />
    </Container>
  );
}