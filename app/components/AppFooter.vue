<script setup lang="ts">
const links = [
  {
    label: "Befrijf",
    children: [
      {
        label: "Contact",
        to: "/contact",
      },
      {
        label: "Blog",
        to: "/blog",
      },
      {
        label: "Hoofdstukken",
        to: "/stak",
      },
    ],
  },
];

const toast = useToast();

const email = ref("");
const loading = ref(false);

function onSubmit() {
  loading.value = true;

  setTimeout(() => {
    toast.add({
      title: "Subscribed!",
      description: "You've been subscribed to our newsletter.",
    });

    loading.value = false;
  }, 1000);
}
</script>

<template>
  <UFooter :ui="{ wrapper: '' }">
    <template #top>
      <UFooterColumns :links="links">
        <template #right>
          <form @submit.prevent="onSubmit">
            <UFormGroup label="Subscribe to our newsletter" :ui="{ container: 'mt-3' }">
              <UInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
                :ui="{ icon: { trailing: { pointer: '' } } }"
                required
                size="xl"
                autocomplete="off"
                class="max-w-sm"
                input-class="rounded-full"
              >
                <template #trailing>
                  <UButton
                    type="submit"
                    size="xs"
                    color="primary"
                    :label="loading ? 'Subscribing' : 'Subscribe'"
                    :loading="loading"
                  />
                </template>
              </UInput>
            </UFormGroup>
          </form>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>
  </UFooter>
</template>
