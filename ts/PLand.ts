import {
  LandID,
  LandPermType,
  LDAPI_IMPORTS,
  UUIDs,
  IsType,
  Global_NameSpace,
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
  /** 允许攻击怪物 */ allowAttackMonster: boolean;
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
  /** 允许幽匿尖啸体生长 */ allowSculkBlockGrowth: boolean;
  /** 允许怪物生成 */ allowMonsterSpawn: boolean;
  /** 允许动物生成 */ allowAnimalSpawn: boolean;

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
  get mPos(): LandPos {
    const v = LDAPI_IMPORTS.LandData_mPos(this.unique_id);
    if (v.length !== 2) {
      throw new Error("Invalid LandPos");
    }
    return new LandPos(v[0], v[1]);
  }
  get mTeleportPos(): IntPos {
    return LDAPI_IMPORTS.LandData_mTeleportPos(this.unique_id);
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
  get mIsConvertedLand(): boolean {
    return LDAPI_IMPORTS.LandData_mIsConvertedLand(this.unique_id);
  }
  get mOwnerDataIsXUID(): boolean {
    return LDAPI_IMPORTS.LandData_mOwnerDataIsXUID(this.unique_id);
  }
  get mParentLandID(): number {
    return LDAPI_IMPORTS.LandData_mParentLandID(this.unique_id);
  }
  get mSubLandIDs(): number[] {
    return LDAPI_IMPORTS.LandData_mSubLandIDs(this.unique_id);
  }

  getLandPos(): LandPos {
    return this.mPos;
  }
  getLandID(): LandID {
    return this.mLandID;
  }
  getLandDimid(): number {
    return this.mLandDimid;
  }
  getSalePrice(): number {
    return this.mSalePrice;
  }
  getLandPermTable(): LandPermTable | null {
    return this.mLandPermTable;
  }
  getLandPermTableConst(): LandPermTable | null {
    return this.mLandPermTable;
  }
  getLandOwner(): string {
    return this.mLandOwner;
  }
  getLandMembers(): string[] {
    return this.mLandMembers;
  }
  getLandName(): string {
    return this.mLandName;
  }
  getLandDescribe(): string {
    return this.mLandDescribe;
  }

  is3DLand(): boolean {
    return this.mIs3DLand;
  }
  isLandOwner(uuid: UUIDs): boolean {
    return this.mLandOwner === uuid;
  }
  isLandMember(uuid: UUIDs): boolean {
    return this.mLandMembers.includes(uuid);
  }
  isSaleing(): boolean {
    return this.mIsSaleing;
  }

  setSaleing(isSaleing: boolean): boolean {
    return LDAPI_IMPORTS.LandData_setSaleing(this.unique_id, isSaleing);
  }
  setIs3DLand(is3D: boolean): boolean {
    return LDAPI_IMPORTS.LandData_setIs3DLand(this.unique_id, is3D);
  }
  setLandOwner(uuid: string): boolean {
    return LDAPI_IMPORTS.LandData_setLandOwner(this.unique_id, uuid);
  }
  setSalePrice(price: number): boolean {
    return LDAPI_IMPORTS.LandData_setSalePrice(this.unique_id, price);
  }
  setLandName(name: string): boolean {
    return LDAPI_IMPORTS.LandData_setLandName(this.unique_id, name);
  }
  setLandDescribe(describe: string): boolean {
    return LDAPI_IMPORTS.LandData_setLandDescribe(this.unique_id, describe);
  }

  /**
   * @private 更改领地范围
   * @warning 更改后需要调用 `PLand.refreshLandRange()` 刷新缓存
   */
  _setLandPos(pos: LandPos): boolean {
    return LDAPI_IMPORTS.LandData__setLandPos(
      this.unique_id,
      pos.mMin_A,
      pos.mMax_B
    );
  }

  addLandMember(uuid: string): boolean {
    return LDAPI_IMPORTS.LandData_addLandMember(this.unique_id, uuid);
  }
  removeLandMember(uuid: string): boolean {
    return LDAPI_IMPORTS.LandData_removeLandMember(this.unique_id, uuid);
  }

  isRadiusInLand(pos: IntPos, radius: number): boolean {
    return LDAPI_IMPORTS.LandData_isRadiusInLand(this.unique_id, pos, radius);
  }
  isAABBInLand(pos1: IntPos, pos2: IntPos): boolean {
    return LDAPI_IMPORTS.LandData_isAABBInLand(this.unique_id, pos1, pos2);
  }
  getPermType(uuid: UUIDs): LandPermType {
    return LDAPI_IMPORTS.LandData_getPermType(this.unique_id, uuid);
  }

  hasParentLand(): boolean {
    return LDAPI_IMPORTS.LandData_hasParentLand(this.unique_id);
  }
  hasSubLand(): boolean {
    return LDAPI_IMPORTS.LandData_hasSubLand(this.unique_id);
  }
  isSubLand(): boolean {
    return LDAPI_IMPORTS.LandData_isSubLand(this.unique_id);
  }
  isParentLand(): boolean {
    return LDAPI_IMPORTS.LandData_isParentLand(this.unique_id);
  }
  isMixLand(): boolean {
    return LDAPI_IMPORTS.LandData_isMixLand(this.unique_id);
  }
  isOrdinaryLand(): boolean {
    return LDAPI_IMPORTS.LandData_isOrdinaryLand(this.unique_id);
  }
  canCreateSubLand(): boolean {
    return LDAPI_IMPORTS.LandData_canCreateSubLand(this.unique_id);
  }
  getParentLand(): LandData | null {
    const id = LDAPI_IMPORTS.LandData_getParentLand(this.unique_id);
    if (id === -1) {
      return null;
    }
    return new LandData(id);
  }
  getSubLands(): LandData[] {
    return LDAPI_IMPORTS.LandData_getSubLands(this.unique_id).map(
      (id: LandID) => new LandData(id)
    );
  }
  getNestedLevel(): number {
    return LDAPI_IMPORTS.LandData_getNestedLevel(this.unique_id);
  }
  getRootLand(): LandData | null {
    const id = LDAPI_IMPORTS.LandData_getRootLand(this.unique_id);
    if (id === -1) {
      return null;
    }
    return new LandData(id);
  }
}

/**
 * @warning 请不要增加、删除 key，否则会导致反射失败
 */
export type PlayerSettings = {
  /** 是否显示进入领地提示 */ showEnterLandTitle: boolean;
  /** 是否持续显示底部提示 */ showBottomContinuedTip: boolean;
  /** 玩家语言 */ localeCode: string | "system" | "server";
};

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

  static hasPlayerSettings(uuid: string): boolean {
    return LDAPI_IMPORTS.PLand_hasPlayerSettings(uuid);
  }

  static getPlayerSettings(uuid: string): PlayerSettings | null {
    // 由于RemoteCall不支持Varint，这里采用JSON字符串传输
    const jsonStr = LDAPI_IMPORTS.PLand_getPlayerSettings(uuid);
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      logger.error(`Failed to parse player settings: ${jsonStr}`);
      return null;
    }
  }

  static setPlayerSettings(uuid: string, settings: PlayerSettings): boolean {
    const jsonStr = JSON.stringify(settings);
    return LDAPI_IMPORTS.PLand_setPlayerSettings(uuid, jsonStr);
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

  static refreshLandRange(land: LandData): void {
    // @ts-ignore
    LDAPI_IMPORTS.PLand_refreshLandRange(land.unique_id);
  }
}

