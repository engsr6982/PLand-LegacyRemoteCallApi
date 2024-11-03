/// <reference path="D:/Projects/HelperLib/src/index.d.ts" />

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
