import axios from 'axios';

export async function fetchData(retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await axios.get('https://stud.hosted.hr.nl/1002893/database.json');
      return response.data;
    } catch (error) {
      if (attempt < retries - 1) {
        await new Promise(res => setTimeout(res, 1000));
      } else {
        throw new Error('Max retries reached');
      }
    }
  }
}
