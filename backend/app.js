require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const deploymentRoutes = require('./routes/deploymentRoutes');
const creditRoutes = require('./routes/creditRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const configRoutes = require('./routes/configRoutes');

// Middlewares
const { authMiddleware } = require('./middlewares/authMiddleware');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Apply authMiddleware to all ticket routes
app.use(authMiddleware);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/configs', configRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;