<template>
  <v-icon v-if="status == true" class="enabled" >done</v-icon>
  <v-icon v-else class="disabled">block</v-icon>
</template>

<script>

export default {
    props: {
        status:      { type: Boolean, default: false, required: false },
    },
}
</script>