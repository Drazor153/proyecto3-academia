import { ConfigProps } from 'src/interfaces/config.interface';

export const config = (): ConfigProps => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  database_url: process.env.DATABASE_URL,
});
