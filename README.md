
# Youloge.editor 基于百度(UEditor 2.0.0)进行开发
=====

> 试了很多富文本编辑器,还是微信富文本编辑器+各种插件+样式中心可以满足需求：所以开一个项目，慢慢写

## 更新日志

- 2.1.0 精简代码清楚不需要的组件
- 2.0.8 占位`左侧文章列表` 和 `右侧样式中心`
- 2.0.5 跳转默认参数：约定俗称一些配置 不需要服务器加载 样式仿造微信公众号
- 2.0.1 把`pageage.json` 升级了，支持`es6写法` 删除修改了一些插件
- 2.0.0 百度UEditor 2.0.0 版本

### 安装使用

1. `git clone ` 仓库
2. `npm install` 安装依赖：`安装 grunt` 安装 `http-server`
3. 执行 `npm run build` 打包编译
4. 执行 `npm run dev` 开启本地预览
5. 重复 `npm run build` 页面刷新查看效果

## 参考项目
- [ueditor-plus](https://gitee.com/modstart-lib/ueditor-plus) 由`ModStart`开发
- [neditor](https://gitee.com/notadd/neditor) 2年前我最早接触的二开
- [jian27com/ueditor-plus-typecho](https://github.com/jian27com/ueditor-plus-typecho) UEditor-for-Typecho 二开
- [LinkPoly/UEditor-for-Typecho](https://github.comLinkPoly/UEditor-for-Typecho) UEditor-for-Typecho
:::

这是第四次 再次整理富文本编辑器了：需要功能贴合，容易定制，样式自由并不简单

这里留个疑问：[请看ISSUE](https://github.com/youfeed/youloge.editor/issues)

:::






### 

- 图片拉伸锁定宽高比
- `loadingclass` 监听修复
- `lang.httpPrompt anthorMsg` 删除
- 取消`options.iframeJsUrl` 如果后面注入在添加
- 取消`options.initialStyle`  要做相关代码清楚