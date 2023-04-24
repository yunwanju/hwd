<template>
    <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import resize from "@/components/mixins/resize";

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: "chart",
        },
        id: {
            type: String,
            default: "chart",
        },
        title: {
            type: String,
            default: "制度状态",
        },
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "100%",
        },
        chartData: {
            type: Array,
            default: function () {
                return [];
            },
        },
    },
    data() {
        return {
            chart: null,
        };
    },
    watch: {
        chartData: {
            handler: function (newData, oldData) {
                this.$nextTick(() => {
                    var data = this.child(newData);
                    this.initChart(data);
                });
            },
            deep: true,
        },
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    mounted() {
        this.initChart(this.chartData);
        var that = this;
        this.chart.on("click", function (params) {
            that.$emit("lineClick", params);
        });
    },
    methods: {
        child(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].isSelect && data[i].children) {
                    return data[i].children;
                } else if (data[i].isSelect && !data[i].children) {
                    return [data[i]];
                } else if (!data[i].isSelect && data[i].children) {
                    return this.child(data[i].children);
                }
            }
            return data;
        },
        initChart(data) {
            var that = this;
            let xAxisData = [],
                seriesData = [];
            data.forEach((item) => {
                xAxisData.push(item.label);
                seriesData.push(item.count);
            });
            this.chart = echarts.init(document.getElementById(this.id));
            this.chart.setOption({
                color: ["#85CAF5"],
                title: {
                    text: that.title,
                    left: "0",
                    textStyle: {
                        fontSize: 16,
                    },
                },
                tooltip: {
                    trigger: "item",
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        inverse: true,
                        type: "category",
                        data: xAxisData.slice(0, 8),
                        axisLine: {
                            lineStyle: {
                                color: "#c0c0c0",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        name: '年份',
                        nameLocation:'start'
                    },
                ],
                yAxis: [
                    {
                        axisLine: {
                            lineStyle: {
                                color: "#c0c0c0",
                            },
                        },
                        axisTick: {
                            show: false,
                        },
                        splitLine: {
                            show: false,
                        },
                        type: "value",
                        name: '数量',
                    },
                ],
                series: [
                    {
                        data: seriesData.slice(0, 8),
                        type: "line",
                    },
                ],
            });
        },
    },
};
</script>
