# PLand-LegacyRemoteCallApi

PLand 的 LegacyRemoteCallApi 实现，用于在 LegacyScriptEngine-QuickJs 中调用 PLand 的 API。

> **注意：**  
> 本项目仅对 PLand C++ API 进行封装，不包含 PLand 的任何代码，请确保您已经安装了 PLand。  
> 由于引擎限制，无法做到原生持有 Native 对象，因此采用了一些折衷方案，对于大型项目存在性能问题，建议大型项目使用 C++ API。

## 示例

- JavaScript

```js
// 当前Js所在路径为 bds/plugins/<插件名>/<插件名>.js
// 假设当前插件名为 template.js

// 以下为 导入 补全库
/// <reference path="../PLand-LegacyRemoteCallApi/lib/PLand.d.ts" />
/// <reference path="../PLand-LegacyRemoteCallApi/lib/Global.d.ts" />

// 这里导入 HelperLib 补全库，路径填写你的 HelperLib 补全库所在路径
/// <reference path="D:/Projects/HelperLib/src/index.d.ts" />

// 由于 PLand 的封装是 ESM 导出，因此需要使用 import 语法导入
// 由于 LSE 引擎的一些问题，路径必须以 ./plugins/ 开头，结尾必须以 .js 结尾
import {
  LDEvent,
  PLand,
} from "./plugins/PLand-LegacyRemoteCallApi/lib/PLand.js";

// 获取所有领地
PLand.getLands().map((land) => {
  logger.info(land.mLandName); // 打印当前领地名称
});

// 监听玩家进入领地事件
// 如果需要拦截事件，返回 false 即可
// 注意：部分事件不可拦截，具体查看 PLand 文档
LDEvent.listen("PlayerEnterLandEvent", (pl, landID) => {
  logger.info(
    `玩家 '${pl.realName}' 进入领地: ${PLand.getLand(landID).mLandName}`
  );
});

// 注意：由于插件加载顺序问题，需要在当前插件的 manifest.json 中设置依赖项，否则无法正确导入
// 例如：
// {
//     "entry": "template.js",
//     "name": "template",
//     "type": "lse-quickjs",
//     "dependencies": [
//         {
//             "name": "legacy-script-engine-quickjs"
//         },
//         {
//             "name": "PLand-LegacyRemoteCallApi"
//         }
//     ]
// }
```

- TypeScript

TypeScript 和 JavaScript 基本一致，只需要配置好 tsconfig.json 即可。

假设您的工程目录如下：

```file
./
├── HelperLib/
├── src/
│   └── index.ts
└── tsconfig.json
```

tsconfig.json 配置如下：

```json
{
  "include": [
    "./src/**.ts", // src 目录下的所有 .ts 文件
    "HelperLib/src/index.d.ts" // HelperLib 补全库
  ],
  "compilerOptions": {
    "outDir": "./dist", // 编译输出目录
    "target": "ES2022", // 编译目标 ES2022
    "module": "ES6", // ES6 模块化
    "skipLibCheck": true, // 跳过声明文件的类型检查
    "lib": ["ES2022"], // 只包含 ES2022 库，不包含 DOM
    "types": [] // 不包含任何默认的类型定义
  }
}
```
