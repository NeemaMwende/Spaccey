"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sparkles,
  MessageSquare,
  Image,
  Zap,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Layers,
  TrendingUp,
  Activity,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
};

const menuItems: MenuItem[] = [
  { id: "overview", label: "Overview", icon: Layers },
  { id: "ai-chat", label: "AI Chat", icon: MessageSquare, badge: "3" },
  { id: "image-gen", label: "Image Generator", icon: Image },
  { id: "models", label: "AI Models", icon: Brain },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "workflows", label: "Workflows", icon: Zap },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("overview");

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return <OverviewContent />;
      case "ai-chat":
        return <AIChatContent />;
      case "image-gen":
        return <ImageGenContent />;
      case "models":
        return <ModelsContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "workflows":
        return <WorkflowsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-70 bg-slate-900/50 backdrop-blur-xl border-r border-cyan-500/10 z-40"
          >
            <div className="flex flex-col h-full p-6">
              {/* Logo */}
              <div className="mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      VIRTUAL ERA
                    </h1>
                    <p className="text-xs text-gray-500">AI Platform</p>
                  </div>
                </div>
              </div>

              {/* User Profile */}
              <div className="mb-6 p-3 rounded-lg bg-slate-800/50 border border-cyan-500/10">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-purple-500 text-white">
                      {session?.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session?.user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveItem(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-400 hover:text-white hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="flex-1 text-left text-sm font-medium">
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-0 w-1 h-8 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-l-full"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Bottom Actions */}
              <div className="space-y-2 pt-6 border-t border-slate-800">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800/50 transition-all">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-70" : "ml-0"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-900/50 backdrop-blur-xl border-b border-cyan-500/10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-400 hover:text-white"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {menuItems.find((item) => item.id === activeItem)?.label}
                </h2>
                <p className="text-sm text-gray-500">
                  Powered by AI • Real-time processing
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade Pro
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6">
          <motion.div
            key={activeItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

// Content Components
function OverviewContent() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="AI Requests"
          value="12,458"
          change={"+12.5%"}
          icon={Cpu}
          color="cyan"
        />
        <StatsCard
          title="Models Active"
          value="8"
          change={"+2"}
          icon={Brain}
          color="purple"
        />
        <StatsCard
          title="Success Rate"
          value="98.4%"
          change={"+0.8%"}
          icon={TrendingUp}
          color="cyan"
        />
        <StatsCard
          title="Avg Response"
          value="1.2s"
          change={"-0.3s"}
          icon={Activity}
          color="purple"
        />
      </div>

      {/* Activity Feed & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900/50 border-cyan-500/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription>Your latest AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Generated marketing copy",
                  time: "2 minutes ago",
                  type: "Chat",
                },
                {
                  title: "Created product images",
                  time: "15 minutes ago",
                  type: "Image",
                },
                {
                  title: "Analyzed customer data",
                  time: "1 hour ago",
                  type: "Analytics",
                },
                {
                  title: "Optimized workflow",
                  time: "3 hours ago",
                  type: "Workflow",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-colors cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-400"
                  >
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription>Start something new</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: MessageSquare, label: "New Chat", color: "cyan" },
              { icon: Image, label: "Generate Image", color: "purple" },
              { icon: Zap, label: "Run Workflow", color: "cyan" },
              { icon: BarChart3, label: "View Analytics", color: "purple" },
            ].map((action, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-gray-300 hover:text-white transition-all"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AIChatContent() {
  return (
    <Card className="bg-slate-900/50 border-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          AI Chat Interface
        </CardTitle>
        <CardDescription>
          Have conversations with advanced AI models
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center border border-dashed border-cyan-500/20 rounded-lg">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Start a Conversation
              </h3>
              <p className="text-sm text-gray-400">
                Select a model and begin chatting with AI
              </p>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
              New Chat
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ImageGenContent() {
  return (
    <Card className="bg-slate-900/50 border-purple-500/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Image className="w-5 h-5 text-purple-400" />
          AI Image Generator
        </CardTitle>
        <CardDescription>
          Create stunning visuals with AI-powered generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-purple-500/10 hover:border-purple-500/30 transition-colors cursor-pointer"
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ModelsContent() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            name: "GPT-4 Turbo",
            type: "Language Model",
            status: "Active",
            usage: "85%",
          },
          {
            name: "DALL-E 3",
            type: "Image Generation",
            status: "Active",
            usage: "62%",
          },
          {
            name: "Claude 3",
            type: "Reasoning Model",
            status: "Active",
            usage: "73%",
          },
          {
            name: "Stable Diffusion",
            type: "Image Model",
            status: "Idle",
            usage: "0%",
          },
        ].map((model, i) => (
          <Card key={i} className="bg-slate-900/50 border-cyan-500/10">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-400">{model.type}</p>
                </div>
                <Badge
                  variant={model.status === "Active" ? "default" : "secondary"}
                  className={
                    model.status === "Active"
                      ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                      : "bg-slate-700 text-gray-400"
                  }
                >
                  {model.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Usage</span>
                  <span className="text-white font-medium">{model.usage}</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                    style={{ width: model.usage }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AnalyticsContent() {
  return (
    <Card className="bg-slate-900/50 border-cyan-500/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          Analytics Dashboard
        </CardTitle>
        <CardDescription>Track your AI usage and performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96 flex items-center justify-center border border-dashed border-cyan-500/20 rounded-lg">
          <div className="text-center space-y-4">
            <BarChart3 className="w-16 h-16 mx-auto text-cyan-400" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Analytics Coming Soon
              </h3>
              <p className="text-sm text-gray-400">
                Detailed insights and metrics will appear here
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function WorkflowsContent() {
  return (
    <Card className="bg-slate-900/50 border-purple-500/10">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          AI Workflows
        </CardTitle>
        <CardDescription>
          Automate tasks with AI-powered workflows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { name: "Content Generation Pipeline", runs: 142 },
            { name: "Image Processing Workflow", runs: 89 },
            { name: "Data Analysis Automation", runs: 56 },
          ].map((workflow, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-slate-800/30 border border-purple-500/10 hover:border-purple-500/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">{workflow.name}</h4>
                  <p className="text-sm text-gray-400">
                    {workflow.runs} runs this month
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "cyan" | "purple";
}) {
  const isPositive = change.startsWith("+");
  const colorClasses =
    color === "cyan"
      ? "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20"
      : "from-purple-500/20 to-purple-500/5 border-purple-500/20";
  const iconColor = color === "cyan" ? "text-cyan-400" : "text-purple-400";

  return (
    <Card className={`bg-gradient-to-br ${colorClasses} border`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
              color === "cyan"
                ? "from-cyan-500/30 to-cyan-500/10"
                : "from-purple-500/30 to-purple-500/10"
            } flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <Badge
            variant={isPositive ? "default" : "secondary"}
            className={
              isPositive
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-red-500/20 text-red-400 border-red-500/30"
            }
          >
            {change}
          </Badge>
        </div>
        <div>
          <p className="text-2xl font-bold text-white mb-1">{value}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
