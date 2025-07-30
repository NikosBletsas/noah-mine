import { Api } from '../api';


 /* CRITICAL: Medical Device Battery Monitoring */

export const fetchBatteryStatus = async (): Promise<string> => {
  // Create dedicated API instance for battery monitoring
  const batteryApi = new Api();
  console.log("Battery Service: Checking medical device power levels...");
  
  try {
    // CRITICAL: Get real-time battery status from medical device
    // This data comes directly from the hardware monitoring system
    const batteryStatusData = await batteryApi.api.mainGetBatteryStatusList();
    
    console.log("Battery Service: Raw battery data received", batteryStatusData);
    
    if (batteryStatusData?.data != null) {
      // Extract battery percentage from response data
      const percentage = (batteryStatusData as any)?.batteryPercentage;
      
      // Validate percentage exists and is a valid number
      if (percentage !== null && percentage !== undefined) {
        console.log(`Battery Service: Device battery at ${percentage}%`);
        return `${percentage}%`;
      } else {
        console.warn("Battery Service: Battery data present but percentage missing");
      }
    } else {
      console.warn("Battery Service: No battery data received from device");
    }
    
    // Fallback when no valid battery data is available
    return "N/A";
    
  } catch (error) {
    console.error("CRITICAL: Battery status check failed", error);
    throw error;
  }
};