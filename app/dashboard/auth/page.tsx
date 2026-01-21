"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import EmailVerificationModal from "@/components/auth/EmailVerificationModal";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Shield,
} from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    signUp,
    signIn,
    signInWithGoogle,
    isLoading,
    isEmailVerified,
    user,
    isAuthenticated,
    isAdmin,
  } = useSupabaseAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });

  // Si l'utilisateur est déjà connecté et vérifié, lui proposer d'aller au dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setSuccess(
        "Vous êtes déjà connecté ! Cliquez ci-dessous pour accéder à votre dashboard."
      );
    }
  }, [isAuthenticated, isLoading]);

  // Gérer les paramètres URL
  useEffect(() => {
    const verified = searchParams.get("verified");
    const reset = searchParams.get("reset");

    if (verified === "true") {
      setSuccess(
        "Email vérifié avec succès ! Vous pouvez maintenant vous connecter."
      );
    }

    if (reset === "true") {
      setSuccess("Vous pouvez maintenant définir votre nouveau mot de passe.");
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const { data, error: signInError } = await signIn(loginForm.email, loginForm.password);

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        setError(
          "Email ou mot de passe incorrect. Vérifiez vos informations de connexion."
        );
      } else if (signInError.message.includes("Email not confirmed")) {
        if (loginForm.email === "contact@tech-trust.fr") {
          setSuccess(
            "Connexion admin réussie ! Redirection automatique vers l'interface admin..."
          );
        } else {
          setError(
            "Votre email n'est pas encore vérifié. Vérifiez votre boîte email."
          );
          setShowEmailModal(true);
        }
      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    } else if (data.user) {
      if (loginForm.email === "contact@tech-trust.fr") {
        setSuccess("Connexion admin réussie ! Redirection...");
        goToDashboard();
      } else if (!data.user.email_confirmed_at) {
        setError("Veuillez vérifier votre email avant de vous connecter.");
        setShowEmailModal(true);
      } else {
        setSuccess("Connexion réussie ! Redirection...");
        goToDashboard();
      }
    }

    setIsSubmitting(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setIsSubmitting(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      setIsSubmitting(false);
      return;
    }

    const { error: signUpError } = await signUp(
      registerForm.email,
      registerForm.password,
      registerForm.name,
      registerForm.companyName || undefined
    );

    if (signUpError) {
      if (signUpError.message.includes("User already registered")) {
        setError("Un compte existe déjà avec cette adresse email.");
      } else {
        setError("Erreur lors de l'inscription. Veuillez réessayer.");
      }
    } else {
      if (registerForm.email === "contact@tech-trust.fr") {
        setSuccess(
          "Compte admin créé ! Vous pouvez maintenant vous connecter."
        );
        setActiveTab("login");
      } else {
        setSuccess(
          "Inscription réussie ! Vérifiez votre email pour activer votre compte."
        );
      }
    }

    setIsSubmitting(false);
  };

  const handleGoogleAuth = async () => {
    setError(null);
    const { error: googleError } = await signInWithGoogle();

    if (googleError) {
      setError("Erreur lors de la connexion avec Google.");
    }
  };

  const goToDashboard = () => {
    if (isAdmin || user?.email === "contact@tech-trust.fr") {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard");
    }
  };

  // Rediriger immédiatement si l'utilisateur est déjà authentifié et email vérifié
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      goToDashboard();
    }
  }, [isAuthenticated, isLoading]);

  // Afficher l'état de vérification si l'utilisateur est connecté mais pas vérifié
  if (
    user &&
    !isEmailVerified &&
    user.email !== "contact@tech-trust.fr" &&
    !isLoading
  ) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50">
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Mail className="w-6 h-6 text-blue-500" />
                Vérification email requise
              </CardTitle>
              <CardDescription>
                Votre compte a été créé avec succès
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  Veuillez vérifier votre adresse email{" "}
                  <strong>{user.email}</strong>
                  pour accéder à votre espace client.
                </AlertDescription>
              </Alert>

              <Button
                onClick={() => setShowEmailModal(true)}
                className="w-full"
              >
                Gérer la vérification email
              </Button>
            </CardContent>
          </Card>
        </main>

        <EmailVerificationModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
        />
      </div>
    );
  }

  // Afficher un spinner si on est en train de charger
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Espace Client <span className="text-blue-500">Techtrust</span>
            </h1>
            <p className="text-lg text-gray-600">
              Accédez à vos outils IA et gérez vos projets digitaux
            </p>
          </div>

          {/* Message spécial pour l'admin */}
          {(loginForm.email === "contact@tech-trust.fr" ||
            registerForm.email === "contact@tech-trust.fr") && (
            <Alert className="mb-4 border-orange-200 bg-orange-50">
              <Shield className="w-4 h-4" />
              <AlertDescription className="text-orange-800">
                <strong>Compte Administrateur détecté</strong>
                <br />
                Accès direct aux fonctionnalités d&apos;administration après
                connexion.
              </AlertDescription>
            </Alert>
          )}

          {/* Bouton pour aller au dashboard si déjà connecté */}
          {isAuthenticated && (
            <div className="mb-6">
              <Button
                onClick={goToDashboard}
                className="w-full h-12 text-base bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Accéder au Dashboard
              </Button>
            </div>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="text-lg py-3">
                Se connecter
              </TabsTrigger>
              <TabsTrigger value="register" className="text-lg py-3">
                S&apos;inscrire
              </TabsTrigger>
            </TabsList>

            {/* Alertes globales */}
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <TabsContent value="login">
              <Card className="shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Connexion</CardTitle>
                  <CardDescription className="text-lg">
                    Accédez à votre dashboard personnalisé
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-base font-medium"
                      >
                        Email
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="password"
                        className="text-base font-medium"
                      >
                        Mot de passe
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10 pr-12 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {isSubmitting ? "Connexion..." : "Se connecter"}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleAuth}
                    className="w-full h-12 text-base"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuer avec Google
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Mot de passe oublié ?
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="shadow-xl">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Créer un compte</CardTitle>
                  <CardDescription className="text-lg">
                    Rejoignez +2000 clients satisfaits
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium">
                        Nom complet *
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Jean Dupont"
                          value={registerForm.name}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              name: e.target.value,
                            })
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="company"
                        className="text-base font-medium"
                      >
                        Nom de la société (optionnel)
                      </Label>
                      <div className="relative mt-2">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Mon Entreprise SARL"
                          value={registerForm.companyName}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              companyName: e.target.value,
                            })
                          }
                          className="pl-10 h-12 text-base"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="email-register"
                        className="text-base font-medium"
                      >
                        Email professionnel *
                      </Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="email-register"
                          name="email"
                          type="email"
                          placeholder="jean@entreprise.com"
                          value={registerForm.email}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              email: e.target.value,
                            })
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="password-register"
                        className="text-base font-medium"
                      >
                        Mot de passe *
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="password-register"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerForm.password}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              password: e.target.value,
                            })
                          }
                          className="pl-10 pr-12 h-12 text-base"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Minimum 6 caractères
                      </p>
                    </div>

                    <div>
                      <Label
                        htmlFor="confirm-password"
                        className="text-base font-medium"
                      >
                        Confirmer le mot de passe *
                      </Label>
                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={registerForm.confirmPassword}
                          onChange={(e) =>
                            setRegisterForm({
                              ...registerForm,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="pl-10 h-12 text-base"
                          required
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {isSubmitting
                        ? "Création en cours..."
                        : "Créer mon compte"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm text-gray-500 hover:text-blue-500">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>

      <EmailVerificationModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </div>
  );
}
