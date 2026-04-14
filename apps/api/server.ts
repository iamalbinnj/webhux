import app from './src/app.js';
import { initializeDatabase } from './src/config/database.js';
import config from './src/config/config.js';

const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start the server
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.log('Failed to start server:', error)
    process.exit(1);
  }
};

startServer();