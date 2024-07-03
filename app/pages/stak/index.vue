<script setup lang="ts">
definePageMeta({
  layout: "default",
});
const consultModalOpen = ref(false);
const popupOpen = ref(true);
const { data: chapters } = await useAsyncData("chapters", () => queryContent("stak").find());
</script>

<template>
  <section class="mb-20 mt-20 flex justify-center">
    <div class="flex max-w-7xl">
      <div class="flex flex-col items-center">
        <div class="flex w-2/3 flex-col gap-10">
          <div class="flex flex-col gap-3 text-center">
            <h1 class="text-3xl">Alle informatie over het Stichting Administratiekantoor (STAK)</h1>
            <p class="">
              Werknemers binden aan je bedrijf kan op vele manieren. In de onderstaande hoofdstukken gaan we verder in
              op alles wat je moet weten rondom een Stichting Administratiekantoor (STAK).
            </p>
          </div>

          <div class="mx-auto">
            <div class="grid grid-cols-1 gap-5">
              <NuxtLink
                v-for="(chapter, index) in chapters"
                :key="chapter._id"
                :to="chapter._path"
                class="rounded-lg border bg-slate-50 p-5"
              >
                <span class="font-bold">Hoofdstuk {{ index + 1 }}</span>
                <div class="flex items-center justify-between">
                  <div class="w-2/3">
                    <h2 class="text-3xl">{{ chapter.title }}</h2>
                    <p>{{ chapter.description }}</p>
                  </div>
                  <div v-if="chapter.image" class="w-1/3">
                    <NuxtImg :src="chapter.image.src" :alt="chapter.image.alt" />
                  </div>
                </div>
                <UButton>Lees</UButton>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="justify-center">
        <div class="top-52 hidden w-96 flex-col gap-3 rounded-xl bg-slate-50 p-5 lg:sticky lg:flex">
          <CtaConsult />
        </div>
        <div v-if="popupOpen">
          <div class="fixed bottom-5 right-5 flex rounded-lg bg-slate-100 p-5 lg:hidden">
            <div>
              <h2 class="text-2xl">Stak oprichten?</h2>
              <p>Meld je aan voor een gratis consult.</p>
              <UButton @click="consultModalOpen = true">Consult aanvragen</UButton>
            </div>
            <div v-if="popupOpen" class="cursor-pointer" @click="popupOpen = false">
              <UIcon name="i-heroicons-x-mark" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <UModal v-model="consultModalOpen">
      <div class="p-5"><CtaConsult /></div>
    </UModal>
  </section>
</template>
