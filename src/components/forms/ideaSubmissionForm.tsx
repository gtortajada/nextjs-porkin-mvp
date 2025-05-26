"use client";

import { Button, Group, MultiSelect, TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type FormValues = {
  title: string;
  description: string;
  zodiac: string[];
};

export type IdeaSubmissionFormProps = {
  form: UseFormReturnType<FormValues>;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  zodiacOptions: Array<{ value: string; label: string }>;
};

export function IdeaSubmissionForm({
  form,
  onSubmit,
  onCancel,
  zodiacOptions,
}: IdeaSubmissionFormProps) {
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Título"
        placeholder="Insira o título da ideia"
        required
        {...form.getInputProps("title")}
      />
      <Textarea
        label="Descrição"
        placeholder="Descreva sua ideia em até 200 caracteres"
        required
        maxLength={200}
        mt="md"
        {...form.getInputProps("description")}
      />
      <MultiSelect
        label="Signos necessários no projeto"
        placeholder="Selecione os signos"
        data={zodiacOptions}
        required
        mt="md"
        {...form.getInputProps("zodiac")}
      />
      <Group mt="xl">
        <Button type="submit" fullWidth>
          Enviar
        </Button>
        <Button variant="outline" fullWidth onClick={onCancel}>
          Cancelar
        </Button>
      </Group>
    </form>
  );
}
