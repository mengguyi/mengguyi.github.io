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

一般来说现在的主板都可以不用进入BIOS而快速地切换启动顺序，只要找到相应的快捷键就可以了。

### 进入U盘下的Linux系统
按上一步设置好启动顺序，启动之后会看到如下界面（UEFI启动方式的界面可能不同）：
![图片：启动界面-Windows](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/technology/ArchLinux%E5%AE%89%E8%A3%85/%E5%90%AF%E5%8A%A8%E7%95%8C%E9%9D%A2(uefi).png?raw=true)

&ensp;&ensp;&ensp;&ensp;&ensp;如果直接进入<code>windows</code>，请检查启动顺序是否设置成功，U盘是否在制作启动介质时成功写入。

&ensp;&ensp;&ensp;&ensp;&ensp;如果没有看到这个界面，请检查U盘是否制作成功，如果多次遇到问题可以考虑换一个U盘。

&ensp;&ensp;&ensp;&ensp;&ensp;选择第一个选项。进入系统

这时Arch开始加载，你将会看到屏幕显示如下内容：
![图片：启动中界面-Windows](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/technology/ArchLinux%E5%AE%89%E8%A3%85/%E5%90%AF%E5%8A%A8%E4%B8%AD%E7%95%8C%E9%9D%A2(uefi).png?raw=true)

加载完成后你将会进入一个有终端的界面：
![图片：启动完成-Windows](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/technology/ArchLinux%E5%AE%89%E8%A3%85/%E5%90%AF%E5%8A%A8%E5%AE%8C%E6%88%90(uefi).png?raw=true)

&ensp;&ensp;&ensp;&ensp;&ensp;如果出现FAIL或是其他错误信息导致无法启动请自行搜索错误信息来获得解决方法。

&ensp;&ensp;&ensp;&ensp;&ensp;这就是<code>Linux</code>的终端界面了，接下来我们将通过在这个界面执行一系列命令来将Arch安装到我们的磁盘上。

下面进行的过程是按照官方[Installation guide](https://wiki.archlinux.org/title/installation_guide_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))为依据进行的，出现的任何问题都可以到链接中的相应部分查找原文找到解决方式。

### 检查引导方式

目前的引导方式主要分为EFI引导+GPT分区表与BIOS(LEGACY)引导+MBR分区表两种，几乎比较新的机器都采用了EFI/GPT引导的方式。关于这部分的内容如果有兴趣可以通过这个链接进行了解：

[http://www.360doc.com/content/18/0208/23/35835282_728717724.shtml](http://www.360doc.com/content/18/0208/23/35835282_728717724.shtml)

如果你不知道自己的引导方式，请在终端下执行以下命令：

<code>ls /sys/firmware/efi/efivars</code>

这里的ls是命令，空格后面的一串为路径，作为ls命令的参数。ls命令的作用是显示路径目录下的所有的文件（夹）。

如果你对命令行下的常用操作（TAB补全、取消命令等）不熟悉，请先学习了解下面部分实用的快捷键或命令：

Tab键 命令行自动补全。键入命令或文件名的前几个字符，然后按 [Tab] 键，它会自动补全命令或显示匹配你键入字符的所有命令

↑(Ctrl+p) 显示上一条命令

↓(Ctrl+n) 显示下一条命令

Ctrl-C: 终止当前正在执行的命令

输入命令并回车执行后，如果提示

<code>ls: cannot access '/sys/firmware/efi/efivars': No such file or directory</code>

表明你是以<code>BIOS</code>方式引导，否则为以<code>EFI</code>方式引导。现在只需要记住这个信息，之后这两种引导类型的安装方式会略有不同（下文中涉及到不同的地方请仔细区别）。

### 联网

<code>archlinux</code>并不能离线安装，因为我们需要联网来下载需要的组件，所以我们首先要连接网络。

&ensp;&ensp;&ensp;&ensp;&ensp;如果你是有线网并且路由器支持DHCP的话插上网线后先执行以下命令获取IP地址：

&ensp;&ensp;&ensp;&ensp;&ensp;<code>dhcpcd</code>

&ensp;&ensp;&ensp;&ensp;&ensp;然后执行以下命令来判断网络连接是否正常：

&ensp;&ensp;&ensp;&ensp;&ensp;<code>ping www.baidu.com</code>

如果可以看到类似下面的内容就说明连上了网络：

![图片：准备磁盘-Windows](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/technology/ArchLinux%E5%AE%89%E8%A3%85/ping%E7%99%BE%E5%BA%A6.png?raw=true)

再次提示用快捷键Ctrl-C可以终止当前正在执行的命令

如果你是无线网，请执行以下命令：

&ensp;&ensp;&ensp;&ensp;&ensp;<code>iwctl</code>

&ensp;&ensp;&ensp;&ensp;&ensp;<code>device list</code>

会列出当前可用的所有网卡设备，如图所示：

