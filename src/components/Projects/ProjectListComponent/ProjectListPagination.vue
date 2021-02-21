<template>
  <v-card width="100%" outlined>
    <v-tabs :value="current_page - 1"
            background-color="white darken-3"
            light
            show-arrows
    >
      <v-tabs-slider color="blue"></v-tabs-slider>

      <v-tab
          v-for="i in last_page"
          :key="i"
          @click="click(i)"
      >
        {{ i }}
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "ProjectListPagination",
  props: ['last_page', 'current_page'],
  methods: {
    click(i) {
      this.$emit('new_page', i);
    }
  }
}
</script>

<style scoped>

</style>
