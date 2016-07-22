#React-FullStack-Boilerplate
##核心功能：
- 使用Express4.0作为后端基础，集成logger, ErrorHandler, Router，使用pp（内部）作为Async Task Handler和peter（内部）作为Mongo Driver
- 使用jsonwebtoken作为auth认证
- 使用react和redux作为前端基础，集成react-redux, react-router来处理数据绑定自动渲染和路由切换（以及history管理）
- 完全支持服务端预渲染--对于任意页面或者页面的组件都支持服务端init state然后当用户通过任意方式（保存书签，直接输入url，爬虫请求url， 等等）访问页面时候都是完整的页面
- 支持react hot reloading--即改即所见，更顺畅的开发体验
- 前后端都支持ES6，体验更强大的javascript，写出更好维护的代码（不久会添加es7的支持，或者部分import feature的支持，特别是和react best practice相关的，比如high order component--即装饰器）
- 使用webpack作为工程结构的compile, module, build工具，对于development和production分别支持
- 使用immutable简化状态修改的方式（redux第二原则：state只是可读的），保证性能。
- （对于isolate css file）使用CSS Modules支持css的模块化开发，最大化的重用CSS。使用post-css对css做优化和集成，比如自动添加浏览器适配前缀等。
- （对于inline css）使用radium补充react css遗留的各种问题，比如支持浏览器状态样式，类似`:hover`、`:focus`或`:active`等，支持Media queries从而更好的对mobile适配，自动添加浏览器prefix从而对不同浏览器css功能适配等。

##重要理念：
- 遵从Flux数据流的思想
- 遵从redux开发的三大原则

##客户端文件结构预览：
- main：真个应用的入口，包括存储对象，路由，客户端和服务端的同构实现
- states：存在整个应用的state object tree，相当于后端数据库的schema
- containers：属于smart component，用于组织自己组件下的所有数据从而分发给自己的stateless && pure render子组件，此类组件一般都会使用react-redux connect bind，从而建立自动re-render机制
- component：属于stateless function，一般使用react statelss componet的开发结构体，从props中获取数据并渲染之。
- reducers：用来处理自己component的action，并响应state object tree的变化，是数据源变化的唯一发生地。
- api: 所有异步数据流的接口
- lib：存放自定义的util，middleware等

##开发模式：
- 根据组件功能提炼出state object subtree，然后在states文件夹下根据功能建立对应描述文件夹添加state schema file，然后挂载到root state object tree上
- 设计分析组件的功能，拆分组件职责，规划数据流，编写container和component
- 根据需要的数据流撰写action，并添加到reducer处理
