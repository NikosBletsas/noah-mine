// services/initializeDashboard.ts
import { Api } from '../api';

/**
 * CRITICAL: Dashboard Initialization Service
 * 
 * This service initializes the medical dashboard by:
 * - Setting up user session
 * - Loading configuration settings
 * - Preparing medical device connections
 * - Establishing baseline system state
 * 
 * Must be called FIRST before any other operations!
 */
export const initializeDashboard = async () => {
  // Create API instance for backend communication
  const dashboardApi = new Api();
  console.log("🔧 Dashboard: Starting system initialization...");
  
  try {
    // CRITICAL: This call sets up the entire medical system session
    // - Authenticates device with backend
    // - Loads medical protocols and configurations  
    // - Initializes database connections
    // - Sets up logging and audit trails
    const result = await dashboardApi.api.mainInitList();
    
    console.log("✅ Dashboard: System initialization completed successfully", result);
    
    // Return result for potential error handling or additional processing
    return result;
  } catch (error) {
    console.error("❌ CRITICAL ERROR: Dashboard initialization failed", error);
    // Re-throw to let calling code handle the failure appropriately
    throw error;
  }
};