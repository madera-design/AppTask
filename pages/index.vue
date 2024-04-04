<template>
  <div>
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Sistema gestor de tareas</h1>
        <SearchTask
          @filter="searchTask"
          @reset="resetTask"
        />
      </v-col>
      <v-col cols="12">
        <ListTask
          :tasks="tasks"
          @update="updateTask"
          @delete="deleteTask"
          @add="addTask"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SearchTask from '../components/SearchTask.vue';
import ListTask from '../components/ListTask.vue';
import { getAllTasks } from '../services/apis';
export default {
  name: 'IndexPage',
  data () {
    return {
      modalVisible: false,
      tasks: [],
      copytasks: [],
    }
  },
  created() {
    this.getAllTasks();
  },
  methods: {
    async getAllTasks() {
      try {
        this.tasks = await getAllTasks();
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    },
    searchTask(id){
      this.copytasks = this.tasks
      const elementoEncontrado = this.tasks.filter(item => {
        return item.id === id;
      });
      if (elementoEncontrado) {
        this.tasks = elementoEncontrado
      }
    },
    addTask(task){
      //console.log('hola', task)
      this.tasks.push(task);
    },
    resetTask(){
      this.tasks = this.copytasks
    },
    updateTask(task) {
      let index = this.tasks.findIndex(item => item.id === task.id);
      if (index !== -1) {
        this.tasks[index] = { ...this.tasks[index], ...task };
      } else {
        this.tasks.push(task);
      }
      console.log('updateTask', task)
    },
    deleteTask(id){
      let index = this.tasks.findIndex(item => item.id === id);
      if (index !== -1) {
        this.tasks.splice(index, 1);
      }
    },
  },
}
</script>
