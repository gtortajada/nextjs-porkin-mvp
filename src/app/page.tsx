import { Funcionalidades } from "@/components/titanium/mantine/blocks/funcionalidades";
import { Hero03 } from "@/components/titanium/mantine/blocks/hero-03";
import { Passos } from "@/components/titanium/mantine/blocks/passos";

export default async function Home() {
  return (
    <main>
      <Hero03 />
      <Passos />
      <Funcionalidades />
    </main>
  );
}