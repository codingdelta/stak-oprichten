<script setup lang="ts">


const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('hoofdstuk')))
const contentNav = mapContentNavigation(navigation.value)
</script>

<template>
  <div>
    <AppHeader />

    <UContainer>
      <UPage>
        <template #left>
          <UAside>
            <UNavigationTree :links="contentNav" />
          </UAside>
        </template>

        <slot />
      </UPage>
    </UContainer>
    <AppFooter />

  </div>

</template>