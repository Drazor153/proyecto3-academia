import dotenv from 'dotenv';
dotenv.config();

const getEnvVariable = (name: string): string => {
  const variable = process.env[name];
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
  return variable;
};

export const access_token_secret = getEnvVariable('ACCESS_TOKEN_SECRET');
export const refresh_token_secret = getEnvVariable('REFRESH_TOKEN_SECRET');
export const port = getEnvVariable('PORT');
