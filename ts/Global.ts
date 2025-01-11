export const Global_NameSpace = "PLand_LDAPI";

export type LandID = number; // uint64_t
export type ChunkID = number; // uint64_t
export type LandDimid = number; // int
export type UUIDs = string; // string

export enum LandPermType {
  Operator = 0, // 领地操作员（管理）
  Owner = 1, // 领地主人
  Member = 2, // 领地成员
  Guest = 3, // 访客
}

export const LDAPI_IMPORTS = {
  PLand_isOperator: ll.imports(Global_NameSpace, "PLand_isOperator"),
  PLand_addOperator: ll.imports(Global_NameSpace, "PLand_addOperator"),
  PLand_removeOperator: ll.imports(Global_NameSpace, "PLand_removeOperator"),
  PLand_hasPlayerSettings: ll.imports(Global_NameSpace, "PLand_hasPlayerSettings"),
  PLand_getPlayerSettings: ll.imports(Global_NameSpace, "PLand_getPlayerSettings"),
  PLand_setPlayerSettings: ll.imports(Global_NameSpace, "PLand_setPlayerSettings"),
  PLand_getLand: ll.imports(Global_NameSpace, "PLand_getLand"),
  PLand_removeLand: ll.imports(Global_NameSpace, "PLand_removeLand"),
  PLand_hasLand: ll.imports(Global_NameSpace, "PLand_hasLand"),
  PLand_getLands: ll.imports(Global_NameSpace, "PLand_getLands"),
  PLand_getLands1: ll.imports(Global_NameSpace, "PLand_getLands1"),
  PLand_getLands2: ll.imports(Global_NameSpace, "PLand_getLands2"),
  PLand_getLands3: ll.imports(Global_NameSpace, "PLand_getLands3"),
  PLand_getPermType: ll.imports(Global_NameSpace, "PLand_getPermType"),
  PLand_getLandAt: ll.imports(Global_NameSpace, "PLand_getLandAt"),
  PLand_getLandAt1: ll.imports(Global_NameSpace, "PLand_getLandAt1"),
  PLand_getLandAt2: ll.imports(Global_NameSpace, "PLand_getLandAt2"),
  PLand_refreshLandRange: ll.imports(
    Global_NameSpace,
    "PLand_refreshLandRange"
  ),
  // LandData
  LandData_version: ll.imports(Global_NameSpace, "LandData_version"),
  LandData_mLandID: ll.imports(Global_NameSpace, "LandData_mLandID"),
  LandData_mLandDimid: ll.imports(Global_NameSpace, "LandData_mLandDimid"),
  LandData_mIs3DLand: ll.imports(Global_NameSpace, "LandData_mIs3DLand"),
  LandData_mLandPermTable: ll.imports(
    Global_NameSpace,
    "LandData_mLandPermTable"
  ),
  LandData_mLandOwner: ll.imports(Global_NameSpace, "LandData_mLandOwner"),
  LandData_mLandMembers: ll.imports(Global_NameSpace, "LandData_mLandMembers"),
  LandData_mLandName: ll.imports(Global_NameSpace, "LandData_mLandName"),
  LandData_mLandDescribe: ll.imports(
    Global_NameSpace,
    "LandData_mLandDescribe"
  ),
  LandData_mIsSaleing: ll.imports(Global_NameSpace, "LandData_mIsSaleing"),
  LandData_mSalePrice: ll.imports(Global_NameSpace, "LandData_mSalePrice"),
  LandData_mOriginalBuyPrice: ll.imports(
    Global_NameSpace,
    "LandData_mOriginalBuyPrice"
  ),
  LandData_mPos: ll.imports(Global_NameSpace, "LandData_mPos"),
  LandData_mIsConvertedLand: ll.imports(
    Global_NameSpace,
    "LandData_mIsConvertedLand"
  ),
  LandData_mOwnerDataIsXUID: ll.imports(
    Global_NameSpace,
    "LandData_mOwnerDataIsXUID"
  ),
  LandData_setSaleing: ll.imports(Global_NameSpace, "LandData_setSaleing"),
  LandData_setIs3DLand: ll.imports(Global_NameSpace, "LandData_setIs3DLand"),
  LandData_setLandOwner: ll.imports(Global_NameSpace, "LandData_setLandOwner"),
  LandData_setSalePrice: ll.imports(Global_NameSpace, "LandData_setSalePrice"),
  LandData_setLandDescribe: ll.imports(
    Global_NameSpace,
    "LandData_setLandDescribe"
  ),
  LandData_addLandMember: ll.imports(
    Global_NameSpace,
    "LandData_addLandMember"
  ),
  LandData_removeLandMember: ll.imports(
    Global_NameSpace,
    "LandData_removeLandMember"
  ),
  LandData__setLandPos: ll.imports(Global_NameSpace, "LandData__setLandPos"),
  LandData_isRadiusInLand: ll.imports(
    Global_NameSpace,
    "LandData_isRadiusInLand"
  ),
  LandData_isAABBInLand: ll.imports(Global_NameSpace, "LandData_isAABBInLand"),
  LandData_getPermType: ll.imports(Global_NameSpace, "LandData_getPermType"),
  LandData_setLandName: ll.imports(Global_NameSpace, "LandData_setLandName"),

  // Events
  ScriptEventManager_genListenerID: ll.imports(
    Global_NameSpace,
    "ScriptEventManager_genListenerID"
  ),
  Event_RegisterListener: ll.imports(
    Global_NameSpace,
    "Event_RegisterListener"
  ),

  // LandPos
  LandPos_fix: ll.imports(Global_NameSpace, "LandPos_fix"),
  LandPos_getDepth: ll.imports(Global_NameSpace, "LandPos_getDepth"),
  LandPos_getHeight: ll.imports(Global_NameSpace, "LandPos_getHeight"),
  LandPos_getWidth: ll.imports(Global_NameSpace, "LandPos_getWidth"),
  LandPos_getSquare: ll.imports(Global_NameSpace, "LandPos_getSquare"),
  LandPos_getVolume: ll.imports(Global_NameSpace, "LandPos_getVolume"),
  LandPos_toString: ll.imports(Global_NameSpace, "LandPos_toString"),
  LandPos_getBorder: ll.imports(Global_NameSpace, "LandPos_getBorder"),
  LandPos_getRange: ll.imports(Global_NameSpace, "LandPos_getRange"),
  LandPos_hasPos: ll.imports(Global_NameSpace, "LandPos_hasPos"),
  LandPos_isCollision: ll.imports(Global_NameSpace, "LandPos_isCollision"),
  LandPos_isComplisWithMinSpacing: ll.imports(
    Global_NameSpace,
    "LandPos_isComplisWithMinSpacing"
  ),
};

export type Js_Type =
  | "String"
  | "Number"
  | "Boolean"
  | "Object"
  | "Function"
  | "Symbol"
  | "Undefined";
export const IsType = (obj: any, type: Js_Type) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;
