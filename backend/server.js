import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import pdfRoute from './routes/pdfRoute.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api/pdf", pdfRoute);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://ahsan:123@mern-learn.6ktc17a.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
