<template>
  <v-container>
    <v-row>
      <v-data-table
        :headers="headers"
        :items="classes"
        :items-per-page="5"
        class="elevation-1"
        :loading="loading"
        style="width: 100%"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Classes</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.students="{ item }">
          <v-btn outlined tile @click="openEditStudents(item)"
            >Edit students</v-btn
          >
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEditDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template></v-data-table
      >
    </v-row>
    <v-row>
      <v-alert type="error" v-model="error" width="100%"
        >There was an error receiving the Classes!</v-alert
      ></v-row
    >
    <v-row>
      <v-dialog v-model="editStudents">
        <v-card>
          <p v-for="student in students" :key="student.id">
            {{student.username}}
          </p>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import Planned from "../PlannedLessons";
export default {
  components: {
    Planned,
  },
  created() {
    const config = {
      method: "get",
      url: "/Class",
    };
    this.$axios(config)
      .then((result) => {
        this.classes = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        this.loading = false;
        console.log(error);
      });
  },
  data: () => ({
    editStudents:false,
    students: [],
    classes: [],
    error: false,
    loading: true,
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      {
        text: "Students",
        value: "students",
        sortable: false,
        filterable: false,
        align: "center",
      },
      {
        text: "Actions",
        value: "actions",
        sortable: false,
        filterable: false,
        align: "right",
      },
    ],
  }),
  methods:{
    openEditStudents(schoolClass){
    const config = {
      method: "get",
      url: "/Class/Students/" + schoolClass.id,
    };
    this.$axios(config)
      .then((result) => {
        this.students = result.data
        this.editStudents = true;
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
};
</script>

<style>
</style>