<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3">
     <createTaskInput

      v-on:input_method = "assignTaskValue"
      v-on:AddTask = "addTask"

     ></createTaskInput>


      <p class="err text-danger text-center hidden"><i class="fa fa-warning"></i> Oops! Please, enter name item</p>
      <p class="no-items text-muted text-center hidden"><i class="fa fa-ban"></i></p>
      <ul class="todo-list">
        <li
            v-for="(task, index) in taskList"
            :key="task.taskId"
            v-bind:class="{ danger: task.status === 'DONE' }"
        >
          <taskComponent
          v-bind:name = "task.name"
          v-bind:index = "index"

          v-on:deleteTask = "deleteTask"
          v-on:changeStatus = "changeStatus"
          >
          </taskComponent>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

  import axios from 'axios';

  import createTaskInput from '../components/createTaskInput.vue';
  import taskComponent from '../components/taskComponent.vue';

  export default {
  components: { createTaskInput, taskComponent },
  name: "CreateTask",
  data() {
    return {
      newTask:"",
      taskList:[]
    }
  },
    methods: {
      
      assignTaskValue(value){
        this.newTask = value;
      },

      async addTask(){
        const newTask = {
          taskId: this.generateID(),
          name: this.newTask,
          status: "NEW",
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
        console.log( `http://localhost:3000/tasks/${this.taskList[taskIndex].id}`);
        console.log(this.taskList[taskIndex]);
        const response = await axios.put(

            `http://localhost:3000/tasks/${this.taskList[taskIndex].id}`,
            taskCopy
        )
        if (response.status !== 500){
         this.taskList.splice(taskIndex, 1);
        }
      },
      async getAllTasks(){
        try {
          const response = await axios.get(
              "http://localhost:3000/tasks?status=NEW"
          );
          if (response.data){
            this.taskList = response.data;
          }
        }catch (err) {
          console.log(err);
        }
      }
    },
    created() {
      this.getAllTasks();
    },
    destroyed () {
      console.log("Createtask ha muerto");
    },
  }
</script>
<style scoped>
</style>

