"use client";

import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import styles from "./register.module.css";

export default function Register() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { status } = useSession();

  if (status === "authenticated") {
    redirect("/dashboard");
  }

  if (isLoading) {
    //! TODO: @gtortajada create the styles for the loading state (use Mantine loading state)
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (isError) {
    //! TODO: @gtortajada create a custom error component (toast, snackbar, etc) USE MANTINE NOTIFICATION
    alert(message);
  }

  const handleCredentialRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setIsError(true);
      setMessage("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Request failed, please refresh you page and try again"
        );
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) throw new Error(signInResult.error);
      window.location.href = "/onboarding";

      setMessage(data.message);
    } catch (error) {
      console.error("Error during register:", error);
      setIsError(true);
      setMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = () => {
    signIn("github", {
      callbackUrl: "/onboarding",
    });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <div className={styles.registerHeader}>
          <h2>
            Venha cuidar do seu dinheiro e fazer o porkin crescer!
          </h2>
        </div>

        <div className={styles.registerFormContainer}>
          <form
            className={styles.registerForm}
            onSubmit={handleCredentialRegister}
          >
            <div className={styles.formGroup}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Nome"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
                autoComplete="new-password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <button type="submit" className={styles.createAccountButton}>
                Criar conta
              </button>
            </div>
          </form>

          <div className={styles.socialSignInSection}>
            <div className={styles.divider}>
              <span>Ou continue com</span>
            </div>

            <div className={styles.socialButtons}>
              <div className={styles.socialButton}>
                <button
                  type="button"
                  onClick={handleGitHubSignIn}
                  className={styles.socialLink}
                >
                  <svg
                    className={styles.socialIcon}
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
