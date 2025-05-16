"use client";

import { JumboTitle } from "@/components/titanium/mantine/components/jumbo-title";
import { Box, Container, Flex, Text } from "@mantine/core";
import { motion } from "framer-motion";

export const Passos = () => (
  <Container
    pos="relative"
    py={30}
    size="xl"
    style={{ overflow: "hidden" }}
  >
    <Flex
      h="100%"
      direction="column"
      align="center"
      justify="center"
      gap="xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <JumboTitle
          ta="center"
          order={4}
          fz="xs"
          mb="lg"
        >
          Os três passos para o resultado
        </JumboTitle>
      </motion.div>

      <Flex
        gap="xl"
        wrap="wrap"
        justify="center"
        maw={1200}
        mx="auto"
      >
        {[
          {
            emoji: "1️⃣",
            title: "Crie sua conta gratuita",
            description: "sem cartão de crédito, sem complicação"
          },
          {
            emoji: "2️⃣", 
            title: "Defina sua meta principal",
            description: "seja específico: valor, prazo, motivo"
          },
          {
            emoji: "3️⃣",
            title: "Comece a registrar",
            description: "1 minuto por dia é tudo que você precisa"
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <Box
              p="lg"
              maw={360}
              style={{
                borderRadius: "var(--mantine-radius-xl)",
                border: "1px solid var(--mantine-color-dark-5)",
                background: "none",
                cursor: "pointer"
              }}
            >
              <Text fz="2rem" mb="sm">{card.emoji}</Text>
              <Text fz="xl" fw={600} mb={4}>
                {card.title}
              </Text>
              <Text c="dimmed">{card.description}</Text>
            </Box>
          </motion.div>
        ))}
      </Flex>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Text
          ta="center"
          fz="xl"
          mt="xl"
          c="dimmed"
          style={{ fontStyle: "italic" }}
        >
          Antes complexo, agora simples: o dinheiro trabalha para você.
        </Text>
      </motion.div>
    </Flex>
  </Container>
);