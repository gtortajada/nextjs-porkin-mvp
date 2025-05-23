'use client';

import { usePathname } from "next/navigation";
import NavbarUnauthenticated from "./navbarUnauthenticated";
import NavbarAuthenticated from "./navbarAuthenticated";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAuthRoute = [
    '/dashboard',
    '/onboarding',
    '/visao-geral',
    '/lancamentos',
    '/relatorios',
    '/metas'
  ].some(route => pathname.startsWith(route));

  return isAuthRoute ? <NavbarAuthenticated /> : <NavbarUnauthenticated />;
}