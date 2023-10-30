import express from 'express';
import { loadConfigFromCloud, getPort } from './utils/port-loader';
import { initializeDatabase} from './components/db/db-connection';
import default_routes from './components/api/default';


async function initializeApp() {
  const app = express();
  const cors = require('cors');
  app.use(express.json());
  app.use(cors());

  // initialize DB
  initializeDatabase();
  // initialize Configs
  await loadConfigFromCloud()

  // mount APIs
  app.use(default_routes);

  // Start the Express server
  app.listen(getPort(), () => {
    console.log(`Server is running at http://localhost:${getPort()}/`);
  });

  return app;
}

// Start the application
initializeApp();
export default initializeApp;