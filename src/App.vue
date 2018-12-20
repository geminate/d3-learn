<template>
    <div class="page-container">
        <nav>
            <router-link to="dataBind">1. 数据绑定</router-link>
            <router-link to="DataSvg">2. 数据与SVG绑定</router-link>
        </nav>
        <main>
            <router-view/>
        </main>
    </div>

</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="less">
    @import '../static/css/reset.css';

    * {
        box-sizing: border-box;
    }

    .page-container {
        display: flex;
        width: 100vw;
        height: 100vh;
    }

    nav {
        flex: 0 1 auto;
        border-right: 1px solid #EFEFEF;
        overflow: auto;

        a {
            display: block;
            margin-bottom: 10px;
            color: #333;
            text-decoration: none;
            padding: 15px;

            &.active {
                text-decoration: none;
                background: #EFEFEF;
            }
        }
    }

    main {
        flex: 1 1 auto;
        padding: 20px;
    }
</style>
