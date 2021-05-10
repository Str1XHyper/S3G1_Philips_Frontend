<template>
    <v-data-table
        :items="classes",
        :items-per-page="10"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Classes Dashboard</v-toolbar-title>
            </v-toolbar>
        </template>


        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="openEditDialog(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="openDeleteDialog(item)"> mdi-delete </v-icon>
        </template>
    </v-data-table>
</template>

<script>
    export default {
        created() {
            const config = {
                method: "get",
                url: "localhost:3000/Class"
            };
            this.$axios(config)
            .then((result) => {
                this.classes = result.data;
                this.loading = false;
            })
            .catch()
        },
        computed:{
            admin() {
                return this.$store.state.user.role == 'Admin'
            },
            scheduler() {
                return this.$store.state.user.role == 'Scheduler'
            }
        }
    }
</script>

<style scoped>

</style>