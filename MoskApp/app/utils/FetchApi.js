import axios from 'axios';

export async function fetchData(retries = 3) {
  let attempts = 0;

  while (attempts < retries) {
    try {
      const response = await axios.get('https://stud.hosted.hr.nl/1002893/database.json');
      return response.data;
    } catch (error) {
      attempts += 1;
      console.error(`Error fetching the data (Attempt ${attempts}):`, error);
      if (attempts >= retries) {
        throw new Error('Max retries reached');
      }
      await new Promise(res => setTimeout(res, 1000)); // wait 1 second before retrying
    }
  }
}
