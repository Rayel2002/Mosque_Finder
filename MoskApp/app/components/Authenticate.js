import { hasHardwareAsync, supportedAuthenticationTypesAsync, authenticateAsync, AuthenticationType } from "expo-local-authentication";
import { Alert } from "react-native";

// This function authenticates the user using available biometric methods.
// It first checks if the device has the necessary hardware and supported authentication types.
// If neither is available, it alerts the user and returns false.
// It then attempts to authenticate the user up to 3 times using facial recognition if available,
// or other available methods if not. On each failed attempt, it alerts the user and continues.
// If all attempts fail, it alerts the user that the maximum attempts have been reached and returns false.
// If any attempt succeeds, it returns true.
export const authenticateUser = async () => {
  try {
    // Check if the device has the necessary hardware for biometric authentication
    const hasHardware = await hasHardwareAsync();
    // Check what types of biometric authentication are supported
    const supported = await supportedAuthenticationTypesAsync();

    // If no hardware or no supported types, alert the user and return false
    if (!hasHardware || supported.length === 0) {
      Alert.alert("Authentication error", "No supported authentication methods available.");
      return false;
    }

    // Attempt authentication up to 3 times
    for (let attempt = 1; attempt <= 3; attempt++) {
      let authResult;
      // Use facial recognition if supported, otherwise use other available methods
      if (supported.includes(AuthenticationType.FACIAL_RECOGNITION)) {
        authResult = await authenticateAsync({
          promptMessage: "Authenticate with Face ID",
          fallbackLabel: "Use Passcode",
          cancelLabel: "Cancel",
        });
      } else {
        authResult = await authenticateAsync();
      }

      // If authentication is successful, return true
      if (authResult.success) {
        return true;
      } else {
        // If authentication fails, alert the user and indicate the attempt number
        Alert.alert("Authentication failed", `Attempt ${attempt} of 3 failed. Please try again.`);
        // If the last attempt also fails, alert the user and return false
        if (attempt === 3) {
          Alert.alert("Authentication error", "Maximum attempts reached. Please try again later.");
          return false;
        }
      }
    }
  } catch (error) {
    // If an error occurs, alert the user with the error message and return false
    Alert.alert("Authentication error", error.message);
    return false;
  }
};
