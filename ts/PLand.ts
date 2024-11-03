/// <reference path="D:/Projects/HelperLib/src/index.d.ts" />
import { LandID, LandPermType, LDAPI_IMPORTS, UUIDs } from "./Global.js";

type Js_Type =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "function"
  | "symbol"
  | "undefined";
const IsType = (obj: any, type: Js_Type) =>
  Object.prototype.toString.call(obj) === `[object ${type}]`;

export class LandData {
  private mLandID: LandID;

  /**
   * 请不要直接构造LandData对象，请从PLand中获取
   * @param landID 领地ID
   */
  constructor(landID: LandID) {
    this.mLandID = landID;
  }
}

export class PLand {
  constructor() {
    throw new Error("PLand is a static class");
  }

  static isOperator(uuid: string): boolean {
    return LDAPI_IMPORTS.PLand_isOperator(uuid);
  }

  static addOperator(uuid: string): boolean {
    return LDAPI_IMPORTS.PLand_addOperator(uuid);
  }

  static removeOperator(uuid: string): boolean {
    return LDAPI_IMPORTS.PLand_removeOperator(uuid);
  }

  static hasLand(id: LandID): boolean {
    return LDAPI_IMPORTS.PLand_hasLand(id);
  }

  static getLand(landID: LandID): LandData | null {
    const id = LDAPI_IMPORTS.PLand_getLand(landID);
    if (id === -1) {
      return null;
    }
    return new LandData(id);
  }

  static removeLand(landID: LandID): boolean {
    return LDAPI_IMPORTS.PLand_removeLand(landID);
  }

  /**
   * getLands() // 获取所有领地
   * getLands(dimid) // 获取指定维度所有领地
   * getLands(uuid)  // 获取指定玩家所有领地
   * getLands(uuid, dimid) // 获取指定玩家在指定维度所有领地
   */
  static getLands(...args: any[]): LandData[] {
    if (args.length === 0) {
      // getLands() const;
      return LDAPI_IMPORTS.PLand_getLands().map(
        (id: LandID) => new LandData(id)
      );
    } else if (args.length === 1 && IsType(args[0], "number")) {
      // getLands(LandDimid dimid) const;
      return LDAPI_IMPORTS.PLand_getLands1(args[0]).map(
        (id: LandID) => new LandData(id)
      );
    } else if (args.length === 1 && IsType(args[0], "string")) {
      // getLands(UUIDs const& uuid) const;
      return LDAPI_IMPORTS.PLand_getLands2(args[0]).map(
        (id: LandID) => new LandData(id)
      );
    } else if (
      args.length === 2 &&
      IsType(args[0], "string") &&
      IsType(args[1], "number")
    ) {
      // getLands(UUIDs const& uuid, LandDimid dimid) const;
      return LDAPI_IMPORTS.PLand_getLands3(args[0], args[1]).map(
        (id: LandID) => new LandData(id)
      );
    } else {
      throw new Error("Invalid arguments");
    }
  }

  static getPermType(
    uuid: UUIDs,
    landID = 0,
    ignoreOperator = false
  ): LandPermType {
    return LDAPI_IMPORTS.PLand_getPermType(uuid, landID, ignoreOperator);
  }
}
