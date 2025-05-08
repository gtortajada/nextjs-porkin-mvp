import Link from "next/link";

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
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/onboarding">Onboarding</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <h1>
        Public home page (probably will redirect to the landing page @bet will
        create)
      </h1>
    </main>
  );
}
