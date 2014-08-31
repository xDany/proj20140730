A Web Project
===

搭建方法
---
1. clone项目到本地
2. 安装nodejs环境，安装gulp，安装依赖包
3. 在项目目录执行 `gulp build`，build目录即是生产环境

注意
---
* `images/content/`中以`test`开头的图片都是开发测试图片，上线前应该用实际图片替换掉
* 测试时，首页防伪查询的结果在URL中干预：URL中带`type1`（如`http://host/index.html?type1`），查询结果为正确，首次查询；URL中带`type2`，查询结果为正确，多次查询；URL中不带`type1`或`type2`，查询结果为错误
