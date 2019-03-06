# cashier

> Web for cashiers

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Probloms Ever Met
- **跨域访问**：（服务端使用`Spring Boot`）在`Controller`上添加注解`@CrossOrigin`以允许所有跨域访问
- **axios回调函数中`this`为`undefined`**：采用`() => {}`的函数声明方式

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
