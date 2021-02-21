<template>
  <v-card width="100%" outlined>
    <v-tabs
        background-color="white darken-3"
        light
        show-arrows
    >
      <v-tabs-slider color="blue"></v-tabs-slider>

      <v-tab
          v-for="i in $store.state.projects.projects.last_page"
          :key="i"
          @click="$emit('new_page', current_page)"
      >
        {{ i }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "ProjectListPagination",
  props: ['last_page', 'current_page']
}
</script>

<style scoped>

</style>
