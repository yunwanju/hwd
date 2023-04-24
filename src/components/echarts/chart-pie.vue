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
            that.$emit("pieClick", params.data);
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
            var colors = [
                "#5182E4",
                "#F88D48",
                "#51B4F1",
                "#F35352",
                "#F7CB4A",
                "#4a5bdc",
                "#4cd698",
                "#f4914e",
                "#fcb75b",
                "#ffe180",
                "#b6c2ff",
                "#96edc1",
            ];
            let obj = {},
                newData = [];
            data.forEach((item) => {
                obj = {};
                obj.name = item.label;
                obj.value = item.count;
                obj.key = item.value;
                obj.isSelect = item.isSelect;
                obj.children = item.children;
                obj["sort"] = item["sort"];
                newData.push(obj);
            });
            this.chart = echarts.init(document.getElementById(this.id));
            this.chart.setOption({
                color: colors,
                title: {
                    text: that.title,
                    left: "0",
                    textStyle: {
                        fontSize: 16,
                    },
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: newData
                },
                tooltip: {
                    trigger: "item",
                },
                grid: {
                    left: "10%",
                    right: "5%",
                    containLabel: true,
                },
                series: [
                    {
                        type: "pie",
                        radius: "55%",
                        clockwise: true,
                        avoidLabelOverlap: true,
                        center: ['50%', '50%'],
                        startAngle: 130,
                        label: {
                            show: true,
                            position: "outside",
                            formatter: "{b}\n{d}%",
                        },
                        labelLine: {
                            normal: {
                                length: 20,
                                length2: 20,
                                lineStyle: {
                                    width: 2,
                                },
                            },
                        },
                        data: newData.slice(0, 8),
                    },
                ],
            });
        },
    },
};
</script>
