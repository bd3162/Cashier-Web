import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // init the state
        step: 3,
        // 1: take a shot ;
        // 2. register as a member
        // 3. check the shopping list
        // 4. all done, ready for next customer
        member: false,
        face_id : '',
        verification: '1234',
    },
    getters: {
        // each component can access state via getters
        showStep (state) {
            return state.step;
        },
        showFaceid (state) {
            return state.face_id;
        },
        showVerif (state) {
            return state.verification;
        },
    },
    mutations: {
        // handle the state
        showFaceID (state, msg) {
            state.face_id = msg;
        }
    },
    actions: {
        // commit state changes

    }
})