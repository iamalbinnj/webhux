import app from './src/app';
import config from './src/config/config';

const startServer = async () => {
  try {
    // Start the server
    app.listen(config.port, () => {
      console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
    });
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
};

startServer();