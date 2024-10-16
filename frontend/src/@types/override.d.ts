declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_BACKEND_ENDPOINT: string;
    }
  }
}

export {};
