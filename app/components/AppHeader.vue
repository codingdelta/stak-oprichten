<script setup lang="ts">
import type { NavItem } from "@nuxt/content";

const navigation = inject<Ref<NavItem[]>>("navigation", ref([]));

const links = [
  {
    label: "Hoofdstukken",
    to: "/stak",
  },
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Contact",
    to: "/contact",
  },
];
</script>

<template>
  <UHeader
    :links="links"
    :ui="{
      button: {
        base: 'lg:hidden',
        icon: {
          open: 'i-heroicons-bars-3-20-solid',
          close: 'i-heroicons-x-mark-20-solid',
        },
      },
    }"
  >
    <template #logo> StakOprichten.nl </template>

    <!-- <template #right>
    </template> -->

    <!-- <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template> -->
  </UHeader>
</template>
