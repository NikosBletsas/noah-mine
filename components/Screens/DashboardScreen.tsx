import React, { useState, useEffect } from "react";
import {
  Search,
  Heart,
  Settings,
  Camera,
  User,
  FileText,
  RefreshCw,
  Monitor as DeviceMonitor,
  Activity,
  BriefcaseMedical,
  ClipboardPlus,
  HardDrive,
  ScanLine,
  Video,
  Pill,
  Brain,
} from "lucide-react";
import { BaseScreenProps, ThemeKey, DashboardTileProps } from "../../types";
import { SCREEN_NAMES } from "../../constants";
import { Api } from "../../src/generated_api";
import * as signalR from "@microsoft/signalr";



const DashboardTile: React.FC<DashboardTileProps> = ({
  icon,
  label,
  onClick,
  theme,
  isMidnightTheme,
}) => (
  <div
    onClick={onClick}
    className={`${theme.card} backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg border border-white/20 flex flex-col items-center justify-center aspect-square`}
  >
    {icon}
    <h3
      className={`font-semibold mt-2 text-xs sm:text-sm md:text-base lg:text-lg ${theme.textPrimary}`}
    >
      {label}
    </h3>
  </div>
);

const DashboardScreen: React.FC<BaseScreenProps> = ({
  theme,
  setCurrentScreen,
  isMidnightTheme,
  currentThemeKey,
  onThemeChange,
}) => {
  //hold the current time
  const [currentTime, setCurrentTime] = useState("");
  const [batteryStatus, setBatteryStatus] = useState<string | null>("N/A");
  const [heartbeat, setHeartbeat] = useState<any>(null);
  const [hubConnectionStatus, setHubConnectionStatus] =
    useState("Disconnected");
  const [connectionStatus, setConnectionStatus] = useState("Checking...");
  const [patientId, setPatientId] = useState("N/A");
  const [caseNumber, setCaseNumber] = useState("N/A");
  const [videoStatus, setVideoStatus] = useState("N/A");

  //update the time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const iconSize = "w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-16 lg:h-16";
  const tiles = [
    {
      icon: <Search className={`${iconSize} mx-auto ${theme.icon}`} />,
      label: "Search Patient",
      screen: SCREEN_NAMES.PATIENT_SEARCH,
    },
    {
      icon: <Heart className={`${iconSize} mx-auto text-red-500`} />,
      label: "Medical Measurements",
      screen: SCREEN_NAMES.MEASUREMENTS,
    },
    {
      icon: (
        <BriefcaseMedical className={`${iconSize} mx-auto text-pink-600`} />
      ),
      label: "Assign Emergency",
      screen: SCREEN_NAMES.ASSIGN_EMERGENCY,
    },
    {
      icon: <HardDrive className={`${iconSize} mx-auto text-yellow-600`} />,
      label: "Device Setup",
      screen: SCREEN_NAMES.DEVICE_CONFIGURATION,
    },
    {
      icon: <ScanLine className={`${iconSize} mx-auto text-sky-600`} />,
      label: "Scan Documents",
      screen: undefined /* TODO */,
    },
    {
      icon: <Camera className={`${iconSize} mx-auto text-orange-600`} />,
      label: "Video Conference",
      screen: undefined /* TODO */,
    },
    {
      icon: <Video className={`${iconSize} mx-auto text-blue-500`} />,
      label: "Webex Call",
      screen: undefined /* TODO */,
    },
    {
      icon: <Pill className={`${iconSize} mx-auto text-rose-500`} />,
      label: "Drugs Inventory",
      screen: undefined /* TODO */,
    },
    {
      icon: <User className={`${iconSize} mx-auto text-indigo-600`} />,
      label: "Send Data to Doctor",
      screen: undefined /* TODO */,
    },
    {
      icon: <FileText className={`${iconSize} mx-auto text-teal-600`} />,
      label: "Case Consultations",
      screen: SCREEN_NAMES.CASE_CONSULTATIONS , 
    },
    {
      icon: <Brain className={`${iconSize} mx-auto text-red-600`} />,
      label: "Artificial Intelligence",
      screen: undefined /* TODO */,
    },
    {
      icon: <Settings className={`${iconSize} mx-auto text-gray-600`} />,
      label: "System Operations",
      screen: SCREEN_NAMES.SYSTEM_OPERATIONS,
    },
  ];

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const api = new Api();

        console.log("Dashboard: Calling mainInitList...");
        try {
          const mainInitListResult = await api.api.mainInitList();
          console.log(
            "Dashboard: mainInitList completed successfully",
            mainInitListResult
          );
        } catch (error) {
          console.error("Error initializing dashboard:", error);
        }
      } catch (error) {
        console.error("Error creating API instance:", error);
      }
    };

    const fetchBatteryStatus = async () => {
      try {
        const api = new Api();
        console.log("Dashboard: Calling mainGetBatteryStatusList...");
        const batteryStatusData = await api.api.mainGetBatteryStatusList();
        console.log("Dashboard: Battery status data:", batteryStatusData);
        let batteryStatus = "N/A";
        if (batteryStatusData?.data != null) {
          console.log("Dashboard: Battery status data:", batteryStatusData);
          console.log(
            "Dashboard: Entire batteryStatusData object:",
            batteryStatusData
          );
          console.log(
            "Dashboard: Type of batteryStatusData:",
            typeof batteryStatusData
          );
          console.log(
            "Dashboard: batteryStatusData.batteryPercentage:",
            (batteryStatusData as any)?.batteryPercentage
          );
          batteryStatus =
            batteryStatusData &&
            (batteryStatusData as any)?.batteryPercentage !== null &&
            (batteryStatusData as any)?.batteryPercentage !== undefined
              ? `${(batteryStatusData as any).batteryPercentage}%`
              : "N/A";
        } else {
          console.warn("Battery status data is null or undefined");
        }
        setBatteryStatus(batteryStatus);
      } catch (error) {
        console.error("Error fetching battery status:", error);
        setBatteryStatus("Error");
      }
    };

    initializeDashboard();
    fetchBatteryStatus();

    let hubConnection: signalR.HubConnection | null = null;

    try {
      const hubUrl = new URL("/notificationhub", window.location.origin);
      hubUrl.protocol = "https";

      hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl.toString(), {
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.LongPolling,
          logMessageContent: true,
        })
        .configureLogging(signalR.LogLevel.Debug)
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .build();

      hubConnection.on("BatteryStatus", (data) => {
        console.log("Battery Status from SignalR:", data);
        setBatteryStatus(data !== null ? `${data}%` : "N/A");
      });

      hubConnection.on("HeartBeat", (data) => {
        console.log("Heartbeat from SignalR:", data);
        setHeartbeat(data);
      });

      hubConnection
        .start()
        .then(() => {
          console.log("SignalR Connected!");
          setHubConnectionStatus("Connected");
        })
        .catch((err) => {
          console.error("Error starting connection: ", err);
          setHubConnectionStatus("Error");
        });
    } catch (error) {
      console.error("Error starting SignalR connection:", error);
    }

    return () => {
      hubConnection?.stop();
    };
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.background} relative flex flex-col pb-16 sm:pb-20 md:pb-24 lg:pb-28 xl:pb-32`}
    >
      <div
        className={`${theme.card} backdrop-blur-lg border-b border-white/20 p-3 sm:p-4 md:p-5 lg:p-6 z-10`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="w-40 h-24 sm:w-44 sm:h-26 md:w-48 md:h-28 flex items-center justify-center">
            <img
              src={
                currentThemeKey === "black"
                  ? "/assets/NoA.H. Logo Horizontal white.svg"
                  : "/assets/NoA.H. Logo Horizontal blue-black.svg"
              }
              alt="NOAH Logo"
              className="w-full h-full object-contain max-w-40 max-h-24 sm:max-w-44 sm:max-h-26 md:max-w-48 md:h-28"
            />
          </div>
          <div
            className={`text-xs sm:text-sm md:text-base lg:text-lg ${theme.textPrimary} font-semibold text-center flex-1 pr-16 sm:pr-20 md:pr-16`}
          >
            Telemedicine EMR System
          </div>
        </div>
      </div>

      <div
        className={`bg-gradient-to-r ${theme.accent} ${theme.textOnAccent} p-3 sm:p-4 md:p-5 lg:p-6`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3">
            Status Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-2 text-xs sm:text-sm md:text-base lg:text-lg">
            <div className="flex justify-between">
              <span>Patient ID</span>
              <span>N/A</span>
            </div>
            <div className="flex justify-between">
              <span>System time</span>
              <span id="current-time">{currentTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Connection Status</span>
              <span
                className={
                  connectionStatus === "● Online"
                    ? "text-green-400"
                    : connectionStatus === "● Offline"
                    ? "text-yellow-400"
                    : "text-red-400"
                }
              >
                {connectionStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Hub Status</span>
              <span
                className={
                  hubConnectionStatus === "Connected"
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {hubConnectionStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Video</span>
              <span>N/A</span>
            </div>
            <div className="flex justify-between">
              <span>Case No</span>
              <span>1</span>
            </div>
            <div className="flex justify-between">
              <span>Battery Status</span>
              <span>{batteryStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Heartbeat</span>
              <span>{heartbeat || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex-grow overflow-y-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-7">
          {tiles.map((tile) => (
            <DashboardTile
              key={tile.label}
              icon={tile.icon}
              label={tile.label}
              onClick={
                tile.screen ? () => setCurrentScreen(tile.screen) : undefined
              }
              theme={theme}
              isMidnightTheme={isMidnightTheme}
            />
          ))}
        </div>
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r ${
          theme.accent
        } p-2 sm:p-3 md:p-4 lg:p-5 z-10 border-t ${
          isMidnightTheme || currentThemeKey === "black"
            ? "border-gray-600"
            : "border-white/10"
        }`}
      >
        <div className="flex justify-around max-w-2xl mx-auto">
          <button
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">Save</span>
          </button>
          <button
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <RefreshCw className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">
              Restart
            </span>
          </button>
          <button
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <DeviceMonitor className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">
              Devices
            </span>
          </button>
          <button
            onClick={() => setCurrentScreen(SCREEN_NAMES.SETTINGS)}
            className={`flex flex-col items-center ${theme.textOnAccent} hover:opacity-80 transition-opacity px-1 py-1 sm:px-2 md:px-3`}
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mb-0.5" />
            <span className="text-xs md:text-sm lg:text-base block">
              Advanced
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
