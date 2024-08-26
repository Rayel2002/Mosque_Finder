import axios from 'axios';

// Asynchrone functie om data op te halen, met optioneel aantal retries
export async function fetchData(retries = 3) {
  // Herhaal poging om data op te halen tot het aantal opgegeven retries
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Probeer data op te halen van de opgegeven URL
      const response = await axios.get('https://stud.hosted.hr.nl/1002893/database.json');
      // Retourneer de ontvangen data als de request succesvol is
      return response.data;
    } catch (error) {
      // Als de poging niet de laatste is, wacht 1 seconde voor een nieuwe poging
      if (attempt < retries - 1) {
        await new Promise(res => setTimeout(res, 1000));
      } else {
        // Als het maximale aantal retries is bereikt, gooi een fout
        throw new Error('Maximale aantal pogingen bereikt');
      }
    }
  }
}
