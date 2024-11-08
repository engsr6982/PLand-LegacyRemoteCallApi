# PLand-LegacyRemoteCallApi

PLand 的 LegacyRemoteCallApi 实现，用于在 LegacyScriptEngine-QuickJs 中调用 PLand 的 API。

> **注意：**  
> 本项目仅对 PLand C++ API 进行封装，不包含 PLand 的任何代码，请确保您已经安装了 PLand。

## 示例

```js
import {
  PLand,
  LDEvent,
} from "./plugins/PLand-LegacyRemoteCallApi/lib/PLand.js";

// 调用API
PLand.getLands().map((land) => {
  logger.info("Land: " + land.mLandName);
});

// 监听事件
LDEvent.listen("PlayerEnterLandEvent", (player, landID) => {
  logger.info("Player " + player.realName + " entered land " + landID);
});
```
