<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3">
      <div class="add-control">
        <div class="form-group has-feedback">
          <input
              v-on:keyup.enter="addTask"
              type="text"
              class="form-control"
              placeholder="✍️ Add item..."
              v-model="newTask"
          />
          <i
              v-on:click="addTask"
              class="fa fa-plus form-control-feedback add-btn"
              title="Add item"
          ></i>
        </div>
      </div>
      <p class="err text-danger text-center hidden"><i class="fa fa-warning"></i> Oops! Please, enter name item</p>
      <p class="no-items text-muted text-center hidden"><i class="fa fa-ban"></i></p>
      <ul class="todo-list">
        <li
            v-for="(task, index) in getCreatedTasks"
            :key="task.taskId"
            v-bind:class="{ danger: task.status === 'DONE' }"
        >
          <div class="checkbox">
            <span class="close">
              <i class="fa fa-times" v-on:click="deleteTask(index)"></i>
            </span>
            <label>
              <span class="checkbox-mask"></span>
              <input type="checkbox" v-on:click="changeStatus(index)">
              {{task.name}}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import createTaskInput from '../components/createTaskInput.vue';
  import taskComponent from '../components/taskComponent.vue';

  import {mapGetters} from 'vuex';

  export default {
  components: { createTaskInput, taskComponent },
  name: "CreateTask",
  data() {
    return {
      newTask:"",
      taskList:[]
    }
  },
  computed: {
     ...mapGetters("tasks", ["getCreatedTasks"]),
  },
    methods: {
      async addTask(){
        const newTask = {
          taskId: this.generateID(),
          name: this.newTask,
          status: "DONE",
          id:this.generateID()
        };
        if (this.newTask !== ""){
          // add task to server
          try {
            const response = await axios.post(
                "http://localhost:3000/tasks",
                newTask
            );
            if (response.status !== 500) {
              this.taskList.push(newTask);
            } else {
              alert("No se pudo crear la tarea")
            }
          } catch (err){
            console.log(err);
          }
          this.newTask = "";
        }
      },
      generateID() {
        const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return randLetter + Date.now();
      },
      async deleteTask(taskIndex){
        const response = await axios.delete(
            `http://localhost:3000/tasks/${this.taskList[taskIndex].id}`
        )
        if (response.status != 500) {
          this.taskList.splice(taskIndex, 1);
        }
      },
      async changeStatus(taskIndex){
        const taskCopy = this.taskList[taskIndex];
        taskCopy['status'] = this.taskList[taskIndex]['status'] === "NEW"? "DONE": "NEW";
        const response = await axios.put(

            `http://localhost:3000/tasks/${this.taskList[taskIndex].id}`,
            taskCopy
        )

        if (response.status !== 500){
            this.taskList.splice(taskIndex, 1);
         
        }
      },
      async getAllTasks(){

        const createdTasks = this.$store.getters["tasks/getCreatedTasks"];
        console.log(createdTasks.length)
        if (createdTasks && createdTasks.length === 0) {
          
          await this.$store.dispatch("tasks/getAllTasks", "NEW");
          
        }

      }
    },
    created() {
      this.getAllTasks();
    },
    destroyed () {
      console.log("DoneTask ha muerto");
    },
  }
</script>

<style scoped>

</style>
