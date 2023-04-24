<template>
    <div class="mod-side-bar" ref="modSideBar">
        <ul>
            <li v-show="showIt" class="gotop" title="返回顶部">
                <a href="javascript:void(0);" @click="goBacktoTop">
                    <i class="c-icon c-gotop"></i>返回顶部
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { moveAll } from "../../utils/util";
export default {
    data() {
        return {
            showIt: false,
        };
    },
    methods: {
        goBacktoTop: function () {
            moveAll(document.getElementById("app"), {
                scrollTop: 0,
            });
        },
        showBackTopPos: function () {
            let winWith = document.documentElement.clientWidth;
            if (winWith <= 1300) {
                this.$refs["modSideBar"].style.right = "0px";
            } else if (winWith > 1200) {
                let gap = Math.floor((winWith - 1282) / 2);
                this.$refs["modSideBar"].style.right = gap + "px";
            }
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.showBackTopPos();
        });
        let _this = this;
        document.getElementById("app").addEventListener("scroll", function () {
            if (this.scrollTop > 400) {
                _this.showIt = true;
            } else {
                _this.showIt = false;
            }
        });
    },
};
</script>

<style scoped>
.mod-side-bar {
    width: 49px;
    position: fixed;
    bottom: 20px;
    right: 0px;
    z-index: 999;
}

.gotop {
    margin-bottom: 6px;
    height: 49px;
}

.gotop > a {
    font-size: 12px;
    color: #fff;
    text-align: center;
    padding: 8px;
    height: 33px;
    width: 33px;
    vertical-align: top;
    position: relative;
    display: inline-block;
    text-decoration: none;
    background: #006F6B;
    border: 1px solid #006F6B;
}

.gotop>a>.c-icon {
    display: none;
    position: relative;
}

.gotop> a .c-icon.c-gotop {
    width: 21px;
    height: 13px;
    background-position: -360px -256px;
    top: 18px;
    left: 14px;
}

.gotop> a:hover {
    color: #fff;
    background: #006F6B;
    border: 1px solid #006F6B;
}

</style>
