import axios from 'axios';

export async function fetchData() {
  try {
    const response = await axios.get('https://stud.hosted.hr.nl/1002893/database.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching the data:', error);
    throw error;
  }
}
