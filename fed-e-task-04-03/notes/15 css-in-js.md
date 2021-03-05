# CSS-IN-JS

## 背景

将css捆绑在js代码, 旨在解决css的局限性

- 缺乏动态功能
- 作用域
- 可移植性

### 优点

- 允许css代码有独立的作用域, 防止泄露和冲突
- 提高可移植性, 方便创建松耦合程序
- 提高可重用性, 方便在任何其他地方复用组件
- 让样式具有动态功能, 支持在样式上应用复杂逻辑

### 缺点

- 提高复杂性
- 自动生成的选择器降低了代码的可读性

## emotion

提供css-in-js方法: `npm i @emotion/core @emotion/styled`

然后在组件中添加属性`css={{ width: 100px }}`配置css, 需要配置babel解析css语法:

1. jsx, 通知babel不再将jsx语法解析为`React.createElement`方法, 而是转化为jsx方法, 需要在使用到的地方引用jsx

   ```js
   /** @jsx jsx */
   import { jsx } from '@emotion/core';
   
   // React.createElement('div', ...) => jsx('div', ...)
   ```

2. 使用babel预设`@emotion/babel-preset-css-prop`

   ```js
   npm run eject
   // package.json
   "presets": [
     "@emotion/babel-preset-css-group"
   ]
   ```

### 使用

支持&表示当前元素语法

```tsx
import { css } from '@emotion/core';
const style1 = css`
  width: 100px;
`;
const style2 = css({
  width: 100px;
})

import styled from '@emotion/styled'
const btn = styled.button`...`
const ctn = styled.div({...})
export () => <btn .../>

// props 覆盖样式
const btn = styled.button`
  width: 100px;
  background: ${props => props.bg || 'blue' }
  & > span {
    color: red;
  }
`
const ctn = styled.div({ ...baseStyle }, props => { ...coverStyle })

// 为组件添加样式
const my = ({name}) => <div>{ name }</div>
const redMy = styled(my)`color: red`
```

### 优先级

组件props优先级高于css的, 即`<component css={...}`中的样式会覆盖组件内部定义的样式

### 父组件覆盖样式

```js
const child = styled.div`
  color: green;
`;
const parent = styled.div`
  ${child} {
    color: red
  }`
// 这样parent下的child组件就会被修改样式
```

### as

需要使用样式, 但更改元素类型

`<styledButton as="a" href="#"> a </styledButton>`

### 组合样式

css可以用数组赋值, 后面的优先级高于前面 `<div css={[style1, style]} />`

### 全局样式

使用Global方法

```tsx
import { Global } from '@emotion/core'
return <Global styles={styles}> <child></child> </Global>
```

### 动画

提供了`keyframes`替代css中的`@keyframes`关键字

```js
import { css, keyframes } from '@emotion/core';
const move = keyframes`
  0% { ... }
  100% { ... }
`
const box = css`animation: ${move} 1s ease`
```

### 主题

`npm i emotion/theming`

```tsx
import { ThemeProvider, useTheme } from 'emotion-theming'
const theme = {
  colors: { primary: 'blue' }
}
const getThemeStyle = props => css`
  color: ${props.colors.primary}
`
function App () { return <ThemeProvider theme={theme}><App></App></ThemeProvider>}

function Comp () { const theme = useTheme(); return <div css={getThemeStyle}></div>}
```

# Chakra-UI

1. 内置Emotion, css-in-js集大成者
2. 基于[styled-systems](https://styled-system.com)
3. 主题开箱即用, 默认支持白天黑夜模式
4. 有大量功能丰富的组件
5. 响应式设计, 文档全面

```tsx
npm i @chakra-ui/core@1.0.0-next.2 @chakra-ui/theme

import { ChakraProvider, CSSReset } from '@chakra-ui/core';
import theme from '@chakra-ui/theme';

<ChakraProvider theme={theme}>
  <CSSReset />
  <App/>
</ChakraProvider>
```

## [style-props](https://chakra-ui.com/docs/features/style-props#margin-and-padding)

## 主题

默认组件都支持浅色模式和暗色模式, 通过`useColorMode`钩子进行切换

模式存储在localStorage中实现持久化, 并在顶层元素通过class来实现

```tsx
import { useColorMode } from '@chakra-ui/core'
const [colorMode, toggleColorMode] = useColorMode();
```

使用[`useColorModeValue`](https://chakra-ui.com/docs/features/color-mode#usecolormodevalue)钩子获得根据颜色模式变化的style

```tsx
const value = useColorModeValue(lightModeValue, darkModeValue)
```

使用`LightMode/DarkMode`组件包围组件, 实现强制摸个组件保持在某个颜色模式下

### 主题对象

`import theme from "@chakra-ui/theme"`

设置颜色模式

```tsx
theme.config.initialColorMode = 'dark'
theme.config.useSystemColorMode = true;
```

颜色

```tsx
theme.colors.red.500
<Box bgColor="red.500" />
```

间距

```js
theme.sizes: { 0: '0', 1: '0.25rem', }, // 用于width等
theme.space: { 0: '0', 1: '0.25rem', }, // 用于padding, marggin等
theme.shadows: { md, none, }, //用于 box-shadow, text-shadow
```

### 媒体查询

`theme.breakpoints`数组中设置了移动优先的媒体查询断点: `[30em 48em, 62em, 80em]`

设置属性时传入数组, 则第一个是默认值, 剩下的按序匹配到媒体查询断点上: `<Box fonrSize={['12px', '14px', '16px', '18px', '20px']}`

## 创建自定义组件

```tsx
// myComponent/button.js
const myButton = chakra('button', {
  baseStyle: {},
  sizes: {},
  variants: {}, // 风格化样式
  defaultProps: {}
})
export default myButton;

// myComponent/index.js
import MyButton from './button';
export {
  MyButton
}

// ./src/index.js
const myTheme = {
  ...theme,
  components: {
    ...theme.components,
    ...MyComponents
  }
}
<ChakraProvider theme={myTheme} >...</ChakraProvider>

// page.tsx
const MyButton = chakra('button', { themeKey: 'MyButton' })
<MyButton size={} variant={} />
```



















   

   

   

   