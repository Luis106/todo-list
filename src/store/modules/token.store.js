import axios from "axios";
	

	const state = {
		token : String
	
	};
	const getters = {
		getToken: (state) => state.token,
	
	};
	const actions = {
		async getToken({commit}) {
			
			try {
				
				const response = await axios.get(
					`http://localhost:3000/auth/sing`,
				
				);
                console.log("Token")
				console.log(response.data);

				if (response.data){
				
					commit('SET_TOKEN', response.data);
				}

			}catch (err) {
				console.log(err);
			}
		},

	
		
	
	};

	const mutations = {
		SET_TOKEN(state, token) {
			state.token = token.jwt;
			console.log(state.token)
			
		},
	

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
