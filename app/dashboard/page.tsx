"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  LogOut,
  User,
  Settings,
  BarChart3,
  Zap,
  Globe,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: User,
      change: "+12.5%",
      color: "cyan",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      icon: Zap,
      change: "+8.2%",
      color: "purple",
    },
    {
      title: "Data Processed",
      value: "45.2 GB",
      icon: Database,
      change: "+23.1%",
      color: "blue",
    },
    {
      title: "Global Reach",
      value: "127",
      icon: Globe,
      change: "+5.4%",
      color: "pink",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
      <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold tracking-wider">PLUME</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                Analytics
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                Team
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-sm font-semibold">
                {session.user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-white">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-400">{session.user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="icon"
              className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welcome back, {session.user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-gray-400">
              Here is what is happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-400">
                        {stat.title}
                      </CardTitle>
                      <div
                        className={`p-2 rounded-lg bg-${stat.color}-500/10 group-hover:bg-${stat.color}-500/20 transition-colors`}
                      >
                        <stat.icon
                          className={`h-4 w-4 text-${stat.color}-400`}
                        />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-baseline justify-between">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <span className="text-sm text-green-400">
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Your latest project activities and updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            Project {i} Updated
                          </p>
                          <p className="text-xs text-gray-400">
                            {i} hour{i > 1 ? "s" : ""} ago
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-400" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "New Project",
                      "Upload Data",
                      "Generate Report",
                      "Invite Team",
                    ].map((action) => (
                      <Button
                        key={action}
                        variant="outline"
                        className="h-auto py-4 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Placeholder Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="border-slate-700 bg-slate-900/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Dashboard Under Construction</CardTitle>
                <CardDescription>
                  More components and features will be added here soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                      <Settings
                        className="h-8 w-8 text-cyan-400 animate-spin"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 gradient-text">
                      Coming Soon
                    </h3>
                    <p className="text-gray-400">
                      We're working on adding more features to your dashboard.
                      Stay tuned for analytics, project management, and more!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
