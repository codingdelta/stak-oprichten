<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#111827" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "nl",
  },
});

useScript({
  src: "https://plausible.io/js/script.tagged-events.js",
  defer: true,
  "data-domain": useRuntimeConfig().plausibleDomain,
});

useSeoMeta({
  titleTemplate: "Snel en betrouwbaar een STAK oprichten",
  // ogImage: "https://saas-template.nuxt.dev/social-card.png",
  twitterImage: "https://saas-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
});

defineOgImage({
  component: "Stak",
  props: {
    title: "Stak Oprichten",
    description: "Wij helpen met het oprichten van een STAK voor je bedrijf en werknemers",
  },
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>
