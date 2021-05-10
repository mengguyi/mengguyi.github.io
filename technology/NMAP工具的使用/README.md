nmap是常用的Web攻防相关的使用工具，这篇日志文章，梳理透彻关于「nmap」工具的所用常用功能

## 关于NMAP

Nmap是一款针对大型网络的端口扫描工具端口扫描工具,它也适用于单机扫描,它支持很多扫描，也同时支持性能和可靠性统计，Namp是可以免费下载的，是在免费软件基金会的GNU General Public License (GPL)下发布的）

Nmap是一款针对大型网络的端口扫描工具，尽管它也适用于单机扫描。在不同情况下，你可能需要隐藏扫描、越过防火墙扫描或者使用不同的协议进行扫描，比如：UDP、TCP、ICMP 等）。它支持：Vanilla TCP connect 扫描、TCP SYN（半开式）扫描、TCP FIN、Xmas、或NULL（隐藏）扫描、TCP ftp代理（跳板）扫描、SYN/FIN IP 碎片扫描（穿越部分数据包过滤器）、TCP ACK和窗口扫描、UDP监听ICMP端口无法送达扫描、ICMP扫描（狂ping）、TCP Ping扫描、直接RPC扫描（无端口映射）、TCP/IP指纹识别远程操作系统，以及相反身份认证扫描等。Nmap同时支持性能和可靠性统计，例如：动态延时计算，数据包超时和转发，并行端口扫描，通过并行ping侦测下层主机。该版本需要Winpcap V2.1 以上支持。（来自百度百科）

## 常用功能合集

[整理By：不断同学](https://github.com/buduan)

## IP扫描

ip扫描前，可以先<code>ifconfig</code>看一下自己的ip段

<code>nmap -sn 192.168.0.0/24(IP段)</code>扫描指定网段内所有IP地址(ping)
