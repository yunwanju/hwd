import { mapGetters } from "vuex";

export default {
    computed: {
        ...mapGetters(["listJson","activeIndex","activeListType","list_data"]),
        listData(){
            const data = this.list_data[this.activeListType][this.activeIndex]||this.list_data[this.activeListType];
            return data;
        }
    },
    methods: {
        getMergeData(data) {
            this.$store.dispatch("store/setListJson", {
                ...this.listJson,
                ...data,
            });
            this.$store.dispatch("search/search", this.listJson);

        }
    }
}