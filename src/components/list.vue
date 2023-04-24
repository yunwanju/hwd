<template>
    <div class="list_detail">
        <template v-for="(obj,j) in list">
            <li :key="j">
                <listDetail
                    v-if="obj !== null && Object.keys(obj).length !== 0"
                    :item="obj"
                    :indexJ="j"
                    :label="label"
                ></listDetail>
            </li>
        </template>
    </div>
</template>
<script>
import listDetail from "./list_detail";
export default {
    name: "list",
    components: { listDetail },
    props: ["num", "list", "label", "type"],
    data() {
        return {
        };
    },
};
</script>