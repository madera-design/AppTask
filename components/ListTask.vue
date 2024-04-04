<template>
  <div>
    <v-card
      class="mx-auto"
      tile
    >
      <v-toolbar
      color="teal"
      dark
      >
        <v-toolbar-title>Mis tareas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="openModal()"
        >
          Nueva tarea
        </v-btn>
      </v-toolbar>
      <v-list flat v-if="tasks.length != 0">
        <v-list-item
            v-for="(task, i) in tasks"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>{{ task.id}} {{ task.title}}</v-list-item-title>
              <v-list-item-subtitle>{{ task.due_date }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
            <v-row>
              <v-col col="12">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="seeInfo(task)"
                    >
                      <v-icon dark>
                        mdi-eye
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Ver tarea</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="editInfo(task)"
                    >
                      <v-icon dark>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Editar tarea</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="mx-2"
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="deleteInfo(task)"
                    >
                      <v-icon dark>
                        mdi-trash-can-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar tarea</span>
                </v-tooltip>
              </v-col>
            </v-row>
            </v-list-item-action>
          </v-list-item>
      </v-list>
      <p v-else>Tareas no encontradas</p>
    </v-card>
    <ModalTask
      :visible="modalVisible"
      @close="closeModal"
      @update="updateTask"
      @add="addTask"
      :dataTask="infoTask"
      :disabledInput="disabledInput"
      :action="actionText"
    />
    <ModalAlerts
      :visible="modalVisibleAlerts"
      :dataTask="infoTask"
      @close="closeModal"
      @delete="deleteTask"
    />
  </div>
</template>
<script>
import ModalTask from '../components/ModalTask.vue';
import ModalAlerts from '../components/ModalAlerts.vue';
  export default {
    name: 'listTask',
    props: ['tasks'],
    data: () => ({
      modalVisible: false,
      modalVisibleAlerts: false,
      infoTask: null,
      disabledInput: false,
      actionText: '',
    }),
    methods:{
      seeInfo(data) {
        console.log(data)
        this.infoTask = data
        this.modalVisible = true;
        this.disabledInput = true;
        this.actionText = 'ver';
      },
      editInfo(data) {
        console.log(data)
        this.infoTask = data
        this.modalVisible = true;
        this.disabledInput = false;
        this.actionText = 'editar';
      },
      deleteInfo(data) {
        this.modalVisibleAlerts = true;
        this.infoTask = data
        console.log(data)
      },
      updateTask(task){
        this.$emit('update' , task);
        //console.log(task)
      },
      addTask(task){
        this.$emit('add' , task);
        //console.log(task)
      },
      deleteTask(task){
        this.$emit('delete' , task);
        //console.log(task)
      },
      closeModal() {
        this.modalVisible = false;
        this.modalVisibleAlerts = false;
      },
      openModal() {
        this.infoTask = null;
        this.modalVisible = true;
        this.disabledInput = false;
        this.actionText = 'crear';
      },
    }
  }
</script>
<style>
.info-text{
  text-align: center;
}
</style>
