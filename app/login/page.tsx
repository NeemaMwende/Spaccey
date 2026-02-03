"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Particle = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  duration: number;
};

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [particles, setParticles] = useState<Particle>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      x1: Math.random() * window.innerWidth,
      x2: Math.random() * window.innerWidth,
      y1: Math.random() * window.innerHeight,
      y2: Math.random() * window.innerHeight,
      duration: Math.random() * 10 + 10,
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [p.x1, p.x2],
              y: [p.y1, p.y2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-bold tracking-wider mb-2">SPACEY</h1>
              <p className="text-sm text-cyan-400 tracking-[0.3em] uppercase">
                Virtual Era
              </p>
            </Link>
          </motion.div>

          <Card className="border-cyan-500/20 bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold gradient-text">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-400">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10 bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-900"
                    />
                    Remember me
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-900 px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-400">
                  No account yet?{" "}
                  <Link
                    href="/signup"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>

          {/* Back to home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-6"
          >
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
            >
              ← Back to home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
