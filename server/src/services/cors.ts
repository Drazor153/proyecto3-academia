// Allow a certain domains to access the API
import { RequestHandler } from 'express';

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://10.242.212.120:5173'
];

export const corsMiddleware: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin as string;
  console.log(req.headers);
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
