<template>
  <v-container>
    <v-card outlined>
      <v-card-title>Поиск проекта</v-card-title>
      <v-card-text>
        <v-row align-content="center" justify="space-between">
          <v-col lg="12">
            <v-text-field
                v-model="filter.title"
                label="Название проекта"
            ></v-text-field>
            <v-select
                v-model="filter.project_type_ids"
                :items="$store.state.projects.project_types"
                chips
                color="blue"
                deletable-chips
                item-text="name"
                item-value="id"
                label="Тип проекта"
                multiple
                no-data-text="Нет типов"
                outlined
            ></v-select>
            <v-switch v-if="$store.state.user.currentUser.id > 0"
                      v-model="filter.my"
                      label="Отобразить только мои проекты"
            ></v-switch>
          </v-col>

        </v-row>

      </v-card-text>
    </v-card>
    <v-tooltip :value="true" left>
      <template v-slot:activator="{ on }">
        <v-btn
            v-on="on"
            bottom
            color="blue darken-2"
            dark
            fab
            fixed
            right
            to="/projects/create"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>Создайте проект</span>
    </v-tooltip>
    <v-row justify="center">
      <v-col cols="12">
        <ProjectListPagination :current_page="filter.page" :last_page="$store.state.projects.projects.last_page"
                               @new_page="filter.page=$event"/>
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col v-for="i in 8" :key="i" cols="12" lg="6">
        <v-skeleton-loader
            class="mx-auto mt-2"
            type="image, article, list-item-avatar-three-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <template v-else>
      <v-row>
        <v-col v-for="project in projects" :key="project.id" cols="12" lg="6">
          <v-card class="mx-auto"
                  outlined
                  @click="$router.push('/projects/'+project.id)"
          >

            <v-img :src="project.logotype_url"
                   class="d-block d-sm-none"
                   dark
            ></v-img>

            <v-list-item three-line>
              <v-list-item-content>
                <div v-if="project.archive_reason" class="overline mb-4">Архив
                  ({{ project.archive_reason.reason }})
                </div>
                <div class="overline mb-4">{{ project.type.name }} проект</div>
                <v-list-item-title class="headline mb-1" style="white-space: normal">{{ project.title }}
                </v-list-item-title>
                <v-list-item-subtitle style="-webkit-line-clamp: 4">{{ project.task }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  class="hidden-xs-only"
                  color="grey"
                  size="150"
                  tile
              >
                <v-img
                    :src="project.logotype_url"
                    dark
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>


            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Вакансии</div>
                <v-chip-group column @click.prevent.stop="() => {}">
                  <v-menu v-for="role in project.roles" :key="role.id"
                          bottom
                          origin="top left"
                          right
                          transition="scale-transition"
                  >
                    <template v-slot:activator="{ on }">

                      <v-chip class="ma-2"
                              light
                              style="padding-left: 40px;"

                      >

                        <v-progress-circular :value="parseInt(role.users.length/role.quota*100)" color="green"
                                             style="position: absolute; left: 0"></v-progress-circular>
                        <v-avatar
                            class="text-white darken-4"
                            color="#eaeaea"
                            left
                            style="position: absolute; z-index: 2; left: 10px"
                        >
                          {{ role.quota }}
                        </v-avatar>
                        {{ role.name }}
                      </v-chip>
                    </template>
                    <v-card width="300">
                      <v-list>
                        <v-list-item-content>
                          <v-list-item-title>{{ role.name }}</v-list-item-title>
                          <v-list-item-subtitle>{{ role.quota }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list>
                    </v-card>
                  </v-menu>
                </v-chip-group>
              </v-list-item-content>
            </v-list-item>
            <v-list-item-content>

            </v-list-item-content>


            <v-card-actions v-if="project.approved == 0">
              <v-btn v-if="$store.state.user.currentUser.admin == 1 && project.approved == 0" class="ma-2"
                     color="success" outlined
                     small tile @click.prevent.stop="approve(project)">
                <v-icon left>mdi-check</v-icon>
                Одобрить
              </v-btn>
              <v-btn
                  v-if="$store.state.user.currentUser.admin == 1 || project.responsible_user_id == $store.state.user.currentUser.id"
                  class="ma-2"
                  color="error"
                  outlined small tile
                  @click.prevent.stop="remove(project)">
                <v-icon left>mdi-delete</v-icon>
                Удалить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <ProjectListPagination :current_page="filter.page" :last_page="$store.state.projects.projects.last_page"
                                 @new_page="filter.page=$event"/>
        </v-col>
      </v-row>
    </template>
    <v-row v-if="projects && projects.length === 0" align-content="center">
      <v-col>
        <v-card>
          <v-alert v-if="filter.my === 1"
                   prominent
                   text
                   type="info"
          >
            <v-row align="center">
              <v-col class="grow">Проектов по заданным фильтрам нет. Самое время их создать или вступить в чужой.
              </v-col>
              <v-col class="shrink">
                <v-btn color="green" to="/projects/create">Создать свой</v-btn>
              </v-col>
              <v-col class="shrink">
                <v-btn color="blue" @click="my = 0">Смотреть все</v-btn>
              </v-col>
            </v-row>
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectListPagination from "@/components/Projects/ProjectListComponent/ProjectListPagination.vue";

export default {
  name: "ProjectsListComponent",
  components: {ProjectListPagination},
  data() {
    return {
      isActive: true,
      loading: true,
      userProject: [],
      filter: {
        page: 1,
        title: "",
        project_type_ids: [],
        my: 1,
      }
    }
  },
  watch: {
    filter: {
      handler() {
        this.search();
      },
      deep: true
    }
  },
  computed: {
    filter_obj() {
      let isAuth = this.$store.state.user.currentUser.id > 0;
      let filter = {page: this.filter.page};
      if (this.filter.my && isAuth) filter.by_user = this.$store.state.user.currentUser.id
      if (this.filter.title.length > 2) filter.title = this.filter.title;
      if (this.filter.project_type_ids.length > 0) filter.project_type_ids = this.filter.project_type_ids.join(",");
      return filter;
    },
    projects() {
      return this.$store.state.projects.projects.data;
    }
  },
  methods: {
    search() {
      this.loading = true;
      this.$store.dispatch('getProjects', this.filter_obj).then(() => {

      }).then(() => {
        this.loading = false;
      })
    },

    approve(project) {
      this.loading = true;
      if (confirm('Вы действительно хотите одобрить?')) {
        this.$store.dispatch('approveProject', {id: project.id}).then(() => {
          this.$store.dispatch('getProjects');
          this.loading = false;
          this.$store.dispatch('getProjectsByUser', {})
        })
      }
    },
    remove(project) {
      if (confirm('Вы действительно хотите удалить проект?')) {
        this.loading = true;
        this.$store.dispatch('removeProject', {id: project.id}).then(() => {
          this.loading = false;
          this.$store.dispatch('getProjects');
        })

      }
    }
  },
  mounted() {
    this.$emit('changeTitle', 'Проекты');
    Promise.all([
      this.$store.dispatch('getEmployees'),
      this.$store.dispatch('getProjectTypes'),
      this.$store.dispatch('getProjects', this.filter_obj)]).then(() => {
      this.filter.type = this.$store.state.projects.project_types.map(el => el.id)
    }).then(() => {
      this.loading = false;
    })
  }
}
</script>

<style scoped>

</style>
