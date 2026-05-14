require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger');

const studentRouter = require('../routes/studentAuthRoutes');
const ownerRouter = require('../routes/ownerAuthRoutes');
const adminRouter = require('../routes/adminRoutes');
const residenceRouter = require('../routes/residenceRoutes');
const ratingRouter = require('../routes/ratingRoutes');
const wishListRouter = require('../routes/wishListRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Core middleware ────────────────────────────────────────────────────────
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['http://localhost:5173'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ─── API documentation ──────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Routes ─────────────────────────────────────────────────────────────────
app.use('/student', studentRouter);
app.use('/owner', ownerRouter);
app.use('/admin', adminRouter);
app.use('/residence', residenceRouter);
app.use('/residence/:residenceId/Ratings', ratingRouter);
app.use('/residence/:residenceId/wishlist', wishListRouter);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'UniStay API is running',
    docs: 'http://localhost:3000/api-docs',
  });
});

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global error handler ────────────────────────────────────────────────────
// Must have 4 parameters so Express recognises it as an error handler.
// We never expose the raw error or stack trace to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`UniStay API running on http://localhost:${PORT}`);
  console.log(`Swagger docs at  http://localhost:${PORT}/api-docs`);
});
