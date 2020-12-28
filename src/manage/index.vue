<template>
    <div class="wrapper">
        <div class="creat-branch">
            <div class="btn" @click="createBranch">创建git分支</div>
            <!-- <input class="branch" type="text" v-model="branchName" placeholder="分支名"> -->
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
        }
    },
    methods: {
        createBranch() {
            // const client = new AjaxClient();
    
            // client.ajax({
            //     type: 'get',
            //     url: 'http://localhost:9999/create',
            //     headers: {
            //         'X-Original-Header1': 'header-value-1', //Additional Headers
            //         'X-Original-Header2': 'header-value-2',
            //     },
            //     contentType: 'application/json; charset = UTF-8',
            //     dataType: 'text', //data type to parse when receiving response from server
            //     timeoutMillis: 10000, //timeout milli-seconds
            //     success: (response, xhr) => {
            //          console.log('success')
            //          console.log(response)
            //     },
            //     error: (e, xhr) => {
            //         console.log('error')
            //         console.error(e);
            //     },
            //     timeout: (e, xhr) => {
            //         console.log('timeout')
            //         console.error(e);
            //     }
            // });

            const ajax = new AjaxClient();
            const data = {
                message: "hello"
            }
        
            ajax.postAsync({
                url: 'http://localhost:9999/test', //Endpoint
                headers: {
                    'X-Original-Header1': 'header-value-1', //Additional Headers
                    'X-Original-Header2': 'header-value-2',
                },
                contentType: 'application/json; charset = UTF-8', //content-type of sending data
                data: JSON.stringify(data), //text data
                dataType: 'json', //data type to parse when receiving response from server
                timeoutMillis: 10000, //timeout milli-seconds
                success: response => {
                    console.log('success')
                    console.log(response);
                },
                error: e => {
                    console.log('error')
                    console.error(e);
                },
                timeout: e => {
                    console.log('timeout')
                    console.error(e);
                }
            });
        },
        staging() {
            console.log('staging')

            const ajax = new AjaxClient();
            const data = {
                message: "hello"
            }
        
            ajax.postAsync({
                url: 'http://localhost:9999/staging', //Endpoint
                headers: {
                    'X-Original-Header1': 'header-value-1', //Additional Headers
                    'X-Original-Header2': 'header-value-2',
                },
                contentType: 'application/json; charset = UTF-8', //content-type of sending data
                data: JSON.stringify(data), //text data
                dataType: 'json', //data type to parse when receiving response from server
                timeoutMillis: 10000, //timeout milli-seconds
                success: response => {
                    console.log('success')
                    console.log(response);
                },
                error: e => {
                    console.log('error')
                    console.error(e);
                },
                timeout: e => {
                    console.log('timeout')
                    console.error(e);
                }
            });
        },
        production() {
            console.log('production')
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