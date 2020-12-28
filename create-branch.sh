#!/bin/sh

#获取当前执行脚本路径
# dir=`pwd`

# project="project"

# #git clone 地址
# gitcloneurl="https://github.com/AUW-su/project-test.git"


fulltime=`date +%Y%m%d%H%m%s`
# echo ${fulltime}

#你的本地分支名称，分支名就是用的就是创建分支的时间
feature=$fulltime
echo $feature

# #删除目录,为新建目录做准备
# rm -rf "${project}" 

# mkdir "$dir"/"${project}"

# cd "$dir"/"${project}"

# git clone "$gitcloneurl"

git checkout master

git pull

#从master新建本地分支
git checkout -b "$feature"

#git push,创建远程分支
git push origin "$feature":"$feature"

# #将新创建的分支信息推送到github
# git push origin HEAD -u

# #建立本地分支与远程分支的关联关系,为push做准备
git branch --set-upstream-to=origin/"$feature"

echo "OK, you can write code ..."