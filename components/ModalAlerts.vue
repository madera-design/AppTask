<template>
  <div>
    <v-row justify="center">
      <v-dialog
        v-model="visible"
        max-width="290"
      >
        <v-card>
          <v-card-title class="text-h5">
            Eliminar tarea {{ id }}
          </v-card-title>

          <v-card-text>
            ¿Estas seguro que deseas eliminar esta tarea?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="primary"
              text
              @click="closeModal()"
            >
              Cerrar
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="deleteTask()"
            >
            Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <Alerts
    v-if="visibleAlert"
    :text="textAlert"
    :type="typeAlert"
    />
  </div>
</template>
<script>
import Alerts from './Alerts.vue'
import { deleteTask  } from '../services/apis'
  export default {
    name: 'listTask',
    props: ['visible', 'dataTask'],
    data: () => ({
      id: 0,
      visibleAlert: false,
      textAlert: '',
      typeAlert: '',
    }),
    methods:{
      closeModal (){
        this.$emit('close');
      },
      async deleteTask(){
        try {
          await deleteTask(this.id);
          this.$emit('delete', this.id);
          this.$emit('close');
          this.showAlert('delete')
        } catch (error) {
          console.error('Error al eliminar la tarea:', error);
          alert('Error al eliminar la tarea. Por favor, intenta de nuevo más tarde.');
        }
      },
      showAlert(text){
      this.visibleAlert = true;
      this.textAlert = 'Tarea eliminada exitosamente'
      this.typeAlert = 'success'
      setTimeout(() => {
        this.visibleAlert = false;
      }, 2000);
    }
    },
    watch: {
      dataTask: {
        handler(newValue, oldValue) {
          if (newValue === null) {
            console.log('La prop propValue es null');
          } else {
            this.id = newValue.id
          }
        },
        deep: true,
      },
    },
  }
</script>
