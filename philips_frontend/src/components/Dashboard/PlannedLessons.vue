<template>
  <v-data-table
    :headers="headers"
    :items="lessons"
    :items-per-page="5"
    class="elevation-1"
    style="width: 100%"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Planned Lessons</v-toolbar-title>
      </v-toolbar>
    </template>
    
    <template v-slot:item.actions="{ item }" >
      <v-icon v-if="HasEditPermission" small class="mr-2" @click="openEditDialog(item)">
        mdi-pencil
      </v-icon>
      <v-icon v-if="HasEditPermission" small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
      
      <router-link :to="'Game?id=' + item.lesson.id"  :key="item.id"><v-icon mall > mdi-chevron-right </v-icon></router-link>
    </template>
  </v-data-table>
</template>

<script>
import store from '../../store/index'
export default {
  props:{
    HasEditPermission: Boolean,
  },
  created() {
    
    const config = {
      method: "get",
      url: "/Lesson/GetPlanned/"+ store.state.user.id ,
    };

    this.$axios(config)
      .then((result) => {
        this.lessons = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        this.loading = false;
        console.log(error);
    });

  },
  data: () =>({
      lessons:[],
      error:false,
      loading:true,
      headers: [
      {
        text: "Name",
        align: "start",
        value: "lesson.name",
      },
      {
        text: "Planned Time",
        align: "start",
        value: "plannedTime",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        filterable: false,
        align: "right",
      },
    ],  
  })
}
</script>

<style>

</style>