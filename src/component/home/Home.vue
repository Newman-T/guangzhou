<template>
    <div>
        <el-rate v-model="value3" show-text></el-rate>
        <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                value3:null,
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                },
                value1: '',
                value2: '',
            }
        }
    }
</script>

<style scoped>

</style>