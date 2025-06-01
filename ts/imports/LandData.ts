import { ImportNamespace, LandID, LandPermType, UUIDs } from "../ImportDef.js";
import { LandAABB } from "./LandAABB.js";

export interface LandPermTable {
    /** 火焰蔓延 */ allowFireSpread: boolean;
    /** 点击龙蛋 */ allowAttackDragonEgg: boolean;
    /** 耕地退化 */ allowFarmDecay: boolean;
    /** 活塞推动 */ allowPistonPushOnBoundary: boolean;
    /** 红石更新 */ allowRedstoneUpdate: boolean;
    /** 爆炸 */ allowExplode: boolean;
    /** 方块掉落 */ allowBlockFall: boolean;
    /** 允许破坏 */ allowDestroy: boolean;
    /** 允许凋零破坏 */ allowWitherDestroy: boolean;
    /** 允许放置 */ allowPlace: boolean;
    /** 允许玩家受伤 */ allowPlayerDamage: boolean;
    /** 允许敌对生物受伤 */ allowMonsterDamage: boolean;
    /** 允许友好、中立生物受伤 */ allowPassiveDamage: boolean;
    /** 允许对特殊实体造成伤害(船、矿车、画等) */ allowSpecialDamage: boolean;
    /** 允许打开箱子 */ allowOpenChest: boolean;
    /** 允许拾取物品 */ allowPickupItem: boolean;
    /** 允许末影人放下方块 */ allowEndermanLeaveBlock: boolean;

    /** 允许丢弃物品 */ allowDropItem: boolean;
    /** 允许投掷物 */ allowProjectileCreate: boolean;
    /** 允许骑乘实体 */ allowRideEntity: boolean;
    /** 允许骑乘矿车、船 */ allowRideTrans: boolean;
    /** 允许斧头去皮 */ allowAxePeeled: boolean;
    /** 允许攻击末地水晶 */ allowAttackEnderCrystal: boolean;
    /** 允许破坏盔甲架 */ allowDestroyArmorStand: boolean;
    /** 允许液体流动 */ allowLiquidFlow: boolean;
    /** 允许幽匿尖啸体生长 */ allowSculkBlockGrowth: boolean;
    /** 允许怪物生成 */ allowMonsterSpawn: boolean;
    /** 允许动物生成 */ allowAnimalSpawn: boolean;
    /** 实体交互 */ allowInteractEntity: boolean;
    /** 实体破坏 */ allowActorDestroy: boolean;
    /** 攻击画 */ allowAttackPainting: boolean;
    /** 攻击矿车 */ allowAttackMinecart: boolean;
    /** 攻击船 */ allowAttackBoat: boolean;

    /** 使用铁砧 */ useAnvil: boolean;
    /** 使用木桶 */ useBarrel: boolean;
    /** 使用信标 */ useBeacon: boolean;
    /** 使用床 */ useBed: boolean;
    /** 使用钟 */ useBell: boolean;
    /** 使用高炉 */ useBlastFurnace: boolean;
    /** 使用酿造台 */ useBrewingStand: boolean;
    /** 使用营火 */ useCampfire: boolean;
    /** 使用打火石 */ useFlintAndSteel: boolean;
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
    /** 使用合成器 */ useCrafter: boolean;
    /** 使用雕纹书架 */ useChiseledBookshelf: boolean;
    /** 吃蛋糕 */ useCake: boolean;
    /** 使用红石比较器 */ useComparator: boolean;
    /** 使用红石中继器 */ useRepeater: boolean;
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
    /** 使用试炼宝库 */ useVault: boolean;
    /** 使用蜂巢蜂箱 */ useBeeNest: boolean;
    /** 放置船 */ placeBoat: boolean;
    /** 放置矿车 */ placeMinecart: boolean;

    /** 编辑花盆 */ editFlowerPot: boolean;
    /** 编辑告示牌 */ editSign: boolean;
}

