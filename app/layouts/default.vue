<script setup lang="ts">
import type { ParsedContent } from "@nuxt/content";

const { data: navigation } = await useAsyncData("navigation", () => fetchContentNavigation(), { default: () => [] });
const { data: files } = useLazyFetch<ParsedContent[]>("/api/search.json", { default: () => [], server: false });

provide("navigation", navigation);
</script>

<template>
  <div>
    <AppHeader />

    <UMain>
      <div
        class="landing-grid absolute inset-0 z-[-1] mt-10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      />
      <slot />
    </UMain>

    <AppFooter />

    <ClientOnly>
      <LazyUContentSearch :files="files" :navigation="navigation" />
    </ClientOnly>
  </div>
</template>

<style scoped>
.landing-grid {
  background-size: 100px 100px;
  background-image: linear-gradient(to right, rgb(var(--color-gray-200)) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(var(--color-gray-200)) 1px, transparent 1px);
}

.dark {
  .landing-grid {
    background-image: linear-gradient(to right, rgb(var(--color-gray-800)) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(var(--color-gray-800)) 1px, transparent 1px);
  }
}
</style>
