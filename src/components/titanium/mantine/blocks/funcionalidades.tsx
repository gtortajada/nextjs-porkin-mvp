"use client";

import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import classes from "./funcionalidades.module.css";

export const Funcionalidades = () => {
  const features = [
    {
      title: "Controle Inteligente de Gastos",
      description: "Registre despesas em segundos, categorize hábitos e descubra para onde seu dinheiro está indo"
    },
    {
      title: "Gestão de Recebimentos", 
      description: "Centralize entradas, programe lembretes e nunca mais perca um pagamento."
    },
    {
      title: "Metas que Motivam",
      description: "Crie objetivos personalizados (curto, médio e longo prazo) e acompanhe progressos com gráficos intuitivos."
    },
    {
      title: "Relatórios Poderosos",
      description: "Dados claros = decisões melhores. Saiba exatamente onde ajustar para acelerar resultados."
    }
  ];

  return (
    <Container py={30} size="xl" fluid>
      <Flex direction="column" align="center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title
            order={2}
            ta="center"
            fz="2rem"
            mb="xl"
          >
            Como fazemos isso? Simples,
          </Title>
        </motion.div>

        <Flex
          direction="column"
          gap="md"
          w="100%"
          maw={1400}
          mx="auto"
          mb="xl"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ 
                background: "var(--mantine-color-grape-5)",
                paddingLeft: "1.5rem"
              }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={classes.card}
            >
              <Flex
                direction="column"
                p="xs"
                style={{
                  borderRadius: "var(--mantine-radius-xl)",
                  transition: "all 0.3s ease"
                }}
              >
                <Title order={3} fz="1.5rem" mb="xs">
                  {feature.title}
                </Title>
                <Text fz="md">{feature.description}</Text>
              </Flex>
            </motion.div>
          ))}
        </Flex>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Button
              variant="gradient"
              size="lg"
              radius="xl"
              gradient={{ from: "gray", to: "grape", deg: 90 }}
            >
              Quero começar
            </Button>
        </motion.div>
      </Flex>
    </Container>
  );
};