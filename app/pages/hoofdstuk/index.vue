<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
const { data: chapters } = await useAsyncData('chapters', () => queryContent('hoofdstuk').find())
</script>

<template>
  <h1>Alle informatie over het Stichting Administratiekantoor (STAK)</h1>

  <div class="grid grid-cols-1 md:grid-cols-3">
    <div v-for="chapter in chapters" :key="chapter._id">{{ chapter.title }}</div>
  </div>

</template>
