# MPCB  
MPCB(meizu photo cloud backup)  

魅族云相册备份下载器， 简高效的批量下载魅族云相册中的图片。  

![](.github/preview.jpg)

详细使用文档：  
[Mpcb 0.3.0 使用方式](https://pyumch0w0j.feishu.cn/docx/doxcn3KgDeFOKy5anFiOYmtqexc)

国内镜像地址:  
蓝奏云：  
https://moreant.lanzoul.com/b01cpng1e  密码:fedu  

## 特别鸣谢
感谢 [@caoxiemeihao](https://github.com/caoxiemeihao) 及他的 [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue) 模板，开箱即用。

## 更新日志

### 0.3.1
1. 修复了在macOS上获取下载路径错误的问题；增加了在文件管理器中打开下载路径的功能 [#2](https://github.com/moreant/mpcb/issues/2) by [@Jason Lam](https://github.com/JasonLamv-t)


### 0.3.0 
1. 图片最多获取 10,000 张改为 20,000 张。
2. 更新相关依赖。

### 0.2.1
1. 能从指定位置开始下载图片，缓解 Token 过期导致下载失败。

### 0.2.0
1. 使用 Electron 简化程序安装。
2. 使用非常有趣的 [NaiveUI](https://www.naiveui.com/zh-CN/os-theme) 重构 UI。
3. 简化获取 Token 的方式。

### 0.1.0
1. 使用 [daisyUI](https://daisyui.com/) 与 [nodejs](https://nodejs.org/zh-cn/) 实现基本功能
2. 使用浏览器脚本插件获取 Token


## 备份工具
electorn 打包时需要 512 尺寸的 ico 文件，下面是支持在线生成 512 尺寸的网站：  
https://redketchup.io/icon-converter