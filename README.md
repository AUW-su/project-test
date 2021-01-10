## 集群搭建+发布流程

（1）申请一台阿里云服务器（centos7），可以选用阿里云轻量应用服务器

（2）在服务器上搭建好nginx/nodejs环境，可以直接在阿里云搜索安装教程

（3）通过nginx做流量分发，分发到四个nodejs服务，分别是：

    线上页面 http://test2.xiaohuangren.top/ 由9080端口提供服务

    预发页面 http://test2.xiaohuangren.top/ 由9081端口提供服务，跟线上页面的区别在于cookie的命中

    本地页面 http://test2-dev.xiaohuangren.top/ 由9082端口提供服务

    管理页面，管理分支创建/预发发布/正式发布 http://test2-manage.xiaohuangren.top/ 由9083端口提供服务
    
    备注：
    1）9080、9081、9082的服务运行的是一个h5页面（包含html/css/js），用不同的文件夹来存放 本地/预发/线上页面 的内容
    2）9083的服务是一个pc页面，有三个按钮（创建git分支/预发布/正式发布），创建或发布成功后把当前日志打印出来；

（4）预发服务需要配置cookie（可以自定义key和value）才能访问，在nginx里做配置；

（5）通过github创建一个仓库，然后clone到服务器上(仓库包含四个服务，同时ignore把node_modules忽略掉)；

（6）用webpack完成构建、编译、打包流程；

（7）用shell脚本完成自动化发布流程，分别为：

    创建git分支脚本：git pull（暂时不考虑解决冲突的问题） → git checkout -b [分支号]

    预发布脚本：git pull → npm版本设置 → npm包删除 → npm install → npm run build → 拷贝文件到预发文件夹下  重启node服务（9081端口）

    正式发布脚本：文件拷贝到正式文件夹下 →  重启node服务（9080端口） → 合并git分支到master（暂时不考虑解决冲突的问题）

## 静态资源缓存+websocket