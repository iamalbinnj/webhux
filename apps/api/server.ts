const startServer = async () => {
  try {
    const { config } = await import('@webhux/config');
    const [{ default: app }, { initializeDatabase }] = await Promise.all([
      import('./src/app.js'),
      import('@webhux/db'),
    ]);

    await initializeDatabase();

    app.listen(config.apiPort, () => {
      console.log(
        `Server running in ${config.nodeEnv} mode on port ${config.apiPort}`
      );
    });
  } catch (error) {
    console.error('Failed to start API:', error);
    process.exit(1);
  }
};

startServer();
