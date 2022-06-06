<br />
<br />
<p align="center">
  <img src="https://raw.githubusercontent.com/raycast/extensions/main/images/store-logo.png" alt="raycast-extensions" style="width: 90px;" />
</p>

<h1 align="center">
   Personal Raycast Extensions
</h1>

<p align="center">
  个人在 <a href="https://www.raycast.com">Raycast</a> 上使用的扩展合集.
</p>
<p align="center" style="font-size: 13px;">
  注意: 大部分扩展只适合在中文环境下使用, 部分扩展还包含 [NSFW] 内容.
</p>

<br />
<br />

## 包含的扩展

效果图可以到扩展根目录的 README.md 进行查看.

* [raycast-btsow](https://github.com/kayanouriko/raycast-extensions/tree/main/raycast-btsow): btsow Search magnet link and Search torrent file
* [raycast-jikipedia](https://github.com/kayanouriko/raycast-extensions/tree/main/raycast-jikipedia): 网络流行梗文化词条百科
* [raycast-javbus](https://github.com/kayanouriko/raycast-extensions/tree/main/raycast-javbus): 中文的日本成人影片资料库

## 安装

安装前你需要一个账号来登陆 Raycast 应用, 用于开启 Raycast 的开发者模式.

由于扩展不适合上架 Raycast 官方扩展商店, 官方目前也不支持个人扩展分发, 所以只能通过以下开发者模式的方法进行安装.

1. 克隆该项目到本地任意位置.
2. 打开 `Raycast` 输入命令 `Import Extension`, 选择 **对应扩展** 的根目录.
3. 打开终端, 移动到 **对应扩展** 的根目录路径下执行:
    ```
    npm install
    npm run dev
    ```
4. 此时对应扩展的命令应该已经可以在 `Raycast` 内运行.

## 操作快捷键

经过自己一段时间的使用, 根据 raycast 的应用自身特性, 基本固定了操作方式.  
老扩展也会逐步改造统一操作方式.

目前扩展统一内置快捷键一览:
* `cmd` + `enter` 执行搜索
* `ctrl` + `,` 打开扩展设置
* `cmd` + `←` 上一页
* `cmd` + `→` 下一页

1. 为何不用官方内置的防抖功能自动执行搜索功能?  
raycast 对于中文输入的防抖并不友好, 而且不能自定义防抖时间. 这对于爬虫搜索来说, 太容易触发网站的爬虫机制了, 手动执行搜索操作, 对于用户体验还是网站反爬来说, 都是利大于弊的.

2. 结果翻页为何不再采用按钮形式?  
自己使用过几天, 发现按钮式还是很不方便的, 每次需要划动当最顶最底才能操作, 太别扭了.  
还是快捷键操作方便, 而且设置的快捷键也符合使用直觉, 不会增加记忆成本.

## 感谢

* [Raycast](https://www.raycast.com/)