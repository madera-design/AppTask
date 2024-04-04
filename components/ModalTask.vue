<template>
  <div>
  <v-dialog
      v-model="visible"
      max-width="700"
    >
      <v-card>
      <v-toolbar
          flat
          dark
          color="teal"
        >
          <v-toolbar-title>{{ titleaction }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
            icon
            dark
            @click="closeModal()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
          <v-card-subtitle>Ingresa la información requerida</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="dataForm.title"
                  :rules="nameRules"
                  label="Titulo"
                  required
                  outlined
                  dense
                  :disabled="disabledInput"
                ></v-text-field>
              </v-col>
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
              <h3>Estado de la tarea</h3>
                <v-radio-group
                    v-model="dataForm.is_completed"
                    column
                    :rules="[v => !!v || 'Selecciona el estado de la tarea']"
                  >
                    <v-radio
                      label="No completada"
                      value="0"
                      class="mt-0"
                      :disabled="disabledInput"
                    ></v-radio>
                    <v-radio
                      label="Completada"
                      value="1"
                      :disabled="disabledInput"
                    ></v-radio>
                  </v-radio-group>
              </v-col>
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-menu
                  v-model="calendar"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"

                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dataForm.due_date"
                      label="Fecha"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      required
                      :rules="dateRules"
                      :disabled="disabledInput"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dataForm.due_date"
                    @input="calendar = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col xl="4" lg="4" md="4" sm="12" xs="12">
                <v-select
                  v-model="dataForm.tags"
                  :items="items"
                  item-text="text"
                  item-value="id"
                  label="tags"
                  persistent-hint
                  return-object
                  single-line
                  outlined
                  dense
                  :disabled="disabledInput"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dataForm.comments"
                  label="Comentario"
                  outlined
                  dense
                  :disabled="disabledInput"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="dataForm.description"
                  label="Descripción"
                  outlined
                  :disabled="disabledInput"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-form>
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
            v-if="!disabledInput"
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="validate"
          >
           {{ actionText }} Tarea
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <Alerts
    v-if="visibleAlert"
    :text="textAlert"
    :type="typeAlert"
  />
  </div>
</template>

<script>
import Alerts from './Alerts.vue';
import { createTask, updateTask  } from '../services/apis'
export default {
  name: 'ModalTask',
  props: ['visible', 'dataTask', 'disabledInput', 'action'],
  data () {
    return {
      dialog: true,
      valid: true,
      visibleAlert: false,
      textAlert: '',
      typeAlert: '',
      dataForm :{
        title: '',
        is_completed: null,
        due_date:'',
        comments:'',
        description: '',
        tags: '',
      },
      nameRules: [
        v => !!v || 'Ingresa el titulo de la nueva tarea',
      ],
      dateRules: [
        v => !!v || 'Ingresa uan fecha a la nueva tarea',
      ],
      items: [
        { text: 'Florida', id: 'FL' },
        { text: 'Georgia', id: 'GA' },
        { text: 'Nebraska', id: 'NE' },
        { text: 'California', id: 'CA' },
        { text: 'New York', id: 'NY' },
      ],
      calendar: false,
    }
  },
  computed: {
    actionText() {
      return this.action === 'editar' ? 'Guardar' : 'Crear';
    },
    titleaction() {
      let titleText = ''
      switch (this.action) {
        case 'editar':
        titleText = 'Editar tarea'
          break;
        case 'crear':
        titleText = 'Nueva tarea'
          break;
        case 'ver':
        titleText = 'Ver tarea'
          break;

        default:
        titleText = 'Ver tarea'
          break;
      }
      return titleText
    }
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if(this.$refs.form.validate()){
        this.action === 'editar' ? this.editTask() : this.saveTask();
      }
    },
    closeModal (){
      this.$refs.form.resetValidation()
      this.$emit('close');
    },
    async saveTask(){
      try {
        let response = await createTask({
          token: this.dataForm.title,
          title: this.dataForm.title,
          is_completed: this.dataForm.is_completed,
          due_date: this.dataForm.due_date,
          comments: this.dataForm.comments,
          description: this.dataForm.description,
          tags: this.dataForm.tags
        });
        console.log(response)
        this.$emit('close');
        this.$emit('add' , response.task);
        this.resetForm()
        this.showAlert('crear')
      } catch (error) {
        console.error('Error al crear la tarea:', error);
        alert('Error al crear la tarea. Por favor, intenta de nuevo más tarde.');
      }
    },
    async editTask(){
      let copyObject = { ...this.dataForm };
      this.$emit('update' , copyObject);
      try {
        let response = await updateTask(this.dataForm.id , {
          token: this.dataForm.title,
          title: this.dataForm.title,
          is_completed: this.dataForm.is_completed,
          due_date: this.dataForm.due_date,
          comments: this.dataForm.comments,
          description: this.dataForm.description,
          tags: this.dataForm.tags,
          id: this.dataForm.id,
        });
        console.log(response)
        this.$emit('close');
        this.resetForm()
        this.showAlert('editar')
      } catch (error) {
        console.error('Error al editar la tarea:', error);
        alert('Error al editar la tarea. Por favor, intenta de nuevo más tarde.');
      }
    },
    resetForm(){
        this.dataForm.title = ''
        this.dataForm.is_completed = null
        this.dataForm.due_date = ''
        this.dataForm.comments = '';
        this.dataForm.description = '';
        this.dataForm.tags = '';
        this.$refs.form.resetValidation();
    },
    showAlert(text){
      this.visibleAlert = true;
      text === 'crear' ? this.textAlert = 'Tarea creada exitosamente' : this.textAlert = 'Tarea editada exitosamente'
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
          //console.log('La prop propValue es null');
          this.resetForm()
        } else {
          this.dataForm.title = newValue.title
          this.dataForm.is_completed = newValue.is_completed.toString();
          this.dataForm.due_date = newValue.due_date
          this.dataForm.comments = newValue.comments
          this.dataForm.description = newValue.description
          this.dataForm.tags = newValue.tags
          this.dataForm.id = newValue.id
        }
      },
      deep: true,
    },
  },
}
</script>
