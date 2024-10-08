import { createTRPCNuxtClient, httpBatchLink } from "trpc-nuxt/client";
import type { AppRouter } from "~~/server/trpc/routers";
import superjson from "superjson";
export default defineNuxtPlugin(() => {
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */
  const client = createTRPCNuxtClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});

export type client = ReturnType<typeof createTRPCNuxtClient<AppRouter>>;
