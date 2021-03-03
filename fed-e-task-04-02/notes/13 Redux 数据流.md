# Redux

JavaScript状态容器, 提供可预测化的状态管理

## 工作流程

- Store: 存储状态的容器
- Reducer: 一个函数, 接受action, 返回一个新store以更新状态
- Actions: 一个对象, 具有type field, 描述对状态进行怎样的操作
- view: 视图, 即HTML界面

![image-20210225173626223](13%20React%20%E6%95%B0%E6%8D%AE%E6%B5%81.assets/image-20210225173626223.png)

### 用法

- store是主对象, 暴露**`getState, dispatch, subscribe`**方法对外提供查看, 修改数据, 监听变动的方法
  - view通过触发和监听store, 进行视图的更新
- store需要一个`reducer`函数进行初始化
  - 该函数接受`state, action`两个参数, 返回state, 作为新状态被存储
  - reducer的state参数可以有默认值, 传入初始状态
- action是一个对象, 必须要有一个string类型的`type`域, 用于传递给reducer函数更新状态

```js
// 默认状态
var initialState = {
  count: 0
}
// reducer 函数
function reducer (state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1}
    default:
      return state;
  }
}
// 创建 store 对象
var store = Redux.createStore(reducer);

// 定义 action
var increment = { type: 'increment' };
var decrement = { type: 'decrement' };

// 获取按钮 给按钮添加点击事件
document.getElementById('plus').onclick = function () {
  // 触发action
  store.dispatch(increment);
}
document.getElementById('minus').onclick = function () {
  store.dispatch(decrement);
}

// 订阅 store
store.subscribe(() => {
  // 获取store对象中存储的状态
  // console.log(store.getState());
  document.getElementById('count').innerHTML = store.getState().count;
})
```

### 业界实践

## 中间件

```js
import { createStore, applyMiddleware } from 'redux';
import logger from './middlewares/logger';

// middleware中间件执行顺序遵从apply函数中的参数顺序
createStore(reducer, applyMiddleware(logger));

// logger.js
export default store => next => action => {
  console.log(store, action);
  next(action)
}
```

## 源码实践

最核心的是`store`和`createStore`方法, 通过`store`导出`getState, dispatch, subscribe`方法

```js
function createStore(reducer, preloadedState) {
  const state = preloadedState;
  const listeners = [];
  
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }
  function subscribe(handler) {
    listeners.push(handler);
  }
  
  return {
    getState,
    dispatch,
    subscribe
  }
}
```

然后对`reducer`和`action`对象的类型进行约束判断:

```js
if (typeof reducer !== 'function') throw new Error('reducer must be function type')
if (!isPlainObject(action)) throw new Error('action must be object type')
if (typeof action.type === 'undefined') throw new Error('action must has type property')

// https://yanni4night.github.io/js/2018/02/06/is-plainobject.html
function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  let proto = null;
  while(Object.getPrototypeof(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
```

### 实现`enhancer`支持中间件

```js
function createStore(reducer, preloadedState, enhancer) {
  if (typeof enhancer === 'function') {
    return enhancer(createStore)(reducer, preloadedState);
  }
}

// component.js
function enhancer(createStore) {
  return function (reducer, preloadedState) {
    const store = createStore(reducer, preloadedState);
    // 增强store.dispatch, 支持 function 类型的 action, 传递dispatch参数
    function myDispatch(action) {
      if (typeof action === 'function') {
        return action(dispatch);
      }
      return dispatch(action)
    }
    return {
      ...store,
      dispatch: myDispatch
    }
  }
}
```

### applyMiddleware

中间件定义: `middleware: (store) => (next) => (action) => void;`, 通过`next`参数执行下一步

applyMiddleware方法返回一个`enhancer`函数

```js
function applyMiddlewares(...middlewares) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);
      const storeOfMiddleware = {
        getState: store.getState,
        dispatch: store.dispatch,
      }
      const storedMiddlewares = middlewares.map(m => m(storeOfMiddleware));
      const dispatch = compose(storedMiddlewares)(store.dispatch)
      
      return {
        ...store,
        dispatch
      }
    }
  }
}

// compose(a, b, c)(d) => a(b(c(d)))
const composeTwo = (a, b) => (...args) => a(b(...args));
const compose = (...fns) => fns.reduceRight(composeTwo);
```

