/// <reference types="../PLand-LegacyRemoteCallApi/lib/esm/imports/LandRegistry.d.ts" />

import { LandRegistry } from "./plugins/PLand-LegacyRemoteCallApi/lib/esm/imports/LandRegistry.js";

LandRegistry.getLands().map((land) => {
  logger.info(`Land ID: ${land.mLandID}`);
});
