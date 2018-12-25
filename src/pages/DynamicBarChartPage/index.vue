<template>
    <div>
        <dynamic-bar-chart :data="data" width="80vw" height="80vh"></dynamic-bar-chart>
    </div>
</template>

<script>
    import DynamicBarChart from '@/components/DynamicBarChart';

    export default {
        components: {DynamicBarChart},
        data() {
            return {
                data: []
            }
        },
        methods: {
            initData() {
                const val = [new Date().getTime(), Math.random(0, 1)];
                this.data.push(val);
                if (this.data.length >= 15) {
                    this.data.shift();
                }
            }
        },
        mounted() {
            this.initData();
            setInterval(() => {
                this.initData();
            }, 1000);
        }
    }
</script>

<style lang="less" scoped>

</style>