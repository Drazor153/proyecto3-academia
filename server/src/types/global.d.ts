declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      PORT: string;
      // add more environment variables and their types here
    }
  }
}

export {};
