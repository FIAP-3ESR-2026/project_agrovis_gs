import { Platform } from "react-native";

const LOCALHOST_URL = "http://localhost:5234";

// Use esta URL quando estiver testando no celular físico.
// Troque pelo IPv4 da sua máquina, se necessário.
const DEVICE_URL = "http://SEU_IP_DO_PC:5234";

// Use esta URL se estiver testando no emulador Android.
const ANDROID_EMULATOR_URL = "http://10.0.2.2:5234";

export function getApiBaseUrl() {
  if (Platform.OS === "web") {
    return LOCALHOST_URL;
  }

  if (Platform.OS === "android") {
    return DEVICE_URL;
  }

  return DEVICE_URL;
}