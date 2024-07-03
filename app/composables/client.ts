import type { AppRouter } from "~/server/trpc/routers";
import type { client as clientType } from "~/plugins/clients";
// export const client: clientType = () => {
//   const { $client } = useNuxtApp();
//   return $client;
// };
export default function client(): clientType {
  const { $client } = useNuxtApp();
  return $client;
}
