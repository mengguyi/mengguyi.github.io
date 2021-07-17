# 安装教程

本篇文章讲述安装<code>ArchLinux</code>并使读者可以在30分钟内完成安装。

## 前期准备

### 安装介质

U盘 光盘 网络启动 都可以，这里只讲述U盘安装方法

1.到[https://www.archlinux.org/download](https://www.archlinux.org/download)下找到China的像源，并下载<code>archlinux-**-x86_64.iso</code>推荐bfsu.edu.cn

2.刷写安装介质

&ensp;&ensp;&ensp;Linux:使用<code>dd</code>命令，教程:[https://www.runoob.com/linux/linux-comm-dd.html](https://www.runoob.com/linux/linux-comm-dd.html)

&ensp;&ensp;&ensp;Windows:使用rufus制作安装介质，官网:[https://rufus.ie/zh/](https://rufus.ie/zh/)

### 准备磁盘

&ensp;&ensp;&ensp;我们需要有一块空闲的磁盘区域来进行安装，这里的空闲指的是没有被分区的空间。下面来介绍如何准备这块空间。

&ensp;&ensp;&ensp;&ensp;&ensp;<code>windows</code>下空出一块分区来安装：利用windows自带的磁盘管理工具就可以：

![图片：准备磁盘-Windows](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/technology/ArchLinux%E5%AE%89%E8%A3%85/%E5%9B%BE%E7%89%87%EF%BC%9A%E5%87%86%E5%A4%87%E7%A3%81%E7%9B%98-Windows.png?raw=true)

&ensp;&ensp;&ensp;&ensp;&ensp;<code>linux</code>下分出一块区域安装：使用<code>fdisk</code>进行，教程请见链接中的删除分区：


&ensp;&ensp;&ensp;&ensp;&ensp;空闲的磁盘（新磁盘）：不需要进行任何操作。

### 安装

设置启动顺序

这一步在不同品牌的电脑上都不一样，所以需要大家自行搜索自己电脑品牌+启动顺序这个关键词来进行设置。

例如我的电脑搜索华为 启动顺序可以得到如下的结果：

[http://www.xitongcheng.com/jiaocheng/xtazjc_article_50133.html](http://www.xitongcheng.com/jiaocheng/xtazjc_article_50133.html)