// Event 实现
export type EventType =
  | "PlayerEnterLandEvent"
  | "PlayerLeaveLandEvent"
  | "PlayerAskCreateLandBeforeEvent"
  | "PlayerAskCreateLandAfterEvent"
  | "PlayerBuyLandBeforeEvent"
  | "PlayerBuyLandAfterEvent"
  | "PlayerDeleteLandBeforeEvent"
  | "PlayerDeleteLandAfterEvent"
  | "LandMemberChangeBeforeEvent"
  | "LandMemberChangeAfterEvent"
  | "LandOwnerChangeBeforeEvent"
  | "LandOwnerChangeAfterEvent"
  | "LandRangeChangeBeforeEvent"
  | "LandRangeChangeAfterEvent";

type EventParams = {
  PlayerEnterLandEvent: [player: Player, landID: LandID];
  PlayerLeaveLandEvent: [player: Player, landID: LandID];
  PlayerAskCreateLandBeforeEvent: [player: Player];
  PlayerAskCreateLandAfterEvent: [player: Player, is3DLand: boolean];
  PlayerBuyLandBeforeEvent: [
    player: Player,
    price: number,
    posA: IntPos,
    posB: IntPos,
    is3DLand: boolean
  ];
  PlayerBuyLandAfterEvent: [player: Player, landID: LandID];
  PlayerDeleteLandBeforeEvent: [
    player: Player,
    landID: LandID,
    refundPrice: number
  ];
  PlayerDeleteLandAfterEvent: [player: Player, landID: LandID];
  LandMemberChangeBeforeEvent: [
    player: Player,
    targetPlayer: UUIDs, // 目标玩家 (被添加/移除的玩家)
    landID: LandID,
    isAdd: boolean
  ];
  LandMemberChangeAfterEvent: [
    player: Player,
    targetPlayer: UUIDs, // 目标玩家 (被添加/移除的玩家)
    landID: LandID,
    isAdd: boolean
  ];
  LandOwnerChangeBeforeEvent: [playe: Player, newOwner: Player, landID: LandID];
  LandOwnerChangeAfterEvent: [playe: Player, newOwner: Player, landID: LandID];
  LandRangeChangeBeforeEvent: [
    player: Player,
    landID: LandID,
    newPosA: IntPos, // 新的范围A点
    newPosB: IntPos, // 新范围B点
    needPay: number, // 需要支付的金额
    refundPrice: number // 退款的金额
  ];
  LandRangeChangeAfterEvent: [
    player: Player,
    landID: LandID,
    newPosA: IntPos, // 新的范围A点
    newPosB: IntPos, // 新范围B点
    needPay: number, // 需要支付的金额
    refundPrice: number // 退款的金额
  ];
};

