<template>
    <div class="barFrame">
        <div class="title-sub">{{title}}</div>
        <ul>
            <li v-for="(item,index) in tableData" :key="index" @click="chartsClick(item)">
                <strong>{{item.label}}</strong>
                <div class="columnar">
                    <span class="green-darker" :style="{'width':bgWidth(item.count)}"></span>
                </div>
                <span class="number">
                    <i class="c-icon c-time"></i>
                    {{item.count}}
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        total: {
            //总数
            type: Number,
            default: 0,
        },
        totalData: {
            //数据
            type: Array,
            default: [],
        },
        title: {
            //标题
            type: String,
            default: "",
        },
    },
    data() {
        return {
            overallRank: [],
        };
    },
    methods: {
        chartsClick(item) {
            this.$emit("chartsClick", item);
        },
    },
    computed: {
        bgWidth: function () {
            var total = this.total;
            return function (count) {
                return (count / total) * 100 + "%";
            };
        },
        tableData: function () {
            var totalData = this.totalData;
            var arr = [],
                flag = false;
            function child(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].isSelect && data[i].children) {
                        return data[i].children;
                    } else if (data[i].isSelect && !data[i].children) {
                        return [data[i]];
                    } else if (!data[i].isSelect && data[i].children) {
                        return child(data[i].children);
                    }
                }
                return data;
            }
            arr = child(totalData).slice(0, 8);
            return arr;
        },
    },
    mounted() {},
};
</script>

<style scoped>
.barFrame ul li {
    letter-spacing: 0;
    margin-bottom: 15px;
    padding-right: 80px;
    position: relative;
    cursor: pointer;
}
.barFrame .title-sub {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
}
.barFrame ul li strong {
    font-size: 12px;
    color: #666;
    font-weight: normal;
    display: block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 5px;
}
.barFrame ul li .columnar {
    font-size: 0;
    height: 13px;
    background: #f1f1f1;
    position: relative;
    overflow: hidden;
}
.barFrame ul li .number {
    font-size: 12px;
    color: #666;
    font-style: normal;
    text-align: left;
    display: inline-block;
    width: 70px;
    position: absolute;
    right: 0;
    bottom: -2px;
}
.barFrame ul li .columnar span.green-darker {
    background: #006F6B;
    display: inline-block;
    height: 100%;
    overflow: hidden;
}
.barFrame ul li .columnar span.green-darker:hover {
    background: #9dd4f7;
}
</style>
