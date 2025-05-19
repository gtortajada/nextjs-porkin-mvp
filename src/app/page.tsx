import Link from "next/link";
import { Hero03 } from "@/components/titanium/mantine/blocks/hero-03";
import { Passos } from "@/components/titanium/mantine/blocks/passos";
import { Funcionalidades } from "@/components/titanium/mantine/blocks/funcionalidades";

export default async function Home() {
  return (
    <main>
      <div
        style={{
          display: "flex",
          backgroundColor: "darkcyan",
          padding: "1rem",
          justifyContent: "space-evenly",
        }}
      >
        <Link href="/login">Entre</Link>
        <Link href="/register">Registre-se</Link>
        <Link href="/onboarding">Onboarding</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <Hero03 />
      <Passos />
      <Funcionalidades />
    </main>
  );
}
