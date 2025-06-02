/// <reference types="../PLand-LegacyRemoteCallApi/lib/esm/imports/PLand.d.ts" />

import { PLand } from "./plugins/PLand-LegacyRemoteCallApi/lib/esm/imports/PLand.js";

PLand.getLands().map((land) => {
  logger.info(`Land ID: ${land.mLandID}`);
});
