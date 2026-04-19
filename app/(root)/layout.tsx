"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import SignInButton from "./components/SignInButton";
import { fetchUserData } from "../utils/userActions";
import useAuthStore from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import SignOutButton from "./components/SignOutButton";
import { Toaster } from "sonner";
import {
  Home,
  User,
  LayoutDashboard,
  Briefcase,
  HelpCircle,
  MessageSquare,
  FolderOpen,
  Trophy,
  MessageCircleQuestion,
  Settings,
  Sun,
  Moon,
  Plus,
  Menu,
  X,
  Bell,
} from "lucide-react";

import OnboardingModal from "./components/OnboardingModal";
import { User as UserType } from "@/app/types/user";

const sidebarLinks = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/profile", label: "Guild Card", icon: User },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/application", label: "Applications", icon: Briefcase },
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/feedback", label: "Feedback", icon: MessageSquare },
];

const navLinks = [
  { href: "/project", label: "Projects", icon: FolderOpen },
  // { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/qna", label: "QnA", icon: MessageCircleQuestion },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const { user, setUser } = useAuthStore();

  useEffect(() => {
    async function getUser() {
      try {
        const user = await fetchUserData();
        if (user) {
          setUser({
            id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            image: user.image,
            codingPlatforms: user.codingPlatforms,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            skills: user.skills,
            profilePic: user.profilePic,
            collegeDetails: user.collegeDetails || { name: user.instituteName },
            github: user.github,
            linkedin: user.linkedin,
            location: user.location,
            projectsCompleted: user.projectsCompleted,
            rank: user.rank,
            projectIds: user.projectIds,
          });

          // Check if onboarding is needed
          if (!user.firstName || !user.lastName || !user.collegeDetails?.name && !user.instituteName) {
            setShowOnboarding(true);
          } else {
            setShowOnboarding(false);
          }
        }
      } catch {
        // User not logged in
      }
    }
    getUser();
  }, [setUser]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const handleOnboardingComplete = (completedUser: UserType) => {
    setUser(completedUser);
    setShowOnboarding(false);
  };

  return (
    <>
      <Toaster
        richColors
        theme={isDark ? "dark" : "light"}
        toastOptions={{
          style: {
            background: isDark ? "#1a1f2e" : "#ffffff",
            border: isDark ? "1px solid #1e293b" : "1px solid #e5e7eb",
          },
        }}
      />

      {showOnboarding && user && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      {/* ===== SIDEBAR ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed z-50 h-full w-[17rem] bg-theme-sidebar border-r border-theme-primary px-4 py-6 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-theme-tertiary text-theme-secondary transition-colors lg:hidden"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="mb-8 ps-2">
          <Image
            src="/devlogo.png"
            alt="DEVELOPERS' GUILD LOGO"
            width={200}
            height={50}
          // className="dark:brightness-0 dark:invert dark:opacity-90"
          />
        </div>

        {/* Sidebar Nav Links */}
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${active
                  ? "bg-brand-500/10 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
                  : "text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${active
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-theme-tertiary group-hover:text-theme-secondary"
                    }`}
                />
                <span>{link.label}</span>
                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-theme-primary" />

        {/* Mobile-only: extra nav links */}
        <nav className="space-y-1 lg:hidden">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${active
                  ? "bg-brand-500/10 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
                  : "text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary"
                  }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  size={18}
                  className={`flex-shrink-0 transition-colors ${active
                    ? "text-brand-500 dark:text-brand-400"
                    : "text-theme-tertiary group-hover:text-theme-secondary"
                    }`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle at bottom */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-theme-secondary hover:bg-theme-tertiary hover:text-theme-primary transition-all duration-200"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1">
        {/* Header */}
        <header className="h-16 z-20 fixed w-full bg-theme-header backdrop-blur-md border-b border-theme-primary flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-secondary transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Logo (desktop) */}
            <Image
              src="/devlogo.png"
              alt="DEVELOPERS' GUILD LOGO"
              width={180}
              height={45}
              className="hidden sm:block"
            />

            {/* Desktop nav links */}
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${active
                      ? "text-brand-500 dark:text-brand-400 bg-brand-500/10 dark:bg-brand-500/15"
                      : "text-theme-secondary hover:text-theme-primary hover:bg-theme-tertiary"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Theme toggle (desktop) */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex p-2 rounded-lg hover:bg-theme-tertiary text-theme-secondary transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Create Project */}
            <button
              onClick={() => {
                router.push(`/project/create/${user?.id}`);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create Project</span>
            </button>

            {/* Notifications */}
            {user && (
              <Link
                href="/notification"
                className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-secondary transition-colors relative"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full" />
              </Link>
            )}

            {/* User */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="relative group">
                  <Image
                    src={user.profilePic || user.image || "/editProfileIcon.png"}
                    alt="User Profile"
                    width={36}
                    height={36}
                    className="rounded-full ring-2 ring-theme-primary group-hover:ring-brand-500/50 transition-all duration-200"
                  />
                </Link>
                <SignOutButton />
              </div>
            ) : (
              <SignInButton />
            )}
          </div>
        </header>

        <main className="pt-16 min-h-screen">{children}</main>
      </div>
    </>
  );
}
