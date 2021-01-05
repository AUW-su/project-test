<template>
    <div class="wrapper">
        <div class="build-btns">
            <div class="btn" @click="createBranch">创建git分支</div>
            <div class="btn btn-1" @click="staging">预发布</div>
            <div class="btn btn-1" @click="production">正式发布</div>
        </div>
        <div class="cache-config">
            <div class="config">
                <div class="time-text">设置强缓存时间：</div> 
                <input  placeholder="请输入时间/秒" class="input" v-model="cache1"/>
                <div class="time-btn" @click="setCacheTime1">提交</div>
            </div>
            <div class="config">
                <div class="time-text">设置cdn缓存时间：</div> 
                <input  placeholder="请输入时间/秒" class="input" v-model="cache2"/>
                <div class="time-btn">提交</div>
            </div>
            <div class="config">
                <div class="time-text">设置协商缓存时间：</div> 
                <input  placeholder="请输入时间/秒" class="input" v-model="cache3"/>
                <div class="time-btn">提交</div>
            </div>
        </div>
        
        
    </div>
</template>
<script>
import {AjaxClient} from 'ajax-client'

export default {
    data() {
        return {
            branchName: '',
            ableCreateBranch: true,
            ableStaging: true,
            ableProduction: true,
            cache1: '', // 强缓存时间
            cache2: '', // cdn缓存时间
            cache3: '', // 协商缓存时间
            ableCache1: true,
            ableCache2: true,
            ableCache3: true,
        }
    },
    methods: {
        createBranch() {
            console.log('createBranch')
        
            if (this.ableCreateBranch) {
                this.ableCreateBranch = false;
                var ws = new WebSocket("ws://localhost:10000/create");

                ws.onopen = (evt) => { 
                    console.log("Connection open ..."); 
                    ws.send("正在创建新分支～");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: ");
                    console.log(evt.data)
                    ws.close();
                };

                ws.onclose = (evt) => {
                    console.log("Connection closed.");
                    this.ableCreateBranch = true;
                };      
            }
        },
        staging() {
            console.log('staging')
            if (this.ableStaging) {
                this.ableStaging = false;
                var ws = new WebSocket("ws://localhost:10000/staging");

                ws.onopen = (evt) => { 
                    console.log("Connection open ..."); 
                    ws.send("正在预发布～");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: ");
                    console.log(evt.data)
                    ws.close();
                };

                ws.onclose = (evt) => {
                    console.log("Connection closed.");
                    this.ableStaging = true;
                };      
            }
        },
        production() {
            console.log('production')
            if (this.ableProduction) {
                this.ableProduction = false;
                 var ws = new WebSocket("ws://localhost:10000/production");

                ws.onopen = (evt) => { 
                    console.log("Connection open ..."); 
                    ws.send("正在正式发布～");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: ");
                    console.log(evt.data)
                    ws.close();
                };

                ws.onclose = (evt) => {
                    console.log("Connection closed.");
                    this.ableProduction = true;
                };      
            }
        },
        setCacheTime1() {
            console.log('setCacheTime1')

            if (this.ableCache1) {
                this.ableCache1 = false;
                const ajax = new AjaxClient();
                const data = {
                    time: this.cache1 || 0,
                }
            
                ajax.postAsync({
                    // url: 'http://112.124.201.59:10000/cache1',
                    url: 'http://localhost:10000/cache1',
                    headers: {
                        'X-Original-Header1': 'header-value-1',
                        'X-Original-Header2': 'header-value-2',
                    },
                    contentType: 'application/json; charset = UTF-8',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: response => {
                        this.ableCache1 = true;
                        console.log('success')
                        console.log(response);
                    },
                    error: e => {
                        this.ableCache1 = true;
                        console.log('error')
                        console.error(e);
                    },
                });
            }
        }
    }
}
</script>
<style>
.wrapper {
    padding: 20px;
    font-size: 24px;
    line-height: 30px;
    color: #353535;
}
.build-btns {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 20px;
    border-bottom: 1px solid #5f5f5f;
}
.btn {
    width: 200px;
    font-size: 24px;
    line-height: 60px;
    color: #353535;
    text-align: center;
    border: 1px solid #353535;
    border-radius: 12px;
}
.btn-1 {
    margin-left: 20px;
}
.cache-config {
    margin-top: 20px;
    border-bottom: 1px solid #5f5f5f;
}
.config {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 20px;
}
.time-text {
    width: 218px;
}
.input {
    margin-right: 8px;
    width: 180px;
    height: 40px;
    text-align: center;
    /* border-radius: 4px; */
}
.time-btn {
    width: 80px;
    font-size: 24px;
    line-height: 40px;
    color: #353535;
    text-align: center;
    border: 1px solid #353535;
    border-radius: 12px;
}
</style>