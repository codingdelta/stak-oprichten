<script setup lang="ts">
import useToc from "~/composables/toc";

const contentNav = await useToc();
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
