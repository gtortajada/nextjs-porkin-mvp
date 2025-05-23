"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return null;
  return (
    <>
      <main>{children}</main>
    </>
  );
}

// import { IdeaSubmissionDrawer } from "@/components/forms/ideaSubmissionDrawer";
// import { AppShell, Group } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useDisclosure } from "@mantine/hooks";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";

// export default function AuthenticatedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [drawerOpened, { close: closeDrawer }] =
//     useDisclosure(false);
//   const { status } = useSession();

//   const form = useForm({
//     initialValues: {
//       title: "",
//       description: "",
//       zodiac: [] as string[],
//     },
//     validate: {
//       title: (value) =>
//         value.trim().length === 0 ? "Title is required" : null,
//       description: (value) => {
//         if (value.trim().length === 0) return "Description is required";
//         if (value.length > 200)
//           return "Description must be at most 200 characters";
//         return null;
//       },
//       zodiac: (value) =>
//         value.length === 0 ? "Select at least one zodiac sign" : null,
//     },
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedForm = localStorage.getItem("ideaSubmissionForm");
//       if (savedForm) {
//         form.setValues(JSON.parse(savedForm));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       localStorage.setItem("ideaSubmissionForm", JSON.stringify(form.values));
//     }
//   }, [form.values]);

//   if (status === "unauthenticated") {
//     redirect("/login");
//   }

//   return (
//     <AppShell padding="md">
//       {/* Simple header with logout */}
//       <AppShell.Header p="md">
//         <Group justify="flex-end"></Group>
//       </AppShell.Header>

//       <IdeaSubmissionDrawer
//         opened={drawerOpened}
//         onClose={closeDrawer}
//         form={form}
//       />

//       <AppShell.Main>{children}</AppShell.Main>
//     </AppShell>
//   );
// }
