# web第七题

这道题是禁用JavaScript即可解决

按F12查看源代码

发现页面不停刷新，根本看不了

![图片](https://github.com/mgy-qyqf/mgy-qyqf.github.io/blob/main/logs/ctf/web6_1.png?raw=true)

禁用JavaScript

在Firefox地址栏中输入<code>about:config</code>

点击接受风险并继续

在搜索地址栏中输入javascript.enabled

点击右侧的切换按钮将<code>true</code>改为<code>false</code>

完成
