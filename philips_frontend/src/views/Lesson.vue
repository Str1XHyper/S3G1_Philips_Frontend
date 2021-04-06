<template>
  <div>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="Lessons"
        :search="search"
        v-bind:loading="loading"
        loading-text="Loading lessons... Please wait"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Lessons</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn tile color="success" outlined @click="openAddDialog()"
              >Add</v-btn
            >
          </v-toolbar>
        </template>
        <template v-slot:item.questions="{ item }">
          <v-btn @click="openQuestions(item)" tile outlined> Questions </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEditDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      
      <v-alert v-if="error" class="mt-3" type="error" color="error">
        An unknown error occured fetching the lessons!
      </v-alert>
    </v-container>

    <v-row justify="center">
      <v-dialog v-model="deleteDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              Are you sure you want to delete "{{ selected.name }}"?</span
            >
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="deleteDialog = false"> Cancel </v-btn>
            <v-btn color="error" text @click="deleteLesson()"> Delete </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="editDialog" max-width="600px">
        <v-card>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-card-title v-if="isEdit">
                <span class="headline">Edit lesson with ID: </span>
                <v-text-field class="ml-2" disabled :value="id"> </v-text-field>
              </v-card-title>
              <v-card-title v-if="!isEdit">
                <span class="headline">Add new lesson</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Name"
                        rules="required"
                      >
                        <v-text-field
                          v-model="name"
                          label="Name*"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn class="mr-4" type="submit" :disabled="invalid">
                  Save
                </v-btn>
                <v-btn @click="closeEditDialog"> Cancel </v-btn>
              </v-card-actions>
            </form>
          </validation-observer>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  data: () => ({
    Lessons: [],
    search: "",
    selected: {},
    headers: [
      {
        text: "Name",
        align: "start",
        value: "name",
      },
      {
        text: "Questions",
        value: "questions",
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
    editDialog: false,
    deleteDialog: false,
    isEdit: false,
    name: "",
    id: "",
    ownerID: "",
    loading: true,
    error: false,
  }),
  created() {
    const config = {
      method: "get",
      url: "/Lesson",
    };
    this.$axios(config)
      .then((result) => {
        this.Lessons = result.data;
        this.loading = false;
      })
      .catch((error) => {
        this.error = true;
        this.loading = false;
        console.log(error);
      });
  },
  methods: {
    openQuestions(lesson){
      this.$store.commit("setLessonId", lesson.id)
      this.$router.push("/Questions")
    },
    openDeleteDialog(lesson) {
      this.selected = lesson;
      this.deleteDialog = true;
    },
    openEditDialog(lesson) {
      this.name = lesson.name;
      this.id = lesson.id;
      this.isEdit = true;
      this.editDialog = true;
    },
    openAddDialog() {
      this.name = "";
      this.id = "";
      this.isEdit = false;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.name = "";
      this.id = "";
      this.$refs.observer.reset();
      this.isEdit = false;
      this.editDialog = false;
    },
    submit() {
      this.$refs.observer.validate().then(() => {
        if (this.isEdit) {
          this.updateLesson();
          var result = this.Lessons.find(({ id }) => id === this.id);
          result.name = this.name;
        } else {
          this.addLesson();
        }
        this.closeEditDialog();
      });
    },
    updateLesson() {
      var config = {
        method: "put",
        url: "/Lesson/Edit",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          iD: this.id,
          name: this.name,
          ownerID: this.ownerID,
        },
      };

      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addLesson() {
      var config = {
        method: "post",
        url: "/Lesson/Add",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: this.name,
          ownerID: this.ownerID,
        },
      };

      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          this.Lessons.push(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteLesson() {
      var config = {
        method: "delete",
        url: "/Lesson/Delete",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          iD: this.selected.id,
        },
      };
      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      this.deleteDialog = false;
      var index = this.Lessons.findIndex(({ id }) => id === this.selected.id);
      this.Lessons.splice(index, 1);
    },
  },

  components: {
    ValidationProvider,
    ValidationObserver,
  },
};
</script>

<style>
</style>