<template>
    <div>
        <Shot v-if="readyToSnap"></Shot>
        <Cash v-if="readyToCheck"/>
    </div>
</template>

<script>
    import Shot from './Shot'
    import Cash from './Cash'

    export default {
        name: "flow",
        components: {
            Shot,
            Cash,
        },
        data () {
            return {

            }
        },
        computed: {
            readyToCheck () {
                let i = this.$store.getters.showStep;
                if (i == 3) {
                    return true;
                }
                else {
                    return false;
                }
            },
            readyToSnap () {
                let i = this.$store.getters.showStep;
                if (i == 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>