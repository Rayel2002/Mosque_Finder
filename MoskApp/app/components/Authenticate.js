import { hasHardwareAsync, supportedAuthenticationTypesAsync, authenticateAsync, AuthenticationType } from "expo-local-authentication";
import { Alert } from "react-native";

export const authenticateUser = async () => {
  try {
    const hasHardware = await hasHardwareAsync();
    const supported = await supportedAuthenticationTypesAsync();

    if (hasHardware && supported.includes(AuthenticationType.FACIAL_RECOGNITION)) {
      const authResult = await authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Use Passcode",
        cancelLabel: "Cancel",
      });

      if (!authResult.success) {
        Alert.alert("Authentication failed", "Please try again");
        return false;
      }
      return true;
    } else if (hasHardware && supported.length > 0) {
      const authResult = await authenticateAsync();

      if (!authResult.success) {
        Alert.alert("Authentication failed", "Please try again");
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    Alert.alert("Authentication error", error.message);
    return false;
  }
};
