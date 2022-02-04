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