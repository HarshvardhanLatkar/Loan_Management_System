// server.js
// ----------------------------------------------------
// Starts the HTTP server, connects to the DB, and
// attaches socket.io (for notifications).
// ----------------------------------------------------

require('dotenv').config(); // load .env early

const http = require('http');
const app = require('./app');

// NOTE: models/index.js should export { sequelize, Sequelize, ...models }
// We'll try to require it; if it doesn't exist yet, server will still start.
let sequelize;
try {
  // If you follow the typical pattern, models/index.js exports `sequelize`
  // Example: module.exports = { sequelize, Sequelize, User, Loan, ... }
  const models = require('./models');
  sequelize = models.sequelize;
} catch (err) {
  console.warn('models/index.js not found or failed to load yet. DB connect skipped for now.');
}

// Notification socket initializer (created earlier)
// This file should export { initSocket, createAndNotify, ... }
let initSocket;
try {
  const notifService = require('./services/notificationService');
  initSocket = notifService.initSocket;
} catch (err) {
  console.warn('services/notificationService.js not found or failed to load yet. Socket init skipped for now.');
}

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    // 1) Connect to DB (if sequelize is available)
    if (sequelize) {
      // Authenticate connection
      await sequelize.authenticate();
      console.log(' Database connected');

      // DEV ONLY: sync models to DB automatically (creates tables)
      // Comment out or remove in production — use migrations instead.
      if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync({ alter: true });
        console.log('Sequelize models synced (alter: true)');
      }
    }

    // 2) Create HTTP server from Express app
    const server = http.createServer(app);

    // 3) Initialize socket.io for real-time notifications (if available)
    if (typeof initSocket === 'function') {
      initSocket(server);
      console.log('Socket.io initialized for notifications');
    } else {
      console.log('ℹSocket.io NOT initialized (initSocket missing)');
    }

    // 4) Start listening
    server.listen(PORT, () => {
      console.log(` Server listening on http://localhost:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
    });

    // Optional: handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down...');
      server.close(() => console.log('HTTP server closed'));
      if (sequelize) {
        await sequelize.close();
        console.log('DB connection closed');
      }
      process.exit(0);
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
