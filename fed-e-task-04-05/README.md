# fed-e-task-04-05

## 通过该项目，请简要说明 typescript 比 javascript 的优势在哪？

1. TypeScript 是 JavaScript 的超级, 完全兼容 JavaScript
2. TypeScript 添加了类型系统, 从而使得静态类型检查, 代码智能提示成为可能
3. 类型检查将错误的暴露从运行时提前到了编写时, 提升了编码效率, 提高可读性和减少出错可能
4. TypeScript 支持 ES6+, type, interface 等新特性, 并且可以编译到低版本 JavaScript 用于兼容各种环境, 方便开发

## 请简述一下支付流程

1. 客户点击购买, 客户端向服务端发起请求, 并传递相应参数
2. 客户端校验通过后, 调用支付宝或第三方接口, 获取字符地址, 回传给客户端
3. 客户端跳转到支付地址
4. 客户登陆或录入信息后, 支付订单
5. 支付宝或支付第三方收到支付请求, 并校验通过后
   1. 向服务端发送支付成功的通知
   2. 通知客户端交易成功
6. 服务端更新对应订单的状态
7. 客户端展示支付成功界面, 然后跳转到购物车

## react-redux 的主要作用是什么，常用的 api 有哪些，什么作用？

主要作用是管理应用的状态, 提供统一接口方便组件读取和修改数据. 常用 api 有

- Provider, 包裹组件, 为其内部组件提供方法从 store 中获取和修改函数
- connect, 用于从 UI 组件生成容器组件, 将输入输出逻辑和 UI 组件绑定起来, 形成新的组件
- hooks, 提供一组钩子函数, 允许订阅特定的 redux 存储和调度操作, 而不是将其包裹在 connect 中
  - useSelector, 从 store 中提取数据
  - useDispatch, 从 store 中获得对 dispatch 的引用, 用于执行 action
  - useStore, 获得 store 引用

## redux 中的异步如何处理？

- redux-thunk, 在 action 函数内部增加 function 类型判断, 是函数则返回函数执行结果, 从而可以将异步函数写在函数内部
- redux-saga, 暴露 put, takeEvery 等, 配合 generator 函数实现异步, 并且将 api 和 store 解耦
