<template>
  <ULandingHero title="Contact" orientation="horizontal">
    <template #description>
      StakOprichten.nl is onderdeel van
      <NuxtLink class="text-blue-500 underline" external to="https://rounde.nl">RoundE</NuxtLink>. RoundE richt zich op
      het aanbieden van werknemersparticipatie plannen voor bedrijven in Nederland.
    </template>
    <div class="flex justify-center">
      <div class="">
        <NuxtImg src="/images/office.jpg" alt="Kantoor" class="rounded-xl" />
      </div>
    </div>
  </ULandingHero>
  <ULandingSection id="form" title="Contact formulier">
    <div class="mx-auto sm:w-1/2">
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
        <UFormGroup name="message" label="Bericht">
          <UTextarea v-model="state.message" placeholder="Bericht" />
        </UFormGroup>
                <div class="cf-turnstile" data-sitekey="0x4AAAAAACDBONRlilyJZD_T"></div>

        <div>
          <UButton type="submit">Aanvragen</UButton>
        </div>
      </UForm>
    </div>
  </ULandingSection>
</template>

<script setup lang="ts">
import { z } from "zod";

const state = reactive({
  name: undefined,
  email: undefined,
  phone: undefined,
  company: undefined,
  message: undefined,
});

const schema = z.object({
  name: z.string().min(1, "Naam is verplicht"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().min(1, "Telefoonnummer is verplicht"),
  company: z.string().min(1, "Bedrijfsnaam is verplicht"),
  message: z.string().min(1, "Bericht is verplicht"),
});

type Schema = z.output<typeof schema>;

async function onSubmit() {
  try {
    const { data } = await client().signUp.consult.useQuery({
      email: state.email,
      name: state.name,
      phone: state.phone,
      company: state.company,
      message: state.message,
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
