"use client";

import { Drawer } from "@mantine/core";
import {
  IdeaSubmissionForm,
  type IdeaSubmissionFormProps,
} from "./ideaSubmissionForm";

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

type IdeaSubmissionDrawerProps = {
  opened: boolean;
  onClose: () => void;
  form: IdeaSubmissionFormProps["form"];
};

export function IdeaSubmissionDrawer({
  opened,
  onClose,
  form,
}: IdeaSubmissionDrawerProps) {
  const handleSubmit = (values: typeof form.values) => {
    console.log("Submitting idea:", values);
    onClose();
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Cadastrar ideia"
      position="right"
      size="md"
    >
      <IdeaSubmissionForm
        form={form}
        onCancel={onClose}
        onSubmit={handleSubmit}
        zodiacOptions={zodiacOptions}
      />
    </Drawer>
  );
}