export class LandData {
    static IMPORTS = {
        LandData_version: ll.imports(ImportNamespace, "LandData_version"),
        LandData_mLandID: ll.imports(ImportNamespace, "LandData_mLandID"),
        LandData_mLandDimid: ll.imports(ImportNamespace, "LandData_mLandDimid"),
        LandData_mIs3DLand: ll.imports(ImportNamespace, "LandData_mIs3DLand"),
        LandData_mLandPermTable: ll.imports(
            ImportNamespace,
            "LandData_mLandPermTable"
        ),
        LandData_mLandOwner: ll.imports(ImportNamespace, "LandData_mLandOwner"),
        LandData_mLandMembers: ll.imports(
            ImportNamespace,
            "LandData_mLandMembers"
        ),
        LandData_mLandName: ll.imports(ImportNamespace, "LandData_mLandName"),
        LandData_mLandDescribe: ll.imports(
            ImportNamespace,
            "LandData_mLandDescribe"
        ),
        LandData_mIsSaleing: ll.imports(ImportNamespace, "LandData_mIsSaleing"),
        LandData_mSalePrice: ll.imports(ImportNamespace, "LandData_mSalePrice"),
        LandData_mOriginalBuyPrice: ll.imports(
            ImportNamespace,
            "LandData_mOriginalBuyPrice"
        ),
        LandData_mPos: ll.imports(ImportNamespace, "LandData_mPos"),
        LandData_mTeleportPos: ll.imports(
            ImportNamespace,
            "LandData_mTeleportPos"
        ),
        LandData_mIsConvertedLand: ll.imports(
            ImportNamespace,
            "LandData_mIsConvertedLand"
        ),
        LandData_mOwnerDataIsXUID: ll.imports(
            ImportNamespace,
            "LandData_mOwnerDataIsXUID"
        ),
        LandData_mParentLandID: ll.imports(
            ImportNamespace,
            "LandData_mParentLandID"
        ),
        LandData_mSubLandIDs: ll.imports(
            ImportNamespace,
            "LandData_mSubLandIDs"
        ),
        LandData_hasParentLand: ll.imports(
            ImportNamespace,
            "LandData_hasParentLand"
        ),
        LandData_hasSubLand: ll.imports(ImportNamespace, "LandData_hasSubLand"),
        LandData_isSubLand: ll.imports(ImportNamespace, "LandData_isSubLand"),
        LandData_isParentLand: ll.imports(
            ImportNamespace,
            "LandData_isParentLand"
        ),
        LandData_isMixLand: ll.imports(ImportNamespace, "LandData_isMixLand"),
        LandData_isOrdinaryLand: ll.imports(
            ImportNamespace,
            "LandData_isOrdinaryLand"
        ),
        LandData_canCreateSubLand: ll.imports(
            ImportNamespace,
            "LandData_canCreateSubLand"
        ),
        LandData_getParentLand: ll.imports(
            ImportNamespace,
            "LandData_getParentLand"
        ),
        LandData_getSubLands: ll.imports(
            ImportNamespace,
            "LandData_getSubLands"
        ),
        LandData_getNestedLevel: ll.imports(
            ImportNamespace,
            "LandData_getNestedLevel"
        ),
        LandData_getRootLand: ll.imports(
            ImportNamespace,
            "LandData_getRootLand"
        ),
        LandData_setSaleing: ll.imports(ImportNamespace, "LandData_setSaleing"),
        LandData_setIs3DLand: ll.imports(
            ImportNamespace,
            "LandData_setIs3DLand"
        ),
        LandData_setLandOwner: ll.imports(
            ImportNamespace,
            "LandData_setLandOwner"
        ),
        LandData_setSalePrice: ll.imports(
            ImportNamespace,
            "LandData_setSalePrice"
        ),
        LandData_setLandDescribe: ll.imports(
            ImportNamespace,
            "LandData_setLandDescribe"
        ),
        LandData_addLandMember: ll.imports(
            ImportNamespace,
            "LandData_addLandMember"
        ),
        LandData_removeLandMember: ll.imports(
            ImportNamespace,
            "LandData_removeLandMember"
        ),
        LandData__setLandPos: ll.imports(
            ImportNamespace,
            "LandData__setLandPos"
        ),
        LandData_isRadiusInLand: ll.imports(
            ImportNamespace,
            "LandData_isRadiusInLand"
        ),
        LandData_isAABBInLand: ll.imports(
            ImportNamespace,
            "LandData_isAABBInLand"
        ),
        LandData_getPermType: ll.imports(
            ImportNamespace,
            "LandData_getPermType"
        ),
        LandData_setLandName: ll.imports(
            ImportNamespace,
            "LandData_setLandName"
        ),
    };

    private unique_id: LandID;

    /**
     * @warning 请不要直接构造LandData对象，请从PLand中获取
     */
    constructor(landID: LandID) {
        this.unique_id = landID;
    }

