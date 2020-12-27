#!/bin/sh

git checkout master

git fetch

git pull

fulltime=`date +%Y%m%d%H%m%s`

# echo ${fulltime}

#你的本地分支名称，分支名就是用的就是创建分支的时间

feature=$fulltime

#从master新建本地分支

git checkout -b "$feature"

#git push,创建远程分支

git push origin "$feature":"$feature"

if [ $? -ne 0 ]; then

echo "git push 错误"

exit -1

fi

#建立本地分支与远程分支的关联关系,为push做准备

git branch --set-upstream-to=origin/"$feature"

#查看分支建立情况

git branch -vv

echo "OK, you can write code ..."