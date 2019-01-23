<template>
    <div class="page-container">
        <nav>
            <router-link to="dataBind">1. 数据绑定</router-link>
            <router-link to="dataSvg">2. 数据与SVG绑定</router-link>
            <router-link to="staticBarChart">3. 基本静态柱状图</router-link>
            <router-link to="dynamicBarChart">4. 基本动态柱状图</router-link>
            <router-link to="staticLineChartPage">5. 基本静态折线图</router-link>
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

    .d3-tip {
        line-height: 1;
        padding: 8px;
        background: rgba(0, 0, 0, 0.2);
        color: #fff;
        border-radius: 8px;
        font-size: 14px;
    }

    .d3-tip:after {
        box-sizing: border-box;
        display: inline;
        font-size: 10px;
        width: 100%;
        line-height: 1;
        color: rgba(0, 0, 0, 0.2);
        content: "\25BC";
        position: absolute;
        text-align: center;
    }

    .d3-tip.n:after {
        margin: -3px 0 0 0;
        top: 100%;
        left: 0;
    }
</style>
