const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');


dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust frontend URL
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
