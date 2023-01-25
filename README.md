# vite-plugin-practice

## 1. CreateHtmlPlugin

### 1.1. 作用

    转换html模板，将html模板中的 ejs 占位符替换为对应的值

### 1.2. 使用

    1. 安装

    ```bash
    npm i create-html-plugin -D
    ```

    2. 配置

    ```js
    import CreateHtmlPlugin from 'create-html-plugin'
    export default defineConfig({
      plugins: [
        CreateHtmlPlugin({
          inject: {
            data: {
              title: 'vite-plugin-practice',
              description: 'vite-plugin-practice',
              keywords: 'vite-plugin-practice',
            },
          }
        })]
      })
    ```
