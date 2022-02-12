import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  devServer: {
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'https://lianghj.top:8888/api/private/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
// module.exports = {
//     css: {
//         loaderOptions: {
//           sass: {
//             // 8版本用prependData:
//             prependData: `
//               @import "@/styles/variables.scss";  // scss文件地址
//               @import "@/styles/mixin.scss";     // scss文件地址
//             `
//           }
//         }
//       }
// }