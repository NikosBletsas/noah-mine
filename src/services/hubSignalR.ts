import * as signalR from "@microsoft/signalr";

// CRITICAL: Real-time Medical Data Communication Hub

// Define callback interface for type safety
interface SignalRCallbacks {
  onBatteryStatus: (data: any) => void;    // Real-time battery updates
  onHeartBeat: (data: any) => void;        // Patient heartbeat monitoring
  onConnectionChange: (status: string) => void; // Connection health status
}

/**
 * Sets up SignalR hub connection with medical backend
 * @param callbacks - Event handlers for different data types
 * @returns SignalR connection instance for cleanup
 */
export const setupSignalRConnection = (callbacks: SignalRCallbacks) => {
  console.log("SignalR: Initializing real-time medical data connection...");
  
  // Build secure connection URL
  const hubUrl = new URL("/notificationhub", window.location.origin);
  
  // SECURITY: Force HTTPS for medical data transmission
  hubUrl.protocol = "https";
  
  console.log(`SignalR: Connecting to secure hub at ${hubUrl.toString()}`);
  
  // Configure SignalR connection with medical-grade reliability
  const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl.toString(), {
      // PRIMARY: Use WebSockets for lowest latency 
      // FALLBACK: Use LongPolling if WebSockets fail (network compatibility)
      transport: signalR.HttpTransportType.WebSockets | 
                 signalR.HttpTransportType.LongPolling,
      
      logMessageContent: true,
    })
    
    //Enable debug logging for troubleshooting medical devices
    .configureLogging(signalR.LogLevel.Debug)
    
    // RELIABILITY: Auto-reconnect with progressive delays
    // Medical devices must maintain connection for patient safety
    // Retry at: 0ms (immediate), 2s, 10s, 30s intervals
    .withAutomaticReconnect([0, 2000, 10000, 30000])
    .build();

  //Set up real-time event handlers
  
  // Battery Status Updates 
  hubConnection.on("BatteryStatus", (data) => {
    console.log("SignalR: Real-time battery update received", data);
    callbacks.onBatteryStatus(data);
  });

  // HeartBeat Monitoring - Patient vital signs tracking
  hubConnection.on("HeartBeat", (data) => {
    console.log("SignalR: Patient heartbeat data received", data);
    callbacks.onHeartBeat(data);
  });
  
  // Start the connection with comprehensive error handling
  hubConnection.start()
    .then(() => {
      console.log("SignalR: Real-time medical data connection established!");
      console.log("SignalR: Now receiving live patient data and device status");
      
      // Notify UI that real-time data is flowing
      callbacks.onConnectionChange("Connected");
    })
    .catch((err) => {
      console.error("CRITICAL: SignalR connection failed", err);
      console.error("Medical data streaming is offline - manual refresh required");
      
      // Notify UI of connection failure for user action
      callbacks.onConnectionChange("Error");
    });
  return hubConnection;
};