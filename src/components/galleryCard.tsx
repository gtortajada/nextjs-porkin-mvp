"use client";

import {
  Box,
  Paper,
  Stack,
  Text,
  type PaperProps,
  type TextProps,
} from "@mantine/core";
import { motion } from "framer-motion";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export type GalleryCardProps = PaperProps & {
  backgroundImageUrl: string;
  backgroundImageSizes: NextImageProps["sizes"];
  backgroundImageAlt: NextImageProps["alt"];
  title?: string;
  titleProps?: TextProps;
  subtitle?: string;
  subtitleProps?: TextProps;
  withGradient?: boolean;
};

export const GalleryCard = ({
  title,
  subtitle,
  backgroundImageUrl,
  backgroundImageSizes,
  backgroundImageAlt,
  titleProps = { style: { textWrap: "balance" } },
  subtitleProps = { style: { textWrap: "balance" } },
  style,
  withGradient = true,
  ...paperProps
}: GalleryCardProps) => {
  return (
    <Paper
      p="md"
      pos="relative"
      style={{ overflow: "hidden", ...style }}
      {...paperProps}
    >
      {backgroundImageUrl && (
        <motion.div
          initial={{ scale: 1 }}
          style={{
            position: "absolute",
            top: "-5%",
            left: "-5%",
            right: "-5%",
            bottom: "-5%",
            zIndex: 0,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <NextImage
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            sizes={backgroundImageSizes}
            style={{ objectFit: "cover" }}
            priority={false}
            fill
          />
        </motion.div>
      )}
      {withGradient && (
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}
      <Stack
        gap={0}
        h="100%"
        justify="end"
        pos="relative"
        style={{
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {title && (
          <Text c="white" fz="lg" fw="bold" {...titleProps}>
            {title}
          </Text>
        )}
        {subtitle && (
          <Text c="white" fz="md" {...subtitleProps}>
            {subtitle}
          </Text>
        )}
      </Stack>
    </Paper>
  );
};
