<template>
  <div class="home">
 <v-container>
      <v-data-table
        :headers="headers"
        :items="Questions"
        :search="search"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Questions</v-toolbar-title>
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
        <template>
</template>
        <template v-slot:item.questions="{ item }">
          <v-btn tile outlined> Questions </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openEditDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
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
            <v-btn color="error" text @click="deleteQuestion()"> Delete </v-btn>
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
                <span class="headline">Edit question with ID: </span>
                <v-text-field class="ml-2" disabled :value="id"> </v-text-field>
              </v-card-title>
              <v-card-title v-if="!isEdit">
                <span class="headline">Add new question</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Question"
                        rules="required"
                      >
                        <v-text-field
                          v-model="question"
                          label="Question*"
                          :error-messages="errors"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-combobox
                      v-model="type"
                      :items="types">

                      </v-combobox>
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
    Questions: [],
    search: "",
    selected: {},
    headers: [
      {
        text: "Question",
        align: "start",
        value: "question",
      },
      {
        text: "Type",
        align: "start",
        value: "type",
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
    question: "",
    id: "",
    type: "",
    types: [],
  }),
  created() {
    this.$axios({
      method: "get",
      url: "/Question/" + this.$store.state.lessonID,
    })
      .then((result) => {
          console.log(result.data)
        this.Questions = result.data;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
    this.$axios({
      method: "get",
      url: "/Question/Types",
    })
      .then((result) => {
          console.log(result.data)
        this.types = result.data;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
    openDeleteDialog(question) {
      this.selected = question;
      this.deleteDialog = true;
    },
    openEditDialog(question) {
      this.question = question.question;
      this.type = question.type;
      this.id = question.id;
      this.isEdit = true;
      this.editDialog = true;
    },
    openAddDialog() {
      this.question = "";
      this.id = "";
      this.type = "";
      this.isEdit = false;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.question = "";
      this.id = "";
      this.type = "";
      this.$refs.observer.reset();
      this.isEdit = false;
      this.editDialog = false;
    },
    submit() {
      this.$refs.observer.validate().then(() => {
        if (this.isEdit) {
          this.updateQuestion();
          var result = this.Questions.find(({ id }) => id === this.id);
          result.question = this.question;
          result.type = this.type;
        } else {
          this.addQuestion();
        }
        this.closeEditDialog();
      });
    },
    updateQuestion() {
      var config = {
        method: "put",
        url: "/Question/Edit",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          id: this.id,
          question: this.question,
          type: this.type,
        },
      }
      this.$axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
}
</script>

<style>

</style>