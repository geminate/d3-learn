<template>
    <div class="data-bind"></div>
</template>

<script>
    import * as d3 from 'd3';

    export default {
        name: 'DataBind',
        mounted() {
            const data = [1, 2, 3];

            const p = d3.select(this.$el)
                .selectAll("p")
                .data(data)
                .enter()
                .append("p")
                .text((item, i) => {
                    console.log(item + "/" + i);
                    return item;
                });
        }
    }
</script>

<style lang="less" scoped>

</style>