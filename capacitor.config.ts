import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wevo.app",
  appName: "WEVO",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
