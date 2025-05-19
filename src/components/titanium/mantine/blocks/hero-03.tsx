"use client";

import { JumboTitle } from "@/components/titanium/mantine/components/jumbo-title";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  ContainerProps,
  Flex,
  Rating,
  Stack,
  Text
} from "@mantine/core";
import { motion } from "framer-motion";
import classes from "./hero-03.module.css";

type ImageItem = { src: string; alt: string };

type Hero03Props = ContainerProps & {
  avatarItems?: ImageItem[];
  title?: string;
  description?: string;
  rating?: number;
  ratingLabel?: string;
};

export const Hero03 = ({
  title = "Domine seu dinheiro, conquiste sua liberdade!",
  description = "No Porkin, acreditamos que o controle financeiro é a chave para uma vida sem preocupações.",
  rating = 5,
  ratingLabel = "Mais de 5 pessoas confiam no Porkin",
  avatarItems = AVATAR_ITEMS_DEMO,
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
      <Flex h="100%" align="center" pos="relative" justify="center">
        <Stack
          pt={{ base: "xl", sm: 0 }}
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
              ta="center"
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
            >
              Experimente Grátis
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <Stack align="center" mt="md">
              <AvatarGroup>
                {avatarItems.map((avatarItem, index) => (
                  <Avatar
                    key={index}
                    src={avatarItem.src}
                    className={classes.avatar}
                  />
                ))}
              </AvatarGroup>
              <Stack align="center" gap={4}>
                {rating && (
                  <Rating color="var(--mantine-color-text)" value={rating} />
                )}
                {ratingLabel && (
                  <Text ta="center" fz="sm" c="dimmed">
                    {ratingLabel}
                  </Text>
                )}
              </Stack>
            </Stack>
          </motion.div>
        </Stack>
      </Flex>
    </Container>
  </Container>
);

const AVATAR_ITEMS_DEMO: ImageItem[] = [
  {
    src: "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1645857195444-2064b4ecabf3?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?&format&fit=facearea&facepad=3&w=900&h=900&q=80&ixlib=rb-1.2.1",
    alt: "",
  },
  {
    src: "https://images.unsplash.com/photo-1707672972137-64390186af62?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "",
  },
];
