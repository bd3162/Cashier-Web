import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // init the state
        step: 1,
        // 1: take a shot ;
        // 2. check the shopping list
        // 3. all done, ready for next customer
        member:false,
        face_id : 'A101DY98ITQ39J',
        verification: '',
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
        GET_FACE_ID (state, faceid) {
            state.face_id = faceid;
        },
        CHANGE_MEMBER (state, membered) {
            state.member = membered;
        },
        CHANGE_STEP (state, step) {
            state.step = state;
        },
        GET_VERIF (state, verif) {
            state.verification = verif;
        }
    },
    actions: {
        // commit state changes
        getFaceid (context, faceid) {
            context.commit('GET_FACE_ID', faceid)
        },
        changeMember (context, membered) {
            context.commit('CHANGE_MEMBER', membered)
        },
        changeStep (context, step) {
            context.commit('CHANGE_STEP', step)
        },
        getVerif (context, verif) {
            context.commit('GET_VERIF', verif)
        }
    }
})
