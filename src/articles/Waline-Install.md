---
cover: /assets/images/Waline-Install-cover.avif
title: Waline 独立安装教程
icon: comment
order: 2
category:
  - 使用指南
  - 教程
  - 网络
tag:
  - Linux
  - Git
  - Node.js
  - Debian
---

[Waline](https://waline.js.org) 是一款简洁、安全的评论系统。Waline 是一款从 Valine 衍生的带后端评论系统，可以理解为带后端的 Valine。Waline 提供了邮件通知、微信通知、评论后台管理、LeanCloud, MySQL, MongoDB, SQLite, PostgreSQL 多存储服务支持等诸多特性。

但是官方文档并没有很详细的讲述如何独立部署 Waline

本篇文章向你讲述如何通过源代码⽅式在 [Debian 12](https://www.debian.org) 上部署 Waline。

## 说明

本篇文章的所有命令都是默认你在 `root` 权限下执行的，如果你没有使用 `root` 请根据情况适当在命令前加上 `sudo`。

`waline` 服务端独立部署需要具备以下条件：

- 一台云服务器和安装好的数据库(例如：PostgreSQL)，其他数据库参考[多数据源参考](https://waline.js.org/guide/server/databases.html)

- Node.js环境安装配置，项目部署依赖 Node 环境，需要提前安装好环境。

## 准备环境

- 安装 Debian 12
- 安装 NPM
- 安装 PostgreSQL

````bash
apt install npm postgresql
````

## 开始安装

- 创建存放 waline 程序的文件夹

创建目录

````bash
mkdir -p /opt/waline
````

- 安装 waline

````bash
cd /opt/waline
npm install @waline/vercel
````

## 配置权限

- 创建 waline 用户并赋予 waline 权限

创建一个叫 `waline` 的用户并设置一个较强的密码

````bash
adduser waline
chown -R waline:waline /opt/waline
````

## 数据库配置

- 创建 waline 数据库

````bash
su - postgres
psql
CREATE USER waline;
CREATE DATABASE waline;
grant all privileges on database waline to waline;
alter database waline owner to waline;
exit; #退出 psql
exit #退出 postgres 用户
````

- 导入数据库表

下载 [waline.pgsql](https://github.com/walinejs/waline/blob/main/assets/waline.pgsql) 并复制内容

执行导入

````bash
su- waline
psql
\c waline
# 在这里粘贴 waline.pgsql 的内容然后按回车执行
# 您应该能看到这样的输出
# CREATE SEQUENCE
# CREATE TABLE
# CREATE SEQUENCE
# CREATE TABLE
# CREATE SEQUENCE
# CREATE TABLE
exit; # 退出 psql
exit #退出 waline 用户
````

## 服务配置

- 创建 systemd 服务

````bash
nano /usr/lib/systemd/system/waline.service
````

粘贴以下内容

````ini
[Unit]
Description=waline
After=network.target

[Service]
User=waline
Type=simple
WorkingDirectory=/opt/waline
ExecStart=/usr/bin/node /opt/waline/node_modules/@waline/vercel/vanilla.js
Environment="PG_HOST=/var/run/postgresql"
Environment="PG_PORT=5432"
Environment="PG_DB=waline"
Environment="PG_USER=waline"
Environment="PG_PREFIX=wl_"
Environment="SITE_NAME=MengGuyi's blog" # 改成你的网站名字
Environment="SITE_URL=https://blog.mengguyi.com" # 改成你的网站 URL
Environment="SECURE_DOMAINS=blog.mengguyi.com" # 改成你的网站域名
Environment="JWT_TOKEN=XGfqCGrfP6pkQDJW" # 自己生成一个 JWT TOKEN
Environment="AUTHOR_EMAIL=i@mengguyi.com" # 写你自己的 Email
Restart=on-failure

[Install]
WantedBy=multi-user.target
````

## 启动 Waline

使用 systemctl 启动它：

````bash
systemctl start waline.service
````

这个时候你再通过给 `waline` 加一个 `nginx` 反代就可以访问 Waline 了

![成功图片](/assets/images/Waline-Install-finish.avif)

## 参考文献

[Waline 官方文档](https://waline.js.org/guide/deploy/vps.html)

[Waline 服务端独立部署解决方案](https://anyfork.github.io/blog-docs/posts/other/walineServer.html)