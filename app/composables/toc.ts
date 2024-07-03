export default async function useToc() {
  const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation(queryContent("stak")));
  let contentNav = mapContentNavigation(navigation.value);
  contentNav = contentNav[0].children;

  return contentNav;
}
