'use client';

import {
  Box,
  Paper,
  Stack,
  Text,
  type PaperProps,
  type TextProps,
} from '@mantine/core';
import { motion } from 'framer-motion';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';

export type GalleryCardProps = PaperProps & {
  /** Background image of the card */
  backgroundImageUrl: string;

  /** sizes for the background image */
  backgroundImageSizes: NextImageProps['sizes'];

  /** background image alt */
  backgroundImageAlt: NextImageProps['alt'];

  /** Title of the card */
  title?: string;

  /** Props for the title */
  titleProps?: TextProps;

  /** Subtitle of the card */
  subtitle?: string;

  /** Props for the subtitle */
  subtitleProps?: TextProps;

  /** Whether to show the gradient */
  withGradient?: boolean;
};

export const GalleryCard = ({
  title,
  subtitle,
  backgroundImageUrl,
  backgroundImageSizes,
  backgroundImageAlt,
  titleProps = { style: { textWrap: 'balance' } },
  subtitleProps = { style: { textWrap: 'balance' } },
  style,
  withGradient = true,
  ...paperProps
}: GalleryCardProps) => {
  return (
    <Paper
      p="md"
      pos="relative"
      style={{ overflow: 'hidden', ...style }}
      {...paperProps}
    >
      {backgroundImageUrl && (
        <motion.div
          initial={{ scale: 1 }}
          style={{
            position: 'absolute',
            top: '-5%',
            left: '-5%',
            right: '-5%',
            bottom: '-5%',
            zIndex: 0,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <NextImage
            src={backgroundImageUrl}
            alt={backgroundImageAlt}
            sizes={backgroundImageSizes}
            style={{ objectFit: 'cover' }}
            priority={false}
            fill
          />
        </motion.div>
      )}
      {withGradient && (
        <Box
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70%',
            background:
              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%)',
            zIndex: 1,
            pointerEvents: 'none',
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
          pointerEvents: 'none',
          userSelect: 'none',
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