# MPCB

MPCB(meizu photo cloud backup)  
魅族云相册备份下载器  
简高效的批量下载魅族云相册中的图片

![](./gh_img/home.jpg)

## 使用方法

0. 首先你的电脑需要装有 `Nodejs`。
1. 克隆或下载整个仓库，找个文件夹解压文件。
2. 分别进入 backend 和 frontend 文件夹，在 终端/bash/powershell/cmd 中执行以下指令安装依赖：

```
npm i
```

3. 在终端中进入 backend 文件夹，执行以下指令运行后端程序：

```
node index.js
```

控制台中显示 `listening on port 3005` 则启动成功。

4. 另起一个终端，在 forntend 文件夹中执行以下指令运行前端程序：

```
npm run dev
```

控制台中有显示 `Local: http://localhost:3000/` 则启动成功，访问这个地址即可开始备份照片。

## Q&A

0. Q: 这是什么原理，为什么能下载我的图片，会不会偷取我的个人信息？  
   A: 是通过程序调用魅族云相册的 API 进行下载的，唯一需要获取的外部输入是 Token，而 Token 会定时刷新。只要你不传给别人，是不会有泄漏风险的。程序的所有代码都是开源的，没有留后门，如果不放心的话请自行审查。

1. Q: Nodejs 是什么，怎么知道我有没有装？  
   A: 请在终端中执行 `node -v` 这个指令检查是否装有 node. 如果没有，请按照这个教程进行安装 [安装 Node](https://www.runoob.com/nodejs/nodejs-install-setup.html)。

2. Q: 下载的图片去哪了？  
   A: 在 `down/` 中，一个相册 ID 对应一个文件夹。

3. Q: 怎么下载异常了？  
   A: 可能是 Token 过期了。需要到魅族云相册中刷新页面，重新获取 Token 并提交。

4. Q: 怎么下载不全？  
   A: 可能是你的相册图片超过一万张了，请找我修改一下查询上限

5. Q: 为什么 `npm i` 非常慢  
   A: npm 默认的官方源服务器在国外且境内没有 CDN 加速，因此请参考这篇博客将依赖源换成淘宝源 [Npm 换源](https://moreant.github.io/p/npm-registry/)
