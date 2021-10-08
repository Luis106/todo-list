<template>
  <div class="add-control">
        <div class="form-group has-feedback">
          <input
              v-on:keyup.enter="emitCreateTaskEvent"
              type="text"
              class="form-control"
              placeholder="✍️ Add item..."
              v-on:input="$emit('input_method', $event.target.value)"
          />
          <i
              v-on:click="emitCreateTaskEvent"
              class="fa fa-plus form-control-feedback add-btn"
              title="Add item"
          ></i>
        </div>
      </div>
</template>

<script>
export default {

    name: "createTaskInput",

    methods: {
        emitCreateTaskEvent() {
            this.$emit("AddTask")
            
        }
    }//Fin de metodos

}///Fin del export

</script>

<style>

</style>