#!/bin/sh

set -e

# #获取当前执行脚本路径
dir=`pwd`

# #上一级目录
path=$(dirname "$dir")

#复制需要的文件到staging（预发）文件夹下
path1=$(dirname "$path")
# echo $path1

path2=$(dirname "$path1")
# echo $path2

cp -R $path/dist $path2/staging/project-test/

cp -R $path2 $path2/staging/project-test/

#重启正式服务（9080）
pm2 reload production

echo "正式发布完毕"