import { router } from "../trpc";
import { signUpRouter } from "./signUpRouter";

export const appRouter = router({
  signUp: signUpRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
