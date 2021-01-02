### 1、实践内容
（1）申请一台阿里云服务器（centos7）；

（2）搭建好nginx/nodejs环境；

（3）通过nginx做流量分发，分发到四个nodejs服务（以不同的目录区分），分别是：

    80端口：正式线上服务； http://test2.xiaohuangren.top/

    81端口：预发服务； http://test2.xiaohuangren.top/    document.cookie=“project=myproject”

    82端口：本地服务； http://test2-dev.xiaohuangren.top/

    83端口：一个做预发/正式发布的管理平台；http://test2-manage.xiaohuangren.top/

    // 备注：
    // 80、81、82的服务运行的是一个h5页面（包含html/css/js）；
    // 83的服务是一个pc页面，有三个按钮（创建git分支/预发布/正式发布），创建或发布成功后把当前日志打印出来；

（4）预发服务需要配置cookie（可以自定义key和value）才能访问，在nginx里做配置；

（5）通过github创建一个仓库，然后clone到服务器上(仓库包含四个服务，同时ignore把node_modules忽略掉)；

（6）用webpack完成构建、编译、打包流程；

（7）用shell脚本完成自动化发布流程，分别为：

    创建git分支：git pull（暂时不考虑解决冲突的问题） → git checkout -b [分支号]

    预发布（81端口）：git pull → npm版本设置 → npm包删除 → npm install → npm run build → 拷贝文件  重启node服务（81端口）

    正式发布（80端口）：文件拷贝 →  重启node服务（81端口） → 合并git分支到master（暂时不考虑解决冲突的问题）
