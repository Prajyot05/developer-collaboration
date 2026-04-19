"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useThemeStore from "@/app/store/useThemeStore";
import { Settings } from "lucide-react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
        checked ? "bg-brand-500 justify-end" : "bg-theme-tertiary justify-start"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <motion.div
        className="w-4 h-4 bg-white rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

function SettingSwitch({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <motion.div
      className="flex items-center justify-between p-4 glass-card"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <p className="text-sm font-medium text-theme-primary">{label}</p>
        {description && (
          <p className="text-xs text-theme-tertiary mt-0.5">{description}</p>
        )}
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </motion.div>
  );
}

export default function SettingsPage() {
  const { isDark, toggleTheme } = useThemeStore();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [accountPrivacy, setAccountPrivacy] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [locationTracking, setLocationTracking] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [analyticsSharing, setAnalyticsSharing] = useState(true);

  return (
    <div className="min-h-screen py-8 px-6 md:px-12 lg:px-16 bg-theme-primary">
      <motion.div
        className="flex items-center gap-3 mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Settings size={28} className="text-theme-secondary" />
        <h1 className="text-3xl font-bold text-theme-primary">Settings</h1>
      </motion.div>

      <div className="max-w-2xl space-y-3">
        <SettingSwitch label="Dark Mode" description="Toggle dark/light theme" checked={isDark} onCheckedChange={toggleTheme} />
        <SettingSwitch label="Enable Notifications" description="Receive push notifications" checked={notifications} onCheckedChange={setNotifications} />
        <SettingSwitch label="Receive Email Updates" description="Get project updates via email" checked={emailUpdates} onCheckedChange={setEmailUpdates} />
        <SettingSwitch label="Account Privacy" description="Make profile private" checked={accountPrivacy} onCheckedChange={setAccountPrivacy} />
        <SettingSwitch label="Two-Factor Authentication" description="Extra security for your account" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
        <SettingSwitch label="Enable Auto Updates" checked={autoUpdates} onCheckedChange={setAutoUpdates} />
        <SettingSwitch label="Data Saver Mode" checked={dataSaver} onCheckedChange={setDataSaver} />
        <SettingSwitch label="Location Tracking" checked={locationTracking} onCheckedChange={setLocationTracking} />
        <SettingSwitch label="Sound Effects" checked={soundEffects} onCheckedChange={setSoundEffects} />
        <SettingSwitch label="Share Analytics Data" checked={analyticsSharing} onCheckedChange={setAnalyticsSharing} />
      </div>
    </div>
  );
}
