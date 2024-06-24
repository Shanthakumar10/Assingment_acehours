import axios from 'axios';

const data = new FormData();
data.append('q', 'Hello, world!');
data.append('target', 'es');
data.append('source', 'en');

const options = {
  method: 'POST',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
  headers: {
    'x-rapidapi-key': '0469e50ebcmsh768ae042c8141eep15a8d2jsn35e8f56e4b50',
    'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
    'Accept-Encoding': 'application/gzip'
  },
  data: data
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}