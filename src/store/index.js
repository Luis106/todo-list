import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules import
import tasks from '@/store/modules/tasks.store';
import auth from '@/store/modules/auth.store';
import token from '@/store/modules/token.store';

export default new Vuex.Store({
	state: {},
	mutations: {},
	modules: {
		tasks: tasks,
		auth: auth,
		token: token
		
	}
})
