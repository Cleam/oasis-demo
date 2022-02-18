import type { ConfigEnv, UserConfig } from 'vite';
import { wrapperEnv, pathResolve } from './build/utils';
import { createProxy } from './build/proxy';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import html from 'vite-plugin-html';
// import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  // loadEnv 将所有变量值当字符串处理，wrapperEnv将字符串转成对应的类型（如boolean）
  const viteEnv = wrapperEnv(loadEnv(mode, root));
  // VITE_BUILD_DIR 如果未undefined， npm run dev报错：TypeError: Cannot read properties of undefined (reading 'startsWith')
  const { VITE_PORT, VITE_PROXY, VITE_BUILD_DIR = '', VITE_DROP_CONSOLE, VITE_APP_ENV } = viteEnv;
  const isPro = VITE_APP_ENV === 'production';
  const isTesting = VITE_APP_ENV === 'testing';

  // console.log(process.env);

  const config: UserConfig = {
    root,
    base: './', // 默认 "/"
    define: {
      // 全局变量
      __SENTRY_RELEASE__: JSON.stringify(
        require('child_process').execSync('git rev-parse HEAD').toString().trim()
      ),
    },
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      // 监听本地所有IP
      host: true,
      port: VITE_PORT,
      // 本地跨域代理
      proxy: createProxy(VITE_PROXY),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log'] : [],
    },
    build: {
      outDir: VITE_BUILD_DIR,
      target: 'es2015',
      // chunk 大小警告的限制，默认：500
      chunkSizeWarningLimit: 1000,
      sourcemap: isPro ? true : 'hidden',
      // // sourcemap: 'hidden', // 暂时不需要 sourcemap
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     // 生产环境删除console 和 debugger
      //     drop_console: VITE_DROP_CONSOLE,
      //     drop_debugger: VITE_DROP_CONSOLE,
      //   },
      // },
    },
    plugins: [
      vue(),
      html({
        inject: {
          data: {
            ...viteEnv,
            injectScript:
              !isPro && !isTesting
                ? `<script src="./js/eruda.min.js"></script>
                <script>eruda.init();</script>`
                : '',
          },
        },
        minify: isPro,
      }),
      // WindiCSS()
    ],
    // optimizeDeps: {
    //   // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。
    //   // include: ['ant-design-vue/es/locale/zh_CN'],
    //   // 在预构建中强制排除的依赖项。
    //   // exclude: ['vue-demi'],
    // },
  };

  return config;
});
