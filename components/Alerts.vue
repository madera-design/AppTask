<template>
  <v-alert :type="type" class="mt-10">
   {{ text }}
  </v-alert>
</template>
<script>
  export default {
    props: ['text', 'type'],
  }
</script>

