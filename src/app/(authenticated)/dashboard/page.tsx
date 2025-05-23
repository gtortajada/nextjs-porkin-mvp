import { auth } from "@/auth";
import { Grid, Card, Text, Title } from '@mantine/core';

export default async function Dashboard() {
  const session = await auth();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ideas`, {
      method: 'GET',
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch ideas');
    }

    const ideas = await response.json();

    return (
      <main style={{ padding: '1rem' }}>
        <Title order={1} mb="sm">
          Bem vindo ao Porkin, {session?.user?.name}!
        </Title>
        <Text size="xl" mb="lg">
          Aqui você encontra todos seus gastos, economias, metas ou criar novos.
        </Text>

        <Grid>
          {ideas.length === 0 ? (
            <Text style={{ fontStyle: 'italic' }} color="dimmed">
              Nenhum gasto, economia ou meta encontrado. Cadastre agora!
            </Text>
          ) : (
            ideas.map((idea: { _id: string; title: string; description: string; zodiac: string; userId: string; createdAt: string }) => (
              <Grid.Col key={idea._id} span={{ base: 12, md: 6, lg: 4 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Title order={3}>{idea.title}</Title>
                  
                  <Text mt="sm" lineClamp={3}>
                    {idea.description}
                  </Text>
                  
                  <div style={{ marginTop: '1rem' }}>
                    <Text size="sm" c="dimmed">
                      Zodiac: {idea.zodiac}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Created by: {idea.userId}
                    </Text>
                    <Text size="sm" c="dimmed">
                      Created: {new Date(idea.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                </Card>
              </Grid.Col>
            ))
          )}
        </Grid>
      </main>
    );
  } catch (error) {
    console.error('Error loading ideas:', error);
    return (
      <main>
        <Title order={1} mb="sm">
          Bem vindo ao Porkin, {session?.user?.name}!
        </Title>
        <Text color="red">Erro ao carregar. Tente novamente.</Text>
      </main>
    );
  }
}