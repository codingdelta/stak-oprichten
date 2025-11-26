<script setup lang="ts">
import { z } from "zod";

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  company: undefined,
});

const schema = z.object({
  name: z.string().min(1, "Naam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().min(1, "Telefoonnummer is verplicht"),
  company: z.string().min(1, "Bedrijfsnaam is verplicht"),
});

type Schema = z.output<typeof schema>;

async function onSubmit() {
  try {
    const { data } = await client().signUp.consult.useQuery({
      email: state.email,
      name: state.name,
      phone: state.phone,
      company: state.company,
    });

    useToast().add({
      title: "Aanvraag verstuurd",
    });
  } catch (error) {
    useToast().add({
      title: "Er is iets misgegaan",
      description: "Contacteer ons op info@stakoprichten.nl",
    });
  }
}
</script>

<template>
  <div>
    <h2 class="text-2xl">STAK oprichten?</h2>
    <p>
      Wij helpen je met het oprichten van een STAK. Meld je nu aan, en ontvang een
      <strong>gratis consult</strong>.
    </p>
  </div>
  <div class="flex items-center gap-2">
    <div>
      <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid" class="bg-yellow-300" />
    </div>
    <div>20+ bedrijven</div>
  </div>
  <div>
    <UForm :schema="schema" :state="state" class="flex flex-col gap-2" @submit="onSubmit">
      <UFormGroup name="name" label="Naam">
        <UInput v-model="state.name" placeholder="Naam" />
      </UFormGroup>
      <UFormGroup name="company" label="Bedrijf">
        <UInput v-model="state.company" placeholder="Befrijfsnaam" />
      </UFormGroup>
      <UFormGroup name="email" label="Email">
        <UInput v-model="state.email" placeholder="E-mailadres" />
      </UFormGroup>
      <UFormGroup name="phone" label="Telefoonnummer">
        <UInput v-model="state.phone" placeholder="Telefoonnummer" />
      </UFormGroup>
              <div class="cf-turnstile" data-sitekey="0x4AAAAAACDBONRlilyJZD_T"></div>

      <div>
        <UButton type="submit">Aanvragen</UButton>
      </div>
    </UForm>
  </div>
</template>
