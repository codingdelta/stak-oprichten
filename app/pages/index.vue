<script setup lang="ts">
const { data: page } = await useAsyncData("index", () => queryContent("/").findOne());
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

useSeoMeta({
  titleTemplate: "",
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
});
</script>

<template>
  <div v-if="page">
    <ULandingHero
      :title="page.hero.title"
      :description="page.hero.description"
      :links="page.hero.links"
      orientation="horizontal"
    >
      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon
            v-if="page.hero.headline.icon"
            :name="page.hero.headline.icon"
            class="pointer-events-none ml-1 h-4 w-4"
          />
        </UBadge>
      </template>
      <div class="flex justify-center">
        <div class="w-2/3">
          <NuxtImg
            src="/images/hero.png"
            quality="20"
            alt="Vrolijke mensen die een STAK (stichting administratiekantoor) oprichten"
          />
        </div>
      </div>
    </ULandingHero>
    <ULandingLogos id="clients" :title="page.hero.logos.title">
      <div class="mx-auto">
        <div class="grid grid-cols-2 place-items-center gap-10 md:grid-cols-4">
          <NuxtLink
            v-for="client in page.hero.logos.clients"
            :key="client.url"
            :to="client.url"
            :rel="client.rel"
            target="_blank"
          >
            <NuxtImg
              :src="`/images/clients/${client.image}`"
              class="h-10 flex-shrink-0 text-gray-900 dark:text-white"
            />
          </NuxtLink>
        </div>
      </div>
    </ULandingLogos>

    <ULandingSection
      v-for="(section, index) in page.sections"
      :key="index"
      :title="section.title"
      :description="section.description"
      :align="section.align"
      :links="section.links"
      :features="section.features"
    >
      <NuxtImg v-if="section.image?.src" v-bind="section.image" />
    </ULandingSection>

    <!-- <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" />
      </UPageGrid>
    </ULandingSection> -->

    <!-- <ULandingSection :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
      <UPageColumns class="xl:columns-4">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" class="bg-gray-100/50 dark:bg-gray-800/50" />
        </div>
      </UPageColumns>
    </ULandingSection> -->

    <ULandingSection>
      <ULandingCTA v-bind="page.cta" class="bg-gray-100/50 dark:bg-gray-800/50" />
    </ULandingSection>
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
