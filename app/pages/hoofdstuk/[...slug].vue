<script setup lang="ts">

import { withoutTrailingSlash } from 'ufo'
definePageMeta({
  layout: 'chapters'
})
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryContent(route.path).findOne())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}


const { data: surround } = await useAsyncData(`${route.path}-surround`, () => queryContent('hoofdstuk')
  .where({ _extension: 'md', navigation: { $ne: false } })
  .only(['title', 'description', '_path'])
  .findSurround(withoutTrailingSlash(route.path))
)

const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :links="page.links" :headline="headline" />

    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />

      <hr v-if="surround?.length">

      <UContentSurround :surround="surround" />
    </UPageBody>

    <!-- <template #right>
      <UContentToc :title="toc?.title">
        adf
      </UContentToc>
    </template> -->
  </UPage>
</template>