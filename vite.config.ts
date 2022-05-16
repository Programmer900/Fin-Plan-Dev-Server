import path from 'path';
import { defineConfig } from 'vite';
const { resolve } = require('path')
import Vue from '@vitejs/plugin-vue';
import viteSSR from 'vite-ssr/plugin';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
// import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  base: '/',
  build: {
    target: 'es2015',
    outDir: path.join(__dirname, '_app/dist'),
    assetsInlineLimit: 10000,
    sourcemap: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: `${path.resolve(__dirname, 'src')}/` }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/_vars/index.scss";
          @import "@/assets/scss/_mixins/index.scss";
        `,
        sourceMap: true,
      },
    },
  },
  plugins: [
    viteSSR(),
    Vue({
      include: [/\.vue$/],
    }),

    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
        'vuex',
        {
          axios: [
            // default imports
            ['default', 'axios'], // import { default as axios } from 'axios',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
    }),

    // WindiCSS(),

    // Components({
    //   // allow auto load markdown components under `./src/components/`
    //   extensions: ['vue'],
    //
    //   // allow auto import and register components used in markdown
    //   include: [/\.vue$/, /\.vue\?vue/],
    //
    //   dts: 'src/components.d.ts',
    // }),
  ],

  server: {
    fs: {
      strict: true,
    },
  },

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    exclude: ['vue-demi'],
  },
});
