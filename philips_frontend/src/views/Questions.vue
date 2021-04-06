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
      <v-dialog v-model="deleteDialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">
              Are you sure you want to delete "{{ selected.question }}"?</span
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
                <span class="headline">Edit question</span>
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
                        @change="comboChange"
                        v-model="type"
                        :items="types"
                      >
                      </v-combobox>
                    </v-col>
                  </v-row>
                  <v-row
                    v-for="answer in answers"
                    :key="answer.id"
                    dense
                    justify="space-around"
                  >
                    <v-col cols="12" lg="11">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Answer"
                        rules="required"
                      >
                        <v-text-field
                          v-model="answer.answer"
                          label="Answer*"
                          :error-messages="errors"
                        ></v-text-field> </ValidationProvider
                    ></v-col>
                    <v-col lg="1">
                      <v-checkbox
                        v-bind:disabled="type === 'Open' || type === 'Algebra' || answers.indexOf(answer) == 0"
                        color="info"
                        v-model="answer.correct"
                      ></v-checkbox
                    ></v-col>
                  </v-row>
                  <v-row v-if="type != 'Open'">
                    <v-col cols="12" lg="11">
                      <v-text-field dense disabled label="Answer*">
                      </v-text-field>
                    </v-col>
                    <v-col lg="1">
                      <v-btn @click="addAnswer" small icon class="py-auto">
                        <v-icon large color="success">mdi-plus</v-icon></v-btn
                      ></v-col
                    >
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
    answers: [
      {
        id: 1,
        answer: "",
        correct: true,
      },
    ],
  }),
  created() {
    this.$axios({
      method: "get",
      url: "/Question/" + this.$store.state.lessonID,
    })
      .then((result) => {
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
        this.types = result.data;
      })
      .catch((error) => {
        this.error = true;
        console.log(error);
      });
  },
  methods: {
    comboChange() {
      switch (this.type) {
        case "Open":
          this.answers.splice(1, this.answers.length - 1);
          break;
        case "Algebra":
          break;
        case "MultipleChoice":
          break;
      }
    },
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
      this.getAnswers(question.id);
    },
    getAnswers(questionID){
      var config = {
        method: "get",
        url: "/Answer/" + questionID,
        headers: {
          "Content-Type": "application/json",
        }
      };

      this.$axios(config)
        .then((response) => {
          this.answers = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    openAddDialog() {
      this.question = "";
      this.id = "";
      this.type = "Open";
      this.isEdit = false;
      this.editDialog = true;
      this.answers = [
        {
          id: 1,
          answer: "",
          correct: true,
        },
      ];
    },
    closeEditDialog() {
      this.question = "";
      this.id = "";
      this.type = "";
      this.$refs.observer.reset();
      this.isEdit = false;
      this.editDialog = false;
    },
    addAnswer() {
      this.answers.push({
        id: this.answers.length + 1,
        answer: "",
        correct: true,
      });
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
        this.setAnswers(this.id);
        this.closeEditDialog();
      });
    },
    setAnswers(questionID) {
      var config = {
        method: "post",
        url: "/Answer/Add",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          questionID: questionID,
          answers: this.answers,
        },
      };
      this.$axios(config)
        .then((response) => {
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addQuestion() {
      var config = {
        method: "post",
        url: "/Question/Add",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          lessonId: this.$store.state.lessonID,
          question: this.question,
          type: this.type,
        },
      };

      this.$axios(config)
        .then((response) => {
          this.Questions.push(response.data);
        })
        .catch(function (error) {
          console.log(error);
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
      };
      this.$axios(config)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updateAnswers() {
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
      };
      this.$axios(config)
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteQuestion() {
      var config = {
        method: "delete",
        url: "/Question/Delete",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          lessonID: this.$store.state.lessonID,
          questionID: this.selected.id
        },
      };
      this.$axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.deleteDialog = false;
      var index = this.Questions.findIndex(({ id }) => id === this.selected.id);
      this.Questions.splice(index, 1);
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