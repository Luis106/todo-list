import axios from "axios";

const state = {
    createdTaskList: [],
    doneTaskList: []

};



const getters = {
    getCreatedTasks: (state) => state.createdTaskList,
    getDoneTasks: (state) => state.doneTaskList
};



const actions = {

    async getAllTasks({commit}, taskType) {
        try {
            const response = await axios.get(`http://localhost:3000/tasks?status=${taskType}`);

            console.log(taskType)
            console.log(response.data)

            if (response.data) {
                if(taskType === "NEW"){
                    commit('SET_TASK_LIST', response.data)
                }else{
                    commit('SET_DONE_LIST', response.data)
                }
               
            }
        } catch (err) {
            console.log(err);
        }
    }


};



const mutations = {

    SET_TASK_LIST(state, newTaskList, ) {
        state.createdTaskList = newTaskList;
    },

    SET_DONE_LIST(state, newTaskList) {
        state.doneTaskList = newTaskList;
    }

};

export default {

    namespaced: true,

    state: {
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