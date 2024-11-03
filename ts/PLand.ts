/// <reference path="D:/Projects/HelperLib/src/index.d.ts" />
import {
  LandID,
  LandPermType,
  LDAPI_IMPORTS,
  UUIDs,
  IsType,
} from "./Global.js";

export type LandPermTable = {
  /** 火焰蔓延 */ allowFireSpread: boolean;
  /** 攻击龙蛋 */ allowAttackDragonEgg: boolean;
  /** 耕地退化 */ allowFarmDecay: boolean;
  /** 活塞推动 */ allowPistonPush: boolean;
  /** 红石更新 */ allowRedstoneUpdate: boolean;
  /** 爆炸 */ allowExplode: boolean;
  /** 允许破坏 */ allowDestroy: boolean;
  /** 允许凋零破坏 */ allowWitherDestroy: boolean;
  /** 允许放置 [x] */ allowPlace: boolean;
  /** 允许攻击玩家 */ allowAttackPlayer: boolean;
  /** 允许攻击动物 */ allowAttackAnimal: boolean;
  /** 允许攻击怪物 */ allowAttackMob: boolean;
  /** 允许打开箱子 */ allowOpenChest: boolean;
  /** 允许拾取物品 */ allowPickupItem: boolean;
  /** 允许投掷雪球 */ allowThrowSnowball: boolean;
  /** 允许投掷末影珍珠 */ allowThrowEnderPearl: boolean;
  /** 允许投掷鸡蛋 */ allowThrowEgg: boolean;
  /** 允许投掷三叉戟 */ allowThrowTrident: boolean;
  /** 允许丢弃物品 */ allowDropItem: boolean;
  /** 允许射击 [x] */ allowShoot: boolean;
  /** 允许投掷药水 [x] */ allowThrowPotion: boolean;
  /** 允许骑乘实体 */ allowRideEntity: boolean;
  /** 允许骑乘矿车、船 */ allowRideTrans: boolean;
  /** 允许斧头去皮 */ allowAxePeeled: boolean;
  /** 允许攻击末地水晶 */ allowAttackEnderCrystal: boolean;
  /** 允许破坏盔甲架 */ allowDestroyArmorStand: boolean;
  /** 允许液体流动 */ allowLiquidFlow: boolean;

  /** 使用铁砧 */ useAnvil: boolean;
  /** 使用木桶 */ useBarrel: boolean;
  /** 使用信标 */ useBeacon: boolean;
  /** 使用床 */ useBed: boolean;
  /** 使用钟 */ useBell: boolean;
  /** 使用高炉 */ useBlastFurnace: boolean;
  /** 使用酿造台 */ useBrewingStand: boolean;
  /** 使用营火 */ useCampfire: boolean;
  /** 使用打火石 */ useFiregen: boolean;
  /** 使用制图台 */ useCartographyTable: boolean;
  /** 使用堆肥桶 */ useComposter: boolean;
  /** 使用工作台 */ useCraftingTable: boolean;
  /** 使用阳光探测器 */ useDaylightDetector: boolean;
  /** 使用发射器 */ useDispenser: boolean;
  /** 使用投掷器 */ useDropper: boolean;
  /** 使用附魔台 */ useEnchantingTable: boolean;
  /** 使用门 */ useDoor: boolean;
  /** 使用栅栏门 */ useFenceGate: boolean;
  /** 使用熔炉 */ useFurnace: boolean;
  /** 使用砂轮 */ useGrindstone: boolean;
  /** 使用漏斗 */ useHopper: boolean;
  /** 使用唱片机 */ useJukebox: boolean;
  /** 使用织布机 */ useLoom: boolean;
  /** 使用切石机 */ useStonecutter: boolean;
  /** 使用音符盒 */ useNoteBlock: boolean;
  /** 使用潜影盒 */ useShulkerBox: boolean;
  /** 使用锻造台 */ useSmithingTable: boolean;
  /** 使用烟熏炉 */ useSmoker: boolean;
  /** 使用活板门 */ useTrapdoor: boolean;
  /** 使用讲台 */ useLectern: boolean;
  /** 使用炼药锅 */ useCauldron: boolean;
  /** 使用拉杆 */ useLever: boolean;
  /** 使用按钮 */ useButton: boolean;
  /** 使用重生锚 */ useRespawnAnchor: boolean;
  /** 使用物品展示框 */ useItemFrame: boolean;
  /** 使用钓鱼竿 */ useFishingHook: boolean;
  /** 使用桶 */ useBucket: boolean;
  /** 使用压力板 */ usePressurePlate: boolean;
  /** 使用盔甲架 */ useArmorStand: boolean;
  /** 使用骨粉 */ useBoneMeal: boolean;
  /** 使用锄头 */ useHoe: boolean;
  /** 使用锹 */ useShovel: boolean;

  /** 编辑花盆 */ editFlowerPot: boolean;
  /** 编辑告示牌 */ editSign: boolean;
};

export class LandData {
  private unique_id: LandID;

  /**
   * @warning 请不要直接构造LandData对象，请从PLand中获取
   */
  constructor(landID: LandID) {
    this.unique_id = landID;
  }

  get version(): number {
    return LDAPI_IMPORTS.LandData_version(this.unique_id);
  }
  get mPos() {
    return null; // TODO: 导出 LandPos
  }
  get mLandID(): number {
    return LDAPI_IMPORTS.LandData_mLandID(this.unique_id);
  }
  get mLandDimid(): number {
    return LDAPI_IMPORTS.LandData_mLandDimid(this.unique_id);
  }
  get mIs3DLand(): boolean {
    return LDAPI_IMPORTS.LandData_mIs3DLand(this.unique_id);
  }
  get mLandPermTable(): LandPermTable | null {
    const data = LDAPI_IMPORTS.LandData_mLandPermTable(this.unique_id);
    if (data === "null") {
      return null;
    }
    return JSON.parse(data);
  }
  get mLandOwner(): string {
    return LDAPI_IMPORTS.LandData_mLandOwner(this.unique_id);
  }
  get mLandMembers(): string[] {
    return LDAPI_IMPORTS.LandData_mLandMembers(this.unique_id);
  }
  get mLandName(): string {
    return LDAPI_IMPORTS.LandData_mLandName(this.unique_id);
  }
  get mLandDescribe(): string {
    return LDAPI_IMPORTS.LandData_mLandDescribe(this.unique_id);
  }
  get mIsSaleing(): boolean {
    return LDAPI_IMPORTS.LandData_mIsSaleing(this.unique_id);
  }
  get mSalePrice(): number {
    return LDAPI_IMPORTS.LandData_mSalePrice(this.unique_id);
  }
  get mOriginalBuyPrice(): number {
    return LDAPI_IMPORTS.LandData_mOriginalBuyPrice(this.unique_id);
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
    } else if (args.length === 1 && IsType(args[0], "Number")) {
      // getLands(LandDimid dimid) const;
      return LDAPI_IMPORTS.PLand_getLands1(args[0]).map(
        (id: LandID) => new LandData(id)
      );
    } else if (args.length === 1 && IsType(args[0], "String")) {
      // getLands(UUIDs const& uuid) const;
      return LDAPI_IMPORTS.PLand_getLands2(args[0]).map(
        (id: LandID) => new LandData(id)
      );
    } else if (
      args.length === 2 &&
      IsType(args[0], "String") &&
      IsType(args[1], "Number")
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

  /**
   * getLandAt(intPos) // 查询指定位置所在领地 返回 LandData / null
   * getLandAt(intPos, radius) // 查询圆形区域内领地 返回 LandData[]
   * getLandAt(intPos, intPos) // 查询矩形区域内领地 返回 LandData[]
   */
  static getLandAt(...args): LandData | null | LandData[] {
    if (args.length === 1 && IsType(args[0], "Object")) {
      const id = LDAPI_IMPORTS.PLand_getLandAt(args[0]);
      if (id === -1) {
        return null;
      }
      return new LandData(id);
    } else if (
      args.length === 2 &&
      IsType(args[0], "Object") &&
      IsType(args[1], "Number")
    ) {
      return LDAPI_IMPORTS.PLand_getLandAt1(args[0], args[1]).map(
        (id: LandID) => new LandData(id)
      );
    } else if (
      args.length === 2 &&
      IsType(args[0], "Object") &&
      IsType(args[1], "Object")
    ) {
      return LDAPI_IMPORTS.PLand_getLandAt2(args[0], args[1]).map(
        (id: LandID) => new LandData(id)
      );
    } else {
      throw new Error("Invalid arguments");
    }
  }

  static refreshLandRange(land: LandData): boolean {
    // @ts-ignore
    return LDAPI_IMPORTS.PLand_refreshLandRange(land.unique_id);
  }
}
