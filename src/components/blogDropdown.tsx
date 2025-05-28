import { Select } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function BlogDropdown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Select
        label=""
        placeholder="Conteúdos do blog"
        data={[]}
        rightSection={<IconChevronDown size="1rem" />}
        rightSectionWidth={30}
        comboboxProps={{ shadow: "md" }}
        styles={{ label: { marginBottom: "var(--mantine-spacing-xs)" } }}
      />
    </motion.div>
  );
}