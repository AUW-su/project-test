<template>
    <div class="wrapper">
        <div class="text">距离<span class="notice">分享结束</span>还有：</div> 
        <count-down :countDownTime="time"></count-down>
    </div>
</template>
<script>
import CountDown from './count-down.vue';
export default {
    components: {
        CountDown
    },
    data() {
        return {
            time: 7234000,
        }
    }
}
</script>
<style>
.wrapper {
    padding: 20px;
}
.text {
    margin-bottom: 16px;
    font-size: 22px;
    color: #353535;
    line-height: 28px;
}
.notice {
    color: #e31436;
}
</style>