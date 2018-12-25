<template>
    <div>
        <svg :width="width" :height="height" ref="svg"></svg>
    </div>
</template>

<script>
    import dynamicBarChart from './dynamicBarChart';

    export default {
        name: 'DynamicBarChart',
        props: ["data", "width", "height"],
        mounted() {
            this.bar = new dynamicBarChart({svg: this.$refs.svg});
            this.bar.create(this.data);

            window.onresize = () => {
                this.bar.updateSvg(this.data);
            }
        },
        watch: {
            data() {
                this.bar.update(this.data);
            }
        }
    }
</script>

<style lang="less" scoped>
</style>