---
title: GitHub + Hexo 打造个人网站详细过程
copyright: true
abbrlink: 26832
date: 2022-01-22 17:10:43
tags:
- Hexo
- Next
categories:
  - 网站搭建  
top: 9
description: 基于 Hexo 6.0.0 + hexo-theme-next 8.9.0 + GitHub Pages 搭建个人博客详细步骤。后期不定时更新...
---

GitHub + Hexo 打造个人网站详细过程

官方文档：https://hexo.io/zh-cn/docs/

# 前置环境准备

## 个人网站域名

这个完全看个人，可有可无的东西。本人就在阿里备案了一个 `.top` 的域名，比较便宜，10年189元。域名购买非常简单，备案比较麻烦。需要在阿里有台服务器进行绑定备案，耗时也比较久，大概20多天

## GitHub 创建个人仓库

登录到GitHub,如果没有GitHub帐号，使用你的邮箱注册GitHub帐号，点击GitHub中的New repository创建新仓库，仓库名应该为：`用户名.http://github.io` 这个用户名使用你的GitHub帐号名称代替，这是固定写法，比如我的仓库名为：`linxi37.github.io`。

## 安装 Git

什么是Git ?简单来说Git是开源的分布式版本控制系统，用于敏捷高效地处理项目。我们网站在本地搭建好了，需要使用Git同步到GitHub上。网上也能搜到基础知识。从 [Git 官网](https://git-scm.com/download/win)下载自己机器的位数进行安装。安装成功后，将你的 Git 与 GitHub 账号绑定，鼠标右击打开 Git Bash
![](https://pic3.zhimg.com/80/v2-8b1cbe253d6e0301bd9a68c6f98a9f52_720w.jpg)

或者在菜单里搜索Git Bash，设置user.name和user.email配置信息：

```
git config --global user.name "你的GitHub用户名"
git config --global user.email "你的GitHub注册邮箱"
```

生成ssh密钥文件：

```
ssh-keygen -t rsa -C "你的GitHub注册邮箱"
```

然后直接三个回车即可，默认不需要设置密码
然后找到生成的.ssh的文件夹中的id_rsa.pub密钥，将内容全部复制
![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120000145.png)
![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120000258.png)

打开[GitHub_Settings_keys](https://github.com/settings/keys) 页面，新建new SSH Key

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/v2-72a3f22c080e99343c3cc4aabce10e3c_720w.jpg)

Title为标题，任意填即可，将刚刚复制的id_rsa.pub内容粘贴进去，最后点击Add SSH key。
在Git Bash中检测GitHub公钥设置是否成功，输入 ssh git@github.com ：

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120000822.png)

如上则说明成功。这里之所以设置GitHub密钥原因是，通过非对称加密的公钥与私钥来完成加密，公钥放置在GitHub上，私钥放置在自己的电脑里。GitHub要求每次推送代码都是合法用户，所以每次推送都需要输入账号密码验证推送用户是否是合法用户，为了省去每次输入密码的步骤，采用了ssh，当你推送的时候，git就会匹配你的私钥跟GitHub上面的公钥是否是配对的，若是匹配就认为你是合法用户，则允许推送。这样可以保证每次的推送都是正确合法的。

## 安装 Node.js

Hexo基于Node.js，Node.js下载地址：[Download | Node.js](https://nodejs.org/en/download/) 下载安装包，注意安装Node.js会包含环境变量及npm的安装，安装后，检测Node.js是否安装成功，在命令行中输入 `node -v` :
![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120001031.png)

检测npm是否安装成功，在命令行中输入`npm -v` :
![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120001121.png)

>到这了，安装Hexo的前置环境已经全部搭建完成。


# 安装 Hexo

Hexo就是我们的个人博客网站的框架， 这里需要自己在电脑常里创建一个文件夹，可以命名为Blog，Hexo框架与以后你自己发布的网页都在这个文件夹中。创建好后，进入文件夹中，打开doc窗口使用npm命令安装Hexo，输入：

```
npm install -g hexo-cli 
```

这个安装时间较长耐心等待，安装完成后，初始化我们的博客，输入：

```
hexo init hexo
```

>注意，这里的命令都是作用在刚刚创建的Blog文件夹中。

为了检测我们的网站雏形，分别按顺序输入以下三条命令：

```
hexo new test_my_site

hexo g

hexo s
```

这些命令在后面作介绍，完成后，打开浏览器输入地址：

localhost:4000

可以看出我们写出第一篇博客，只不过我下图是我修改过的配置，和你的显示不一样。

现在来介绍常用的Hexo 命令

npm install hexo -g #安装Hexo
npm update hexo -g #升级
hexo init #初始化博客

命令简写
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo g == hexo generate #生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy #部署

hexo server #Hexo会监视文件变动并自动更新，无须重启服务器
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存，若是网页正常情况下可以忽略这条命令

刚刚的三个命令依次是新建一篇博客文章、生成网页、在本地预览的操作。

# 推送至网站

上面只是在本地预览，接下来要做的就是就是推送网站，也就是发布网站，让我们的网站可以被更多的人访问。在设置之前，需要解释一个概念，在blog根目录里的_config.yml文件称为站点配置文件，如下图
![](http://img.gzling.top/img/2022/0120220120095550.png)

进入根目录里的themes文件夹，里面也有个_config.yml文件，这个称为主题配置文件，如下图
![](https://pic4.zhimg.com/80/v2-4252029e5634bf91c7d58916ae2b8ac3_720w.jpg)

## Hexo与GitHub关联

下一步将我们的Hexo与GitHub关联起来，打开站点的配置文件_config.yml，翻到最后修改为：

```
deploy:
type: git
repo: 这里填入你之前在GitHub上创建仓库的完整路径，记得加上 .git
branch: master
```

参考如下：
![](https://pic1.zhimg.com/80/v2-279ac5149b577f04dc099defbb12eaa8_720w.jpg)
保存站点配置文件。

其实就是给hexo d 这个命令做相应的配置，让hexo知道你要把blog部署在哪个位置，很显然，我们部署在我们GitHub的仓库里。最后安装Git部署插件，输入命令：

```
npm install hexo-deployer-git --save
```

这时，我们分别输入三条命令：

```
hexo clean 
hexo g 
hexo d
```

其实第三条的 hexo d 就是部署网站命令，d是deploy的缩写。完成后，打开浏览器，在地址栏输入你的放置个人网站的仓库路径，即 http://xxxx.github.io (知乎排版可能会出现"http://"字样，参考下图) 比如我的xxxx就是我的GitHub用户名：http://linxi37.github.io

## 绑定域名

虽然在Internet上可以访问我们的网站，但是网址是GitHub提供的:http://xxxx.github.io  而我们想使用我们自己的个性化域名，这就需要绑定我们自己的域名。这里演示的是在阿里云万网的域名绑定，在国内主流的域名代理厂商也就阿里云和腾讯云。登录到阿里云，进入管理控制台的域名列表，找到你的个性化域名，进入解析
![](https://pic3.zhimg.com/80/v2-47323ad4490e206aef93a3d68f0670b6_720w.jpg)
![](https://pic3.zhimg.com/80/v2-40222b3a295bb692aac22829a8ec3be2_720w.jpg)

包括添加三条解析记录，192.30.252.153是GitHub的地址，你也可以ping你的 http://xxxx.github.io 的ip地址，填入进去。第三个记录类型是CNAME，CNAME的记录值是：你的用户名.http://github.io 这里千万别弄错了。第二步，登录GitHub，进入之前创建的仓库，点击settings，设置Custom domain，输入你的域名
![](https://pic4.zhimg.com/80/v2-85ba6dda906f22dea4c03df2b47d994b_720w.jpg)

点击save保存。第三步，进入本地博客文件夹 ，进入blog/source目录下，创建一个记事本文件，输入你的域名，对，只要写进你自己的域名即可。如果带有www，那么以后访问的时候必须带有www完整的域名才可以访问，但如果不带有www，以后访问的时候带不带www都可以访问。所以建议，不要带有www。这里我还是写了www(不建议带有www):
![](https://pic1.zhimg.com/80/v2-79abfff91af3f520e24cb91acf6aa994_720w.jpg)
保存，命名为CNAME ，注意保存成**所有文件**而**不是txt文件**。

完成这三步，进入blog目录中，按住shift键右击打开命令行，依次输入：

```
hexo clean
hexo g
hexo d
```

这时候打开浏览器在地址栏输入你的个性化域名将会直接进入你自己搭建的网站。

# 美化设置

## 站点基本设置

在站点配置文件_config.yml修改基本的站点信息

```yml
# Site
title: 写点东西😘
subtitle: '做自己喜欢做的事'
description: '记自己需要记住的事'
keywords: gzling
author: Mask
language: zh-CN
timezone: ''
```

依次是网站标题、副标题、网站描述、关键字、网站语言、时区等。

在language的值修改为: zh-CN

然后测试下就变中文。

## NexT主题

### 更换主题

如果你不喜欢Hexo默认的主题，可以更换不同的主题，主题传送门：[Themes](https://hexo.io/themes/) 我自己使用的是Next主题，可以在hexo目录中的themes文件夹中查看你自己主题是什么。现在把默认主题更改成Next主题，在hexo目录中（就是命令行的位置处于hexo目录）打开命令行输入：

```bash
git clone https://github.com/next-theme/hexo-theme-next themes/next
```

这是将Next主题下载到blog目录的themes主题下的next文件夹中。打开**站点**的_config.yml配置文件，修改主题为next

![image-20220120103951429](http://img.gzling.top/img/2022/01image-20220120103951429.png)

打开**主题**的_config.yml配置文件，不是站点主题文件，找到Scheme Settings

![image-20220120104542966](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/image-20220120104542966.png)

next主题有四个样式，我用的是Mist，你们可以自己试试看，选择你自己喜欢的样式（只需要把行首的#去除，#是注释），选择好后，再次部署网站，hexo g、hexo d，查看效果。

### 菜单栏开启跳转页面

还是在主题目录下的_config.yml中。把想要的页面开启，去掉#即可。

```yml
menu:
  home: / || fa fa-home
  archives: /archives/ || fa fa-archive
  categories: /categories/ || fa fa-th
  tags: /tags/ || fa fa-tags
  about: /about/ || fa fa-user
  #schedule: /schedule/ || fa fa-calendar
  #sitemap: /sitemap.xml || fa fa-sitemap
  #commonweal: /404/ || fa fa-heartbeat

# Enable / Disable menu icons / item badges.
menu_settings:
  icons: true # 是否显示各个界面的图标
  badges: false #是否显示分类/标签/归档页的内容量
```

我开启的从上到下分别是：首页、归档、分类、标签、关于我。**可以在menu中调换显示顺序。**

但是这些页面不会自动生成，得我们创建。

比如：

- **分类页面**

在站点目录打开Git Bash，输入

```bash
hexo new page categories
```

然后去站点目录的source/categories的index.md 中，配置：copy过去即可。

```markdown
---
title: 分类
type: "categories" # 这要跟主题目录下的_config.yml的那个名称一样
comments: false # 不开启评论
---
```

- **标签界面**

```bash
hexo new page tags
```

在source/tags的index.md 中

```yaml
---
title: 标签 # 默认是显示英文，需要自己改中文
type: "tags"
comments: false
---
```

- **关于页面**

```
hexo new page about
```

在source/about的index.md 中

```yml
title: 关于
date: 2019-11-30 22:52:16
type: "about"

# 然后下面就可以使用Markdown语法介绍自己
```

### 添加博客图标

在主题目录下_config.yml文件查询 favicon，只需要修改前两个：small和medium，图片的像素得为16像素和32像素

```yaml
favicon:
  small: /images/favicon-16x16-next.png
  medium: /images/favicon-32x32-next.png
  apple_touch_icon: /images/apple-touch-icon-next.png
  safari_pinned_tab: /images/logo.svg
  #android_manifest: /images/manifest.json
  #ms_browserconfig: /images/browserconfig.xml
```

你可以看到这两个属性的值，/images其实完整的路径为：themes/next/source/images 这条路径来定位的。

也可以定义外部URI。

可以去图标素材：[iconfont](https://www.iconfont.cn/)中下载16x16和32x32大小的PNG格式图片，然后放到themes/next/source/images下。

可以得出，要在主题某处添加什么图片都可以放在这个目录下。

### 鼠标点击特效

鼠标的点击红心特效如下：

![](https://blogdata-1258545379.cos.ap-shanghai.myqcloud.com/20190124/5308475-78e64c0a80bb559e.gif)

刚刚说了主题图片可以放在themes\next\source\images，而themes\next\source有一个js文件，我们在themes\next\source\js\src（如果没有就自己创建） 下新建文件clicklove.js，然后把下面的代码copy到该文件中。

```js
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```

然后在\themes\next\layout\\_layout.njk文件末尾添加：

```html
<!-- 页面点击小红心 -->

<script type="text/javascript" src="/js/src/clicklove.js"></script>
```

### 设置头像

在主题目录（themes/next/）中的_config.yml，查找 avatar

```yaml
# Sidebar Avatar
avatar:
  # Replace the default image and set the url here.
  # 把你要的头像文件名字改为avatar并放到相应路径下，如果后缀不同，则在这里改后缀，不要改图片后缀
  url: /images/avatar.jpg 
  # If true, the avatar will be dispalyed in circle.
  rounded: true
  # If true, the avatar will be rotated with the cursor.
  rotated: true
```

### 侧边栏社交小图标设置

在主题目录打开_config.yml，查询 social

```yaml
social:
  GitHub: https://github.com/magicflung || github
  #E-Mail: mailto:yourname@gmail.com || envelope
  #Weibo: https://weibo.com/yourname || weibo
  #Google: https://plus.google.com/yourname || google
  #Twitter: https://twitter.com/yourname || twitter
  #FB Page: https://www.facebook.com/yourname || facebook
  #StackOverflow: https://stackoverflow.com/yourname || stack-overflow
  #YouTube: https://youtube.com/yourname || youtube
  #Instagram: https://instagram.com/yourname || instagram
  #Skype: skype:yourname?call|chat || skype
  #RSS: /atom.xml || rss
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220120150527.png)

### 文章末尾的标签图标修改

默认是 带“#”，可以把它换成图标。还是主题目录打开_config.yml中查询 tag_icon

```yaml
# Use icon instead of the symbol # to indicate the tag at the bottom of the post
tag_icon: true
```

效果：![](https://imgconvert.csdnimg.cn/aHR0cDovL2ZsdW5nZ2cub3NzLWNuLXNoZW56aGVuLmFsaXl1bmNzLmNvbS9oZXhvSW1nLzIwMTkxMjI2MjMvMjAxOTEyMjYyMzE3MjctMTU5OTYwLnBuZw?x-oss-process=image/format,png)

### 访问量统计

在主题目录打开_config.yml，查询 busuanzi

```yaml
# Show Views / Visitors of the website / page with busuanzi.
# Get more information on http://ibruce.info/2015/04/04/busuanzi
busuanzi_count:
  enable: true # 是否开启访问量统计
  total_visitors: false # 本站访客数
  total_visitors_icon: user
  total_views: true # 本站总访问量
  total_views_icon: eye
  post_views: false # 文章访问量，但我不喜欢用这个，因为在我的网站首页不会显示每篇博文的访问量，而是得点进博文，我用别的来统计，待会会说
```

> post_views: 我使用了leancloud，需要在leancloud注册账户+认证，具体操作可以看另外一篇文档[Hexo + Next 添加文章阅读量统计](:/49f54271c69d44819facf071b1975b22)

### 启动阅读更多按钮

在主题目录的_config.yml中，查询：read_more_btn

```yaml
# Read more button
# If true, the read more button will be displayed in excerpt section.
read_more_btn: true # 启动
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121005535.png)

- **第一种方式**

这里需要额外说一下，必须在每篇博文的最前面有一堆默认键值对代码那里，添加上一个键: description，

然后冒号： :，然后再空格，添加上自己的小文段。![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121005643.png)

- **第二种方式**

在文章中使用`< !--more-->` 手动进行截断
这种方法可以根据文章的内容，自己在合适的位置添加 `< !--more-->` 标签，使用灵活，也是Hexo推荐的方法。

但是这种有个问题，点击阅读全文会自动定位到 more的位置，而不是文章的开头

新版本解决方案：强制修改\themes\next\layout_macro\post.njk 中

```html
<a class="btn" href="{{ url_for(post.path) }}#more" rel="contents">···</a>
```

修改为 去除#more 锚点即可

```html
<a class="btn" href="{{ url_for(post.path) }}" rel="contents">···</a>
```

### 博文模板设置

但是每次都得自己加太麻烦了，所以在站点目录下的scaffolds文件中有个post文件，这个文件就是博文模板，点开就可以添加每篇博文的通用信息。我的如下：

```yaml
---
title: {{ title }}
date: {{ date }}
tags:
categories:
copyright: true
top:
description:
---
```

categories: 如果有多个分类平级请使用

```yaml
categories: 
- [面试] 
- [Java]
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121010103.png)

如果写成

```yaml
categories: 
- 面试 
- Java
```

这会标识Java是面试下面的子类

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121010049.png)

多个平级分类 + 子集分类

```yaml
categories: 
- [面试,Java] 
- [Java]
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121010305.png)

### 文章顶置

在站点目录下打开Git Bash，先把原先的顶置插件卸载了，然后再装上hexo-generator-index-pin-top，输入：

```bash
npm uninstall hexo-generator-index --save
npm install hexo-generator-index-pin-top --save
```

**然后可以在博文模板post中加个top键，值为整数，并且值为大越靠前。**

最后，就是在顶置博文时，没用一个顶置图标感觉有点怪怪的，所以可以加个图标。在主题目录中的themes\next\layout\_partials\post的post-meta.njk文件，打开查询第一个：`<div class="post-meta">`。

然后这个div的下一行添加上：

```
{% if post.top %}
    <font color="red"><i class="fa fa-arrow-up"></i>
    <strong>置顶</strong></font>
{% endif %}
```

效果：![image-20220121014456168](C:\Users\30600\AppData\Roaming\Typora\typora-user-images\image-20220121014456168.png)

### 在文章底部增加版权信息

在主题目录的_config.yml查询 creative_commons

```yaml
# Creative Commons 4.0 International License.
# See: https://creativecommons.org/share-your-work/licensing-types-examples
# Available values of license: by | by-nc | by-nc-nd | by-nc-sa | by-nd | by-sa | zero
# You can set a language value if you prefer a translated version of CC license, e.g. deed.zh
# CC licenses are available in 39 languages, you can find the specific and correct abbreviation you need on https://creativecommons.org
creative_commons:
  license: by-nc-sa
  sidebar: false
  post: true # 开启
  language:
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121025013.png)

还可以在这基础上添加自己想展示的信息，步骤如下：

1. 打开 themes\next\layout\_partials\post目录下的 post-copyright.njk 文件
2. 根据里面的格式进行添加修改信息，下图为我新增的发布日期信息

![image-20220121025251352](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/image-20220121025251352.png)

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121025317.png)

### 添加打赏

在主题文件的_config.yml，查询：reward

```yaml
# Reward (Donate)
# Front-matter variable (unsupport animation).
reward_settings:
  # If true, reward will be displayed in every article by default.
  enable: true # 开启打赏
  animation: false # 开启动画抖动，建议关闭，晃得眼晕
  #comment: Donate comment here.

reward:
  wechatpay: /images/wechatpay.jpg # 放微信的收款码
  alipay: /images/alipay.jpg # 放支付宝的收款码
  #bitcoin: /images/bitcoin.png
```

### 代码块美化（引擎、行号、复制按钮）

next 8.x 支持2中引擎，highlight、prismjs两种引擎，可以自行切换，切换记得重新 clean 发布

修改引擎在`站点_config.yml` 搜索 highlight 或者 prismjs

```yaml
highlight:
  enable: false #是否开启代码高亮
  line_number: true #是否增加代码行号
  auto_detect: true #自动判断代码语言
  tab_replace:

prismjs:
  enable: true #是否开启代码高亮
  preprocess: true
  line_number: false #是否增加代码行号
  tab_replace: ''
```

修改代码块高亮样式在 next的_config.yml 中，搜索 codeblock

```yaml
codeblock:
  # Code Highlight theme
  # All available themes: https://theme-next.js.org/highlight/
  theme:
    light: atom-one-light	# 模板
    dark: tomorrow-night	#
  prism:
    light: prism	#
    dark: prism-tomorrow	#
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Available values: default | flat | mac
    style: default
```

### 在Footer添加站点运行时间

在主题目录的/themes/next/layout/_partials/footer.njk 最后添加下面代码

```javascript
<div id="days"></div>
</script>
<script language="javascript">
    function show_date_time(){
    window.setTimeout("show_date_time()", 1000);
    BirthDay=new Date("11/29/2019 20:00:00");
    today=new Date();
    timeold=(today.getTime()-BirthDay.getTime());
    sectimeold=timeold/1000
    secondsold=Math.floor(sectimeold);
    msPerDay=24*60*60*1000
    e_daysold=timeold/msPerDay
    daysold=Math.floor(e_daysold);
    e_hrsold=(e_daysold-daysold)*24;
    hrsold=setzero(Math.floor(e_hrsold));
    e_minsold=(e_hrsold-hrsold)*60;
    minsold=setzero(Math.floor((e_hrsold-hrsold)*60));
    seconds=setzero(Math.floor((e_minsold-minsold)*60));
    document.getElementById('days').innerHTML="已运行"+daysold+"天"+hrsold+"时"+minsold+"分"+seconds+"秒";
}
function setzero(i){
    if (i<10)
    {i="0" + i};
    return i;
}
show_date_time();
</script>
```

### 实现文章统计功能

安装一个 hexo-symbols-count-time插件，可以统计字数和阅读分钟数，

```bash
npm install hexo-symbols-count-time --save
```

然后在站点目录的config.yml最后添加：

```yaml
symbols_count_time:
  symbols: true                # 文章字数统计
  time: true                   # 文章阅读时长
  total_symbols: true          # 站点总字数统计
  total_time: true             # 站点总阅读时长
  exclude_codeblock: false     # 排除代码字数统计
```

不喜欢的可以使用false让它不启动。并且文章字数统计时，他是连空格，标点符号等都统计了，可能会导致文章的字数会不正确，偏大。

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121112857.png)

### RSS订阅

首先在站点目录下打开Git Bash 安装

```bash
npm install hexo-generator-feed --save
```

然后打开站点目录的_config.yml在后面添加：

```yaml
# RSS
plugins: hexo-generate-feed
```

然后在主题next目录的_config.yml 查找 RSS

然后把它的注释去掉，即开启，并且不用去创建该页面，会自动生成

```yaml
RSS: /atom.xml || fa fa-rss
```

### 网站右上角GitHub的跳转按钮

在主题目录的_config.yml查询 github_banner

```yaml
# `Follow me on GitHub` banner in the top-right corner.
github_banner:
  enable: true # 开启
  permalink: https://github.com/magicflung # 把它改为你的github首页
  title: Follow me on GitHub
```

### 自动保存上次阅读进度

Bookmark是一个插件，允许用户保存他们的阅读进度。用户只需单击页面左上角的书签图标即可保存滚动位置。当他们下次访问您的博客时，他们可以自动恢复每个页面的最后滚动位置。

在主题目录的_config.yml查询 bookmark

```yaml
bookmark:
  enable: true # 开启
  # Customize the color of the bookmark.
  color: "#836FFF" # 自定义颜色
  # If auto, save the reading progress when closing the page or clicking the bookmark-icon.
  # If manual, only save it by clicking the bookmark-icon.
  save: auto # 会自动保存阅读进度
```

### 显示当前浏览进度

#### 方式一

在主题目录的_config.yml查询scrollpercent，默认为false，改为true

```yaml
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: false
  # Scroll percent label in b2t button.
  scrollpercent: true # 开启
```

效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121115126.png)

#### 方式二

在主题目录的_config.yml查询reading_progress

```yaml
# Reading progress bar
reading_progress:
  enable: true # 开启
  # Available values: top | bottom
  position: top # top会出现在页面最顶部，bottom会出现在那里
  color: "#836FFF" # 可修改颜色
  height: 3px
```



效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121115339.png)

### Footer / 页脚设置

在主题目录的_config.yml 查询 footer

```yaml
footer:
  # Specify the date when the site was setup. If not defined, current year will be used.
  #since: 2019 #建站时间

  # Icon between year and copyright info.
  icon:
    # Icon name in Font Awesome. See: https://fontawesome.com/v4.7.0/icons/
    # `heart` is recommended with animation in red (#ff0000).
    name: heart # 可以修改图片，可以去 https://fontawesome.com/v4.7.0/icons/ 找
    # If you want to animate the icon, set it to true.
    animated: true #图标是否闪动
    # Change the color of icon, using Hex Code.
    color: "#F5F5F5" # 图标颜色

  # If not defined, `author` from Hexo `_config.yml` will be used.
  copyright:
  
  # Powered by Hexo 字样，不喜欢可以设置为 false
  powered:
    # Hexo link (Powered by Hexo).
    enable: true
    # Version info of Hexo after Hexo link (vX.X.X).
    version: true
    
  # 主题字样，不喜欢可以 false
  theme:
    # Theme & scheme info link (Theme - NexT.scheme).
    enable: true
    # Version info of NexT after scheme info (vX.X.X).
    version: true

  # 备案信息，如果网站有备案号，可以在这里填写备案号
  # Beian ICP and gongan information for Chinese users. See: http://www.beian.miit.gov.cn, http://www.beian.gov.cn
  beian:
    enable: false #是否显示网站备案信息
    icp:
    # The digit in the num of gongan beian.
    gongan_id:
    # The full num of gongan beian.
    gongan_num:
    # The icon for gongan beian. See: http://www.beian.gov.cn/portal/download
    gongan_icon_url:
```

### 添加评论

这里用的是来必力评论的功能，个人觉得这个还是很好用的，界面挺好看的，支持多方登录评论。

1. 首先你要注册一个来必力账号，https://www.livere.com
2. 注册完，登录，点击安装，选择City版免费的那个，点击现在安装，填入相关信息拿到安装代码，这里我们只需要安装代码里面的UID

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121173643.png)

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121173700.png)

3. 拿到uid后，打开主题配置文件_config.yml，搜索**livere_uid**，把uid填进去就可以，接着重新部署hexo g 、hexo s就完成添加评论的功能了。

   ![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121173735.png)

4. 效果：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121174354.png)

5. 来必力后台管理：![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220121174445.png)

### Url 持久化

我们可以发现 hexo 默认生成的文章地址路径是 【网站名称／年／月／日／文章名称】。

这种链接对搜索爬虫是很不友好的，它的 url 结构超过了三层，太深了。

下面我推荐安装 hexo-abbrlink 插件：

```bash
npm install hexo-abbrlink --save
```

然后在站点目录下，查询 permalink

```yaml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://gzling.top/  # 这里我填写我自己的域名，没有域名的先别动
permalink: archives/:abbrlink.html
permalink_defaults:
pretty_urls:
  trailing_index: true # Set to false to remove trailing 'index.html' from permalinks
  trailing_html: true # Set to false to remove trailing '.html' from permalinks
```

### 背景添加动态线条效果

在 \themes\next\layout\\_layout.njk 文件中添加如下代码：

```javascript
<!--动态线条背景-->
<script type="text/javascript"
color="220,220,220" opacity='0.7' zIndex="-2" count="200" src="//cdn.bootcss.com/canvas-nest.js/1.0.0/canvas-nest.min.js">
</script>
```

其中：

- color：表示线条颜色，三个数字分别为(R,G,B)，默认：（0,0,0）
- opacity：表示线条透明度（0~1），默认：0.5
- count：表示线条的总数量，默认：150
- zIndex：表示背景的z-index属性，css属性用于控制所在层的位置，默认：-1

### SEO支持

SEO(Search Engine Optimization)意为搜索引擎优化,利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。

百度SEO 站点管理平台

登录[百度站点管理平台](https://ziyuan.baidu.com/linksubmit/index)添加站点域名，然后验证站点。

验证站点有几种方式，包括下载文件验证，HTML，CNAME验证等，我做了HTML验证：

复制content后的内容，将复制的内容粘贴到next文件下_config.yml的baidu_site_verification字段

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122123234.png)

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122123413.png)

#### 博客内容推送

由于Github对百度爬虫进行了屏蔽，因此百度是爬取不到Github上的页面的，如果你把网站也部署到了Coding上，那百度就可以抓取到。所以看下面的内容之前，需要确保网站部署到了coding。

在站点管理平台可以选择博客内容推送方式，自动和手动。自动推送有三种，我同时做了sitemap和主动推送(实时)两种方式。

1. Sitemap推送方式

> 站点地图即sitemap，是一个页面，上面放置了网站上需要搜索引擎抓取的所有页面的链接。站点地图可以告诉搜索引擎网站上有哪些可供抓取的网页，以便搜索引擎可以更加智能地抓取网站。

安装百度站点地图生成插件：

```bash
npm install hexo-generator-baidu-sitemap --save
```

在博客根目录config文件添加配置：

```yaml
baidusitemap:
  path: baidusitemap.xml
```

然后执行hexo g -d，public目录里就会生成baidusitemap.xml文件，这就是生成的站点地图。里面包含了网站上所有页面的链接，搜索引擎通过这个文件来抓取网站页面。同时检查线上是否能打开，这里是我的[baidusitemap.xml文件](https://www.gzling.top/baidusitemap.xml)。

然后提交线上链接到站点管理平台：

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122124444.png)

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122134048.png)

显示状态等待的原因是百度自行抓取地址，Sitemap推送方式就安排上了。

2. 主动推送(实时)方式

主动推送最为快速的提交方式，是被百度收录最快的推送方式。通过安装插件实现：

```bash
npm install hexo-baidu-url-submit --save
```

安装结束后在博客根目录config文件添加配置：

```yaml
baidu_url_submit:
  count: 5 				     ## 提交最新的五个链接
  host: www.93bok.com 	     ## 百度站长平台中注册的域名
  token: xxx	             ## 准入秘钥
  path: baidu_urls.txt 		 ## 文本文档的地址， 新链接会保存在此文本文档里
```

一定要确保_config.yml文件中url的值和百度站长平台注册的域名相同，我的全都是[https://jmyblog.top](https://jmyblog.top/)
然后在config文件远程部署配置部分，加上：

```
-  type: baidu_url_submitter	
```

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122144956.png)


然后执行hexo g -d，就可以实现每次部署自动推送文章啦：

如果出现![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122145208.png)

这个错误信息，请把 `count` 后面的注释删除

![](https://gitee.com/gzl_admin/picture_bed/raw/master/img/2022/01/20220122144849.png)

> 推送原理：
> 新链接的产生， hexo generate 会产生一个文本文件，里面包含最新的链接
> 新链接的提交， hexo deploy 会从上述文件中读取链接，提交至百度搜索引擎
>
> 参考链接：[设置主动推送百度SEO](https://hui-wang.info/2016/10/23/Hexo%E6%8F%92%E4%BB%B6%E4%B9%8B%E7%99%BE%E5%BA%A6%E4%B8%BB%E5%8A%A8%E6%8F%90%E4%BA%A4%E9%93%BE%E6%8E%A5/)

### 文章末尾统一添加“本文结束”标记

1. 主题配置文件取消注释

   ```yaml
   custom_file_path:
     #head: source/_data/head.njk
     #header: source/_data/header.njk
     #sidebar: source/_data/sidebar.njk
     #postMeta: source/_data/post-meta.njk
     postBodyEnd: source/_data/post-body-end.njk
     #footer: source/_data/footer.njk
     #bodyEnd: source/_data/body-end.njk
     #variable: source/_data/variables.styl
     #mixin: source/_data/mixins.styl
     #style: source/_data/styles.styl
   ```

2. 如果hexo的source目录下没有\_data文件夹，请先新建\_data文件夹在新增post-body-end.njk文件

3. 打开post-body-end.njk文件，复制下面脚本粘贴保存

   ```html
   <div>
       {% if not is_index %}
           <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束<i class="fa fa-paw"></i>感谢您的阅读-------------</div>
       {% endif %}
   </div>
   ```

## Hexo添加文章时自动打开编辑器

- 首先在站点目录下的scripts目录中创建一个JavaScript脚本文件。如果没有这个scripts目录，则新建一个。

- scripts目录新建的JavaScript脚本文件可以任意取名。

通过这个脚本，我们用其来监听`hexo new`这个动作，并在检测到`hexo new`之后，执行编辑器打开的命令。

- 如果你是windows平台的Hexo用户，则将下列内容写入你的脚本：（直接复制，不用改）

  ```javascript
  var spawn = require('child_process').exec;
  hexo.on('new', function(data){
    spawn('start  "markdown编辑器绝对路径.exe" ' + data.path);
  });
  ```

- 如果你是Mac平台Hexo用户，则将下列内容写入你的脚本：（直接复制，不用改）

  ```javascript
  var exec = require('child_process').exec;
  hexo.on('new', function(data){
      exec('open -a "markdown编辑器绝对路径.app" ' + data.path);
  });
  ```

  
