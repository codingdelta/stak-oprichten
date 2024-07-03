<script setup lang="ts">


const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation(queryContent('stak')))
let contentNav = mapContentNavigation(navigation.value)
contentNav = contentNav[0].children
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