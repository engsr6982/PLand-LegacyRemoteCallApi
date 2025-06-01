// 导入定义

const ExportNamespace = "PLand_LDAPI"; // ExportDef.h
export const ImportNamespace = ExportNamespace;

export type LandID = number; // uint64_t
export type ChunkID = number; // uint64_t
export type LandDimid = number; // int
export type UUIDs = string; // std::string

export enum LandPermType {
    Operator = 0, // 领地操作员（管理）
    Owner = 1, // 领地主人
    Member = 2, // 领地成员
    Guest = 3, // 访客
}

// 工具函数

export type JsType =
    | "String"
    | "Number"
    | "Boolean"
    | "Object"
    | "Function"
    | "Symbol"
    | "Undefined";
export const IsType = (obj: any, type: JsType) =>
    Object.prototype.toString.call(obj) === `[object ${type}]`;
