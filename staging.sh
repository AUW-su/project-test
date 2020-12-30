#!/bin/sh

# export NODE_OPTIONS="--max-old-space-size=4096"
set -e

git pull

# #获取当前执行脚本路径
dir=`pwd`

# #上一级目录
path=$(dirname "$dir")

rm -rf $path/node_modules

export NODE_VERSION=10.15.0
# export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node

. ~/.nvm/nvm.sh

nvm install ${NODE_VERSION}
NPM="nvm exec 10.15.0 npm"

${NPM} install --registry https://registry.npm.taobao.org
# # ${NPM} run eslint
${NPM} run build

GIT_STATUS=`git status`
echo ${GIT_STATUS};

# 判断时候有需要提交的文件的文件
if [[ "${GIT_STATUS}" == *"nothing to commit"* ]]; then
    echo "没有可提交的内容";
else
    git add $path/dist
    # git add ./manifest.json
    git commit --no-verify -m "auto commit build_files";
    git push
fi

#复制需要的文件到staging（预发）文件夹下
path1=$(dirname "$path")
# echo $path1

path2=$(dirname "$path1")
# echo $path2

cp -R $path/dist $path2/staging/project-test/

cp -R $path/src $path2/staging/project-test/

#重启预发服务（9081）
# pm2 reload staging

echo "预发布完成"

echo $(date +"%Y-%m-%d %H:%M:%S") "预发布完成" >> $path/test.log
