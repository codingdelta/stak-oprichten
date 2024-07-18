<script setup lang="ts">
const links = [
  {
    label: "Bedrijf",
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
          <div>
            Onderdeel van <NuxtLink class="text-blue-500 underline" to="https://rounde.nl" external>RoundE</NuxtLink>.
          </div>
          <span>KVK: 77615999</span>
          <div>
            <NuxtLink class="text-blue-500 underline" to="https://rounde.nl/terms" external
              >Algemene Voorwaarden</NuxtLink
            >
            en
            <NuxtLink class="text-blue-500 underline" to="https://rounde.nl/disclaimer" external>Disclaimer</NuxtLink>
            van RoundE
          </div>
          <div>
            <NuxtLink
              class="text-blue-500 underline"
              to="https://drive.google.com/file/d/12mKj8HpWQVL-CBK8HaXMhwElsdVhKxcW/view?usp=drive_link"
              external
              >Algemene Voorwaarden Coding Delta</NuxtLink
            >
          </div>
          <!-- <form @submit.prevent="onSubmit">
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
          </form> -->
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