    get version(): number {
        return LandData.IMPORTS.LandData_version(this.unique_id);
    }
    get mPos(): LandAABB {
        const v = LandData.IMPORTS.LandData_mPos(this.unique_id);
        if (v.length !== 2) {
            throw new Error("Invalid LandAABB");
        }
        return new LandAABB(v[0], v[1]);
    }
    get mTeleportPos(): IntPos {
        return LandData.IMPORTS.LandData_mTeleportPos(this.unique_id);
    }
    get mLandID(): number {
        return LandData.IMPORTS.LandData_mLandID(this.unique_id);
    }
    get mLandDimid(): number {
        return LandData.IMPORTS.LandData_mLandDimid(this.unique_id);
    }
    get mIs3DLand(): boolean {
        return LandData.IMPORTS.LandData_mIs3DLand(this.unique_id);
    }
    get mLandPermTable(): LandPermTable | null {
        const data = LandData.IMPORTS.LandData_mLandPermTable(this.unique_id);
        if (data === "null") {
            return null;
        }
        return JSON.parse(data);
    }
    get mLandOwner(): string {
        return LandData.IMPORTS.LandData_mLandOwner(this.unique_id);
    }
    get mLandMembers(): string[] {
        return LandData.IMPORTS.LandData_mLandMembers(this.unique_id);
    }
    get mLandName(): string {
        return LandData.IMPORTS.LandData_mLandName(this.unique_id);
    }
    get mLandDescribe(): string {
        return LandData.IMPORTS.LandData_mLandDescribe(this.unique_id);
    }
    get mIsSaleing(): boolean {
        return LandData.IMPORTS.LandData_mIsSaleing(this.unique_id);
    }
    get mSalePrice(): number {
        return LandData.IMPORTS.LandData_mSalePrice(this.unique_id);
    }
    get mOriginalBuyPrice(): number {
        return LandData.IMPORTS.LandData_mOriginalBuyPrice(this.unique_id);
    }
    get mIsConvertedLand(): boolean {
        return LandData.IMPORTS.LandData_mIsConvertedLand(this.unique_id);
    }
    get mOwnerDataIsXUID(): boolean {
        return LandData.IMPORTS.LandData_mOwnerDataIsXUID(this.unique_id);
    }
    get mParentLandID(): number {
        return LandData.IMPORTS.LandData_mParentLandID(this.unique_id);
    }
    get mSubLandIDs(): number[] {
        return LandData.IMPORTS.LandData_mSubLandIDs(this.unique_id);
    }

    getLandPos(): LandAABB {
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
        return LandData.IMPORTS.LandData_setSaleing(this.unique_id, isSaleing);
    }
    setIs3DLand(is3D: boolean): boolean {
        return LandData.IMPORTS.LandData_setIs3DLand(this.unique_id, is3D);
    }
    setLandOwner(uuid: string): boolean {
        return LandData.IMPORTS.LandData_setLandOwner(this.unique_id, uuid);
    }
    setSalePrice(price: number): boolean {
        return LandData.IMPORTS.LandData_setSalePrice(this.unique_id, price);
    }
    setLandName(name: string): boolean {
        return LandData.IMPORTS.LandData_setLandName(this.unique_id, name);
    }
    setLandDescribe(describe: string): boolean {
        return LandData.IMPORTS.LandData_setLandDescribe(
            this.unique_id,
            describe
        );
    }

    /**
     * @private 更改领地范围
     * @warning 更改后需要调用 `PLand.refreshLandRange()` 刷新缓存
     */
    _setLandPos(pos: LandAABB): boolean {
        return LandData.IMPORTS.LandData__setLandPos(
            this.unique_id,
            pos.min,
            pos.max
        );
    }

    addLandMember(uuid: string): boolean {
        return LandData.IMPORTS.LandData_addLandMember(this.unique_id, uuid);
    }
    removeLandMember(uuid: string): boolean {
        return LandData.IMPORTS.LandData_removeLandMember(this.unique_id, uuid);
    }

    isRadiusInLand(pos: IntPos, radius: number): boolean {
        return LandData.IMPORTS.LandData_isRadiusInLand(
            this.unique_id,
            pos,
            radius
        );
    }
    isAABBInLand(pos1: IntPos, pos2: IntPos): boolean {
        return LandData.IMPORTS.LandData_isAABBInLand(
            this.unique_id,
            pos1,
            pos2
        );
    }
    getPermType(uuid: UUIDs): LandPermType {
        return LandData.IMPORTS.LandData_getPermType(this.unique_id, uuid);
    }

    hasParentLand(): boolean {
        return LandData.IMPORTS.LandData_hasParentLand(this.unique_id);
    }
    hasSubLand(): boolean {
        return LandData.IMPORTS.LandData_hasSubLand(this.unique_id);
    }
    isSubLand(): boolean {
        return LandData.IMPORTS.LandData_isSubLand(this.unique_id);
    }
    isParentLand(): boolean {
        return LandData.IMPORTS.LandData_isParentLand(this.unique_id);
    }
    isMixLand(): boolean {
        return LandData.IMPORTS.LandData_isMixLand(this.unique_id);
    }
    isOrdinaryLand(): boolean {
        return LandData.IMPORTS.LandData_isOrdinaryLand(this.unique_id);
    }
    canCreateSubLand(): boolean {
        return LandData.IMPORTS.LandData_canCreateSubLand(this.unique_id);
    }
    getParentLand(): LandData | null {
        const id = LandData.IMPORTS.LandData_getParentLand(this.unique_id);
        if (id === -1) {
            return null;
        }
        return new LandData(id);
    }
    getSubLands(): LandData[] {
        return LandData.IMPORTS.LandData_getSubLands(this.unique_id).map(
            (id: LandID) => new LandData(id)
        );
    }
    getNestedLevel(): number {
        return LandData.IMPORTS.LandData_getNestedLevel(this.unique_id);
    }
    getRootLand(): LandData | null {
        const id = LandData.IMPORTS.LandData_getRootLand(this.unique_id);
        if (id === -1) {
            return null;
        }
        return new LandData(id);
    }
}

Object.freeze(LandData.IMPORTS);
