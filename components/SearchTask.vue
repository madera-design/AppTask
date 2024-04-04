<template>
  <v-text-field
    outlined
    label="buscar tareas por el id"
    append-icon="mdi-magnify"
    class="mt-4"
    v-model="textID"
    @keyup.enter="searchTask"
    type="number"
    hint="Presiona enter para buscar coincidencias"
  ></v-text-field>
</template>
<script>
  export default {
    name: 'searchTask',
    data: () => ({
      textID: null,
    }),
    methods:{
      searchTask(){
        this.$emit('filter' , parseInt(this.textID, 10));
      }
    },
    watch: {
      textID: {
        handler(newValue, oldValue) {
          console.log(newValue)
          if (newValue === '') {
            this.$emit('reset');
          }
        },
        deep: true,
      },
    }
  }
</script>
