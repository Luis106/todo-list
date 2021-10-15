import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import tasks from "@/store/modules/task.store"

export default new Vuex.Store({
    stat:{},
    mutations:{},
    modules:{
        tasks: tasks
    },
})

