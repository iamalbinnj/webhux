const startServer = async () => {
  try {
    const [{ default: app }, { initializeDatabase }, { config }] =
      await Promise.all([
        import('./src/app.js'),
        import('@webhux/db'),
        import('@webhux/config'),
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