### bindActionCreators

```js
function bindActionCreators(actionCreators, dispatch) {
  const bound = {};
  for (let key in actionCreators) {
    bound[key] = () => dispatch(actionCreators[key]())
  }
  return bound;
}

// usage
const actions = bindActionCreators({ increment: () => { type: 'increment' }, store.dispatch });
```

### combineReducers

```js
function combineReducers(reducers) {
  return function (state, action) {
    return Objects.keys(reducers).reduce((acc, cur) => {
      acc[cur] = reducers[cur](state[cur], action);
      return acc;
    }, {});
  }
}
```

# MobX

简单扩展状态管理库

MobX 5 运行在`ES6 proxy`上, 不支持 IE11, Node.js 6

MobX 4 运行在 ES5 上, 4和5API完全一致

## 添加装饰器语法支持

### 弹出配置并修改

```js
npm run eject
npm install @babel/plugin-proposal-decorators

// package.json
"babel": {
  "plugins": [
    [
      "@babel/plugin-proposal-decorators", { legacy: true }
    ]
  ]
}
```

### 使用包工具修改

`react-app-rewired 和 customize-cra`

```js
npm install react-app-rewired customize-cra @babel/plugin-proposal-decorators

// 根目录下创建 config-overrides.js
const { override, addDecoratorsLegacy } = require("customize-cra");
module.exports = override(addDecoratorsLegacy());

// package.json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
}
```

另外装饰器语法vs可能会报错, 打开配置: `javascript.implicitProjectConfig.experimentalDecorators: true`

## 使用

`npm install mobx moxb-react`, 跟Redux使用类似, 分为三步

1. 创建store对象, 存储默认状态

   ```js
   // ./store/count.js
   class CountStore {
     count = 0;
   }
   const counter = new CountStore();
   export default counter;
   ```

2. 将store放在全局的,组件可以触达的地方

   ```js
   // index.js
   import { Provider } from 'mobx-react';
   import counter from './store/counterStore';
   
   ReactDOM.render(
     <Provider counter={counter}> <app /> </Provider>,
     document.getElementById('root')
   )
   ```

3. 使用inject在组件 props 中注册对应store属性

   ```js
   // app.js
   import { inject } from 'mobx-react';
   
   @inject('counter')
   class App extends Component { render() { const { counter } = this.props } }
   ```

### 数值更新与监听

**`observable`**将数据变成可观测数据, 在store class中写**public箭头函数**, 或者**`action`注解的普通函数**, 提供更新接口

可以通过配置禁止非action函数更改状态

```tsx
import { obserable, action, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class Counter {
  @observable count = 0;
  increment = () => this.count++;
  @action.bound decrement() {
    this.count--;
  }
}
```

**`observer`**为component添加监听

```tsx
import { inject, observer } from 'mobx-react'
@inject('counter')
@observer
class App extends Component { render() { return <button onClick={this.props.counter.increment}/> }}
```

### 异步更新

#### runInAction

异步函数同样使用`action`装饰, 但不能直接在异步函数中更新数据, 需要使用`runInAction`调用函数来更新数据

```js
import { runInAction } from 'mobx';
@action.bound async getData() {
  const { data } = await axios.get(...);
  runInAction(() => this.data = data)
}
```

#### flow

flow函数接受一个生成器, 其内部使用yield获取异步数据,并可以同步更新数据, 返回一个更新的函数, 需要手动绑定this

```js
import { flow } from 'mobx';
getData = flow(function* () {
  const { data } = yield axios.get(...)
  this.data = data;
}).bind(this)
```

### 计算值

类似vue的computed

```js
import { computed } from 'mobx';
class a {
  @computed get result() {
    return this.a * this.b;
  }
}
```

### 监听值

**`autorun`**, 类似vue的watch, 在初始化的时候调用一遍, 为执行时用到的所有属性添加监听

之后每次监听属性发生变动, 都会调用一遍autorun函数

autorun自带防抖, 在[第二个参数配置](https://cn.mobx.js.org/refguide/autorun.html#%E9%80%89%E9%A1%B9)中

```js
import { autorun } from 'mobx'
class A {
  constructor() {
    autorun(() => {
      console.log(this.username)
    }, { delay: 1000 })
  }
}
```







