"use client";

import { JumboTitle } from "@/components/titanium/mantine/components/jumbo-title";
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Flex,
  Stack,
  Text,
} from "@mantine/core";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import classes from "./hero-03.module.css";

type ImageItem = { src: string; alt: string };

type Hero03Props = ContainerProps & {
  avatarItems?: ImageItem[];
  title?: string;
  description?: string;
};

export const Hero03 = ({
  title = "Domine seu dinheiro, conquiste sua liberdade!",
  description = "No Porkin, acreditamos que o controle financeiro é a chave para uma vida sem preocupações.",
  ...containerProps
}: Hero03Props) => (
  <Container
    pos="relative"
    h="100vh"
    mah={950}
    style={{ overflow: "hidden" }}
    fluid
  >
    <Container
      component="section"
      h="100vh"
      mah={950}
      mx="auto"
      size="xl"
      {...containerProps}
    >
      <Box
        pos="absolute"
        top={0}
        left={0}
        h="100%"
        w="100%"
        className={classes["vertical-backdrop"]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        style={{
          position: "absolute",
          bottom: "100px",
          right: 0,
          zIndex: 0,
          filter: "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))",
        }}
      >
        <Box
          pos="relative"
          w={{ base: 500, sm: 800 }}
          h={{ base: 450, sm: 800 }}
          style={{
            filter: "drop-shadow(0 8px 5px rgba(0, 0, 0, 0.1))",
          }}
        >
          <Image
            src="/images/cellPhone.png"
            alt="Smartphone showing financial app"
            fill
            style={{
              objectFit: "contain",
              objectPosition: "bottom right",
            }}
          />
        </Box>
      </motion.div>
      <Flex h="100%" align="center" pos="relative" justify="center">
        <Stack
          pt={{ base: 0, sm: 0 }}
          maw="var(--mantine-breakpoint-md)"
          align="center"
          gap="lg"
          style={{ zIndex: 1 }}
        >
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <JumboTitle
              ta="left"
              order={1}
              fz="lg"
              style={{ textWrap: "balance" }}
            >
              {title}
            </JumboTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <Text
              ta="center"
              maw="var(--mantine-breakpoint-xs)"
              fz="xl"
              style={{ textWrap: "balance" }}
            >
              {description}
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <Button
              variant="gradient"
              size="lg"
              radius="xl"
              gradient={{ from: "gray", to: "grape", deg: 90 }}
              component={Link}
              href="/register"
            >
              Experimente Grátis
            </Button>
          </motion.div>
        </Stack>
      </Flex>
    </Container>
  </Container>
);
