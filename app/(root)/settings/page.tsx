// import Image from "next/image";
// import { auth } from "@/app/auth";
// import SignOutButton from "../../components/SignOutButton";
// import SignInButton from "../../components/SignInButton";

// export default async function Home() {
//   const session = await auth();

//   if (session) {
//     const profilePic = session.user?.image;

//     return (
//       <div>
//         <p className="my-2">
//           Do DSA, <span className="text-xl">{session.user?.name}</span>
//         </p>
//         <p>Details:</p>
//         <div className="mx-5 my-2">
//           <p>ID: {session.user?.id}</p>
//           <p>Email: {session.user?.email}</p>
//           {profilePic && (
//             <Image
//               layout="fixed"
//               width={100}
//               height={100}
//               alt="profile pic"
//               src={profilePic}
//             />
//           )}
//         </div>
//         <SignOutButton />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <p>Not signed in</p>
//       <SignInButton />
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
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
    <div
      className={`min-h-screen py-10 px-6 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Settings
      </motion.h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <SettingSwitch
          darkMode={darkMode}
          label="Dark Mode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Enable Notifications"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Receive Email Updates"
          checked={emailUpdates}
          onCheckedChange={setEmailUpdates}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Account Privacy"
          checked={accountPrivacy}
          onCheckedChange={setAccountPrivacy}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Two-Factor Authentication"
          checked={twoFactorAuth}
          onCheckedChange={setTwoFactorAuth}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Enable Auto Updates"
          checked={autoUpdates}
          onCheckedChange={setAutoUpdates}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Data Saver Mode"
          checked={dataSaver}
          onCheckedChange={setDataSaver}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Location Tracking"
          checked={locationTracking}
          onCheckedChange={setLocationTracking}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Sound Effects"
          checked={soundEffects}
          onCheckedChange={setSoundEffects}
        />
        <SettingSwitch
          darkMode={darkMode}
          label="Share Analytics Data"
          checked={analyticsSharing}
          onCheckedChange={setAnalyticsSharing}
        />
      </div>
    </div>
  );
}

function SettingSwitch({
  darkMode,
  label,
  checked,
  onCheckedChange,
}: {
  darkMode: boolean;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <motion.div
      className={`flex items-center justify-between p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } rounded-lg shadow-md transition-all duration-300 hover:scale-105`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg font-medium">{label}</p>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </motion.div>
  );
}

function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
        checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <motion.div
        className="w-5 h-5 bg-white rounded-full shadow-md"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      ></motion.div>
    </button>
  );
}