export class LDEvent {
  constructor() {
    throw new Error("LDEvent is a static class");
  }

  /**
   * 监听事件
   * **注意: 无论事件是否可以拦截，都必须返回一个布尔值, 否则RemoteCall会抛出 `bad_variant_access`**
   * **`true`: 放行 / `false` 拦截(由事件决定)**
   * @param event 事件类型
   * @param callback 回调函数
   * @returns 是否成功注册
   */
  static listen<T extends EventType>(
    event: T,
    callback: (...args: EventParams[T]) => boolean
  ): boolean {
    const id = LDAPI_IMPORTS.ScriptEventManager_genListenerID();
    ll.exports(callback, event, id);
    const ok = LDAPI_IMPORTS.Event_RegisterListener(event, id);
    if (!ok) {
      throw new Error("Failed to register listener for event " + event);
    }
    return ok;
  }
}

export class LandPos {
  mMin_A: IntPos;
  mMax_B: IntPos;

  constructor(pos_a: IntPos, pos_b: IntPos) {
    this.mMin_A = pos_a;
    this.mMax_B = pos_b;
  }

  fix(): void {
    const v = LDAPI_IMPORTS.LandPos_fix(this.mMin_A, this.mMax_B);
    this.mMin_A = v[0];
    this.mMax_B = v[1];
  }

  getDepth(): number {
    return LDAPI_IMPORTS.LandPos_getDepth(this.mMin_A, this.mMax_B);
  }
  getHeight(): number {
    return LDAPI_IMPORTS.LandPos_getHeight(this.mMin_A, this.mMax_B);
  }
  getWidth(): number {
    return LDAPI_IMPORTS.LandPos_getWidth(this.mMin_A, this.mMax_B);
  }
  getSquare(): number {
    return LDAPI_IMPORTS.LandPos_getSquare(this.mMin_A, this.mMax_B);
  }
  getVolume(): number {
    return LDAPI_IMPORTS.LandPos_getVolume(this.mMin_A, this.mMax_B);
  }

  toString(): string {
    return LDAPI_IMPORTS.LandPos_toString(this.mMin_A, this.mMax_B);
  }

  /**
   * 获取领地边框 (立体矩形)
   * @returns 领地边框点列表
   */
  getBorder(): IntPos[] {
    return LDAPI_IMPORTS.LandPos_getBorder(this.mMin_A, this.mMax_B);
  }

  /**
   * 获取领地范围 (平面矩形)
   * @returns 领地范围点列表
   */
  getRange(): IntPos[] {
    return LDAPI_IMPORTS.LandPos_getRange(this.mMin_A, this.mMax_B);
  }

  hasPos(pos: IntPos, ignoreY = false): boolean {
    return LDAPI_IMPORTS.LandPos_hasPos(this.mMin_A, this.mMax_B, pos, ignoreY);
  }

  /**
   * 两个领地是否碰撞 (重合)
   * @param pos1 领地1
   * @param pos2 领地2
   * @returns 是否碰撞
   */
  static isCollision(pos1: LandPos, pos2: LandPos): boolean {
    return LDAPI_IMPORTS.LandPos_isCollision(
      pos1.mMin_A,
      pos1.mMax_B,
      pos2.mMin_A,
      pos2.mMax_B
    );
  }

  /**
   * 两个领地是否满足最小间距
   * @param pos1 领地1
   * @param pos2 领地2
   * @param ignoreY 是否忽略Y轴
   * @returns 是否满足最小间距
   */
  static isComplisWithMinSpacing(
    pos1: LandPos,
    pos2: LandPos,
    ignoreY = false
  ): boolean {
    return LDAPI_IMPORTS.LandPos_isComplisWithMinSpacing(
      pos1.mMin_A,
      pos1.mMax_B,
      pos2.mMin_A,
      pos2.mMax_B,
      ignoreY
    );
  }

  /**
   * @brief 判断一个 AABB 区域是否完整包含另一个 AABB 区域
   * 如果目标 AABB 在源 AABB 内，则返回 true，否则返回 false
   */
  static isContain(pos1: LandPos, pos2: LandPos): boolean {
    return LDAPI_IMPORTS.LandPos_isContain(
      pos1.mMin_A,
      pos1.mMax_B,
      pos2.mMin_A,
      pos2.mMax_B
    );
  }
}
