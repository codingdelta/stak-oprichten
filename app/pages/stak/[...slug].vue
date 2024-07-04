<script setup lang="ts">
import { withoutTrailingSlash } from "ufo";
import useToc from "~/composables/toc";
definePageMeta({
  layout: "chapters",
});
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne());
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
  queryContent("stak")
    .where({ _extension: "md", navigation: { $ne: false } })
    .only(["title", "description", "_path"])
    .findSurround(withoutTrailingSlash(route.path)),
);

const headline = computed(() => findPageHeadline(page.value));
const contentNav = await useToc();
useServerSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: page.value.title,
  ogDescription: page.value.description,
});

defineOgImage({
  component: "Stak",
  props: {
    title: page.value.title,
    description: page.value.description,
  },
});

useJsonld({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: page.value.title,
  description: page.value.description,
  url: page.value._url,
  datePublished: page.value.date,
  dateModified: page.value.sitemap.lastmod || page.value.date,
  author: {
    "@type": "Organization",
    name: "StakOprichten.nl",
    url: "https://stakoprichten.nl",
  },
});

const accordionItem = [
  {
    label: "Alle hoofdstukken",
    icon: "i-heroicons-information-circle",
    defaultOpen: false,
    slot: "chapters",
  },
];
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :links="page.links" :headline="headline" />

    <UAccordion :items="accordionItem" class="lg:hidden">
      <template #chapters>
        <UNavigationTree :links="contentNav" />
      </template>
    </UAccordion>
    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />

      <hr v-if="surround?.length" />

      <UContentSurround :surround="surround" />
    </UPageBody>

    <!-- <template #right>
      <UContentToc :title="toc?.title">
        adf
      </UContentToc>
    </template> -->
  </UPage>
</template>
