// API Configuration
// Each team member can update this file with their own API URL

interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Default configuration - update this for your local setup
const API_CONFIG: ApiConfig = {
  // Option 1: Use your local IP (current setup)
  baseUrl: 'http://192.168.68.169:5001',
  
  // Option 2: Use ngrok URL (when using ngrok)
  // baseUrl: 'https://your-ngrok-url.ngrok.io',
  
  // Option 3: Use localhost (if running on same machine)
  // baseUrl: 'http://localhost:5001',
  
  // Option 4: Use your teammate's IP
  // baseUrl: 'http://TEAMMATE_IP:5001',
  
  timeout: 10000 // 10 seconds
};

// Alternative configurations for different team members
export const API_CONFIGS = {
  // Main developer (you)
  developer1: 'http://192.168.68.146:5001',
  
  // Teammate configuration - update with her IP when she runs the server
  developer2: 'http://192.168.68.169:5001',
  
  // Ngrok URL (when using ngrok)
  ngrok: 'https://your-ngrok-url.ngrok.io',
  
  // Production URL (when deployed)
  production: 'https://your-production-api.com',
};

// Function to get current API URL
export const getApiUrl = (): string => {
  // You can change this to switch between different configurations
  // const currentConfig = 'developer1'; // Use developer1 config
  const currentConfig = 'developer2'; // Use developer2 config
  // const currentConfig = 'ngrok'; // Use ngrok config
  
  // For now, use the default baseUrl
  return API_CONFIG.baseUrl;
};

export default API_CONFIG; 