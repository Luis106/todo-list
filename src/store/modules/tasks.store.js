	import axios from "axios";

	const state = {
		createdTaskList: [],
		doneTaskList: []
	};
	const getters = {
		getCreatedTasks: (state) => state.createdTaskList,
		getDoneTasks: (state) => state.doneTaskList,
	};
	const actions = {
		async getAllTasks({commit}, taskType) {
			try {
				const response = await axios.get(
					`http://localhost:3000/tasks?status=${taskType}`
				);

				console.log(taskType);
				console.log(response.data);

				if (response.data){
					if (taskType === "NEW"){
						commit('SET_CREATED_TASKS', response.data);
					} else {
						commit('SET_DONE_TASKS', response.data);
					}

				}

			}catch (err) {
				console.log(err);
			}
		},
		async changeStatus({commit, state}, {taskIndex, taskType}) {
			let currentTask;
			if (taskType === "NEW") {
				currentTask = state.createdTaskList[taskIndex]
			} else {
				currentTask = state.doneTaskList[taskIndex]
			}
			const taskCopy = currentTask;
			taskCopy['status'] = currentTask['status'] === "NEW"? "DONE": "NEW";

			const response = await axios.put(
				`http://localhost:3000/tasks/${currentTask.id}`,
				taskCopy
			)

			if (response.status !== 500){
				if (taskType === "NEW") {
					commit("CHANGE_NEW_TASK_STATUS", taskIndex);
				} else {
					commit("CHANGE_DONE_TASK_STATUS", taskIndex);
				}
			}
		},
		async addTask({commit}, task){

			if (task !== ""){
				// add task to server
				try {
				const response = await axios.post(
					"http://localhost:3000/tasks",
					task
				);
				if (response.status !== 500) {
					commit("CREATE_TASK", response.data)
				
				} else {
					//alert("No se pudo crear la tarea")
					console.log("No se pudo crear la tarea")
				}
				
				} catch (err){
				console.log(err);
				}
			}
		},
		async deleteTask({commit, state}, {taskIndex, taskType}){
            let currentTask;
            
            if(taskType == "NEW"){
                currentTask = state.createdTaskList[taskIndex].id
            } else {
                currentTask = state.doneTaskList[taskIndex].id
            }

            const response = await axios.delete(
                `http://localhost:3000/tasks/${currentTask}`
            )
    
            if (response.status != 500) {
                if (taskType === "NEW") {
					commit("DELETE_NEW_TASK", taskIndex);
				} else {
					commit("DELETE_DONE_TASK", taskIndex);
				}
            }
        }
		
	
	};

	const mutations = {
		SET_CREATED_TASKS(state, newTaskList) {
			state.createdTaskList = newTaskList;
		},
		SET_DONE_TASKS(state, newTaskList) {
			state.doneTaskList = newTaskList;
		},
		CHANGE_NEW_TASK_STATUS(state, taskIndex) {
			state.createdTaskList[taskIndex]['status'] = "DONE";
			state.doneTaskList.push(state.createdTaskList[taskIndex]);
			state.createdTaskList.splice(taskIndex, 1);
		},
		CHANGE_DONE_TASK_STATUS(state, taskIndex) {
			state.doneTaskList[taskIndex]['status'] = "NEW";
			state.createdTaskList.push(state.doneTaskList[taskIndex]);
			state.doneTaskList.splice(taskIndex, 1);
		},
		CREATE_TASK(state, task){
			if(task.status === "NEW"){
				state.createdTaskList.push(task);
			}else{
				state.doneTaskList.push(task);
			}
		},
		DELETE_NEW_TASK(state, taskIndex){
            state.createdTaskList.splice(taskIndex, 1);
        },
        DELETE_DONE_TASK(state, taskIndex){
            state.doneTaskList.splice(taskIndex, 1);
			///sksdadsadsamdoo
        }


	};

	export default {
		namespaced: true,
		state : {
			...state
		},
		getters: {
			...getters
		},
		actions: {
			...actions
		},
		mutations: {
			...mutations
		}
	}
