<template>
    <div id="app">
        <headerNav></headerNav>
        <sider-nav></sider-nav>
        <router-view/>

    </div>
</template>

<script>
    import Header from './components/nav/Header'
    import Sider from './components/nav/Sider'
    export default {
        name: 'App',
        components: {
            headerNav: Header,
            siderNav: Sider
        }
    }
</script>

<style>

</style>
