<template>
    <div class="wrapper">
        <div class="creat-branch">
            <div class="btn" @click="createBranch">创建git分支</div>
        </div>
        
        <div class="btn btn-1" @click="staging">预发布</div>
        <div class="btn btn-1" @click="production">正式发布</div>
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
                    ws.send("Hello WebSockets!");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: " + evt.data);
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
                    ws.send("Hello WebSockets!");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: " + evt.data);
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
                    ws.send("Hello WebSockets!");
                };

                ws.onmessage = (evt) => {
                    console.log( "Client received Message: " + evt.data);
                    ws.close();
                };

                ws.onclose = (evt) => {
                    console.log("Connection closed.");
                    this.ableProduction = true;
                };      
            }
        },
    }
}
</script>
<style>
.wrapper {
    padding: 20px;
}
.creat-branch {
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
    margin-top: 20px;
}
.branch {
    margin-left: 20px;
}
</style>