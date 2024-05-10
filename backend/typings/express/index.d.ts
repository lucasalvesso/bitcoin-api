export {};
declare global {
  namespace Express {
    interface Request {
      loggedUser: {
        email: string;
      };
    }
  }
}
