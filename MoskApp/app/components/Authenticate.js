import { hasHardwareAsync, supportedAuthenticationTypesAsync, authenticateAsync, AuthenticationType } from "expo-local-authentication";
import { Alert } from "react-native";

// Functie om gebruikersauthenticatie uit te voeren
export const authenticateUser = async () => {
  try {
    // Controleer of het apparaat de benodigde hardware heeft voor biometrische authenticatie
    const hasHardware = await hasHardwareAsync();
    // Controleer welke soorten biometrische authenticatie worden ondersteund
    const supported = await supportedAuthenticationTypesAsync();

    // Als er geen hardware is of geen ondersteunde methoden, informeer de gebruiker en geef false terug
    if (!hasHardware || supported.length === 0) {
      Alert.alert("Authenticatie fout", "Geen ondersteunde authenticatiemethoden beschikbaar.");
      return false;
    }

    // Probeer authenticatie tot 3 keer
    for (let attempt = 1; attempt <= 3; attempt++) {
      let authResult;
      // Gebruik gezichtsherkenning als dit ondersteund wordt, anders gebruik andere beschikbare methoden
      if (supported.includes(AuthenticationType.FACIAL_RECOGNITION)) {
        authResult = await authenticateAsync({
          promptMessage: "Authenticate with Face ID",  // Promptbericht voor gezichtsherkenning
          fallbackLabel: "Use Passcode",  // Alternatieve label voor passcode
          cancelLabel: "Cancel",  // Annuleer label
        });
      } else {
        authResult = await authenticateAsync();
      }

      // Als de authenticatie succesvol is, geef true terug
      if (authResult.success) {
        return true;
      } else {
        // Als de authenticatie mislukt, informeer de gebruiker en geef het aantal pogingen aan
        Alert.alert("Authenticatie mislukt", `Poging ${attempt} van 3 mislukt. Probeer het opnieuw.`);
        // Als de laatste poging ook mislukt, informeer de gebruiker en geef false terug
        if (attempt === 3) {
          Alert.alert("Authenticatie fout", "Maximale pogingen bereikt. Probeer het later opnieuw.");
          return false;
        }
      }
    }
  } catch (error) {
    // Als er een fout optreedt, informeer de gebruiker met het foutbericht en geef false terug
    Alert.alert("Authenticatie fout", error.message);
    return false;
  }
};
