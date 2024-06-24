import { hasHardwareAsync, supportedAuthenticationTypesAsync, authenticateAsync, AuthenticationType } from "expo-local-authentication";
import { Alert } from "react-native";

export const authenticateUser = async () => {
  try {
    console.log("Checking for hardware...");
    const hasHardware = await hasHardwareAsync();
    console.log("Has hardware:", hasHardware);

    console.log("Checking for supported authentication types...");
    const supported = await supportedAuthenticationTypesAsync();
    console.log("Supported authentication types:", supported);

    if (hasHardware && supported.includes(AuthenticationType.FACIAL_RECOGNITION)) {
      console.log("Face ID supported. Starting authentication...");
      const authResult = await authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Use Passcode",
        cancelLabel: "Cancel",
      });
      console.log("Authentication result:", authResult);

      if (!authResult.success) {
        Alert.alert("Authentication failed", "Please try again");
        return false;
      }
      return true;
    } else if (hasHardware && supported.length > 0) {
      console.log("Other supported authentication types found. Starting authentication...");
      const authResult = await authenticateAsync();
      console.log("Authentication result:", authResult);

      if (!authResult.success) {
        Alert.alert("Authentication failed", "Please try again");
        return false;
      }
      return true;
    } else {
      console.log("No supported hardware or authentication types found.");
    }
    return false;
  } catch (error) {
    console.error("Authentication error:", error);
    Alert.alert("Authentication error", error.message);
    return false;
  }
};


