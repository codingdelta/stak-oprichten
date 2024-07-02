<script setup lang="ts">

const links = [{
  label: 'Hoofdstukken',
  to: '/hoofdstuk'
},
{
  label: 'Blog',
  to: '/blog'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      StakOprichten.nl
    </template>

    <!-- <template #right>
    </template> -->

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" default-open />
    </template>
  </UHeader>
</template>
