import axios from 'axios';

let config: any = null;
export async function loadConfigFromCloud() {
  try {
    const url = 'https://raw.githubusercontent.com/aakashkumar1980/apps-configs/main/SERVER-PORTS.json';
    const response = await axios.get(url);
    config = (response.data)[0];

    console.log("PORT: ", config.OAUTH2_APPLICATION.BACKEND_SERVER_PORT);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching config:', error.message);
    } else {
      // Handle or re-throw the error if it's not an instance of Error
      console.error('An unknown error occurred:', error);
    }
  }
}

export function getPort(): number {
  if (!config) {
    throw new Error("Config hasn't been loaded yet.");
  }
  return config.OAUTH2_APPLICATION.BACKEND_SERVER_PORT;
}

