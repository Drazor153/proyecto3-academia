import app from './app';
import dotenv from 'dotenv';
import { port } from './services/config';
dotenv.config();

const PORT = port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
