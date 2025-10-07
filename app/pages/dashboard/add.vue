<script setup lang="ts">
import type { FetchError } from 'ofetch'

import { toTypedSchema } from '@vee-validate/zod'

import { InsertLocation } from '~/lib/db/schema/'

const { $csrfFetch } = useNuxtApp()
const router = useRouter()
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation)
})
const loading = ref(false)
const submitted = ref(false)

const submitError = ref('')
const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = ''
    loading.value = true
    await $csrfFetch('/api/locations', {
      method: 'POST',
      body: values
    })
    submitted.value = true
    navigateTo('/dashboard')
  }
  catch (e) {
    const error = e as FetchError
    if (error.data?.data) {
      setErrors(error.data?.data)
    }
    submitError.value = error.statusMessage || 'An unknown error occurred'
  }
  finally {
    loading.value = false
  }
})

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm('You have unsaved changes. Are you sure you want to leave?')
    if (!confirm) {
      return false
    }
  }
  return true
})
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        a location is a place you are traveling to
      </p>
    </div>
    <div v-if="submitError" role="alert" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <AppFormField
        name="lat"
        label="Latitude"
        type="number"
        :error="errors.lat"
        :disabled="loading"
      />
      <AppFormField
        name="long"
        label="Longitude"
        type="number"
        :error="errors.long"
        :disabled="loading"
      />
      <div class="flex justify-end mt-4 gap-4">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          Cancel
          <Icon name="tabler:arrow-left" size="24" />
        </button>
        <button :disabled="loading" type="submit" class="btn btn-primary">
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon v-else name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>
