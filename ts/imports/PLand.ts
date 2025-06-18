import {
    ImportNamespace,
    IsType,
    LandID,
    LandPermType,
    UUIDs,
} from "../ImportDef.js";
import { LandData } from "./LandData.js";

/**
 * @warning 请不要增加、删除 key，否则会导致反射失败
 */
export type PlayerSettings = {
    /** 是否显示进入领地提示 */ showEnterLandTitle: boolean;
    /** 是否持续显示底部提示 */ showBottomContinuedTip: boolean;
    /** 玩家语言 */ localeCode: string | "system" | "server";
};

interface VersionMeta {
    major: number;
    minor: number;
    patch: number;
    build: number;
    commit: string;
    snapshot: boolean;
    release: boolean;
    version: string;
}

export class PLand {
    static IMPORTS = {
        PLand_isOperator: ll.imports(ImportNamespace, "PLand_isOperator"),
        PLand_addOperator: ll.imports(ImportNamespace, "PLand_addOperator"),
        PLand_removeOperator: ll.imports(
            ImportNamespace,
            "PLand_removeOperator"
        ),
        PLand_hasPlayerSettings: ll.imports(
            ImportNamespace,
            "PLand_hasPlayerSettings"
        ),
        PLand_getPlayerSettings: ll.imports(
            ImportNamespace,
            "PLand_getPlayerSettings"
        ),
        PLand_setPlayerSettings: ll.imports(
            ImportNamespace,
            "PLand_setPlayerSettings"
        ),
        PLand_getLand: ll.imports(ImportNamespace, "PLand_getLand"),
        PLand_removeLand: ll.imports(ImportNamespace, "PLand_removeLand"),
        PLand_hasLand: ll.imports(ImportNamespace, "PLand_hasLand"),
        PLand_getLands: ll.imports(ImportNamespace, "PLand_getLands"),
        PLand_getLands1: ll.imports(ImportNamespace, "PLand_getLands1"),
        PLand_getLands2: ll.imports(ImportNamespace, "PLand_getLands2"),
        PLand_getLands3: ll.imports(ImportNamespace, "PLand_getLands3"),
        PLand_getPermType: ll.imports(ImportNamespace, "PLand_getPermType"),
        PLand_getLandAt: ll.imports(ImportNamespace, "PLand_getLandAt"),
        PLand_getLandAt1: ll.imports(ImportNamespace, "PLand_getLandAt1"),
        PLand_getLandAt2: ll.imports(ImportNamespace, "PLand_getLandAt2"),
        PLand_refreshLandRange: ll.imports(
            ImportNamespace,
            "PLand_refreshLandRange"
        ),
        PLand_getVersionMeta: ll.imports(
            ImportNamespace,
            "PLand_getVersionMeta"
        ),
        PLand_removeOrdinaryLand: ll.imports(
            ImportNamespace,
            "PLand_removeOrdinaryLand"
        ),
        PLand_removeSubLand: ll.imports(ImportNamespace, "PLand_removeSubLand"),
        PLand_removeLandAndSubLands: ll.imports(
            ImportNamespace,
            "PLand_removeLandAndSubLands"
        ),
        PLand_removeLandAndPromoteSubLands: ll.imports(
            ImportNamespace,
            "PLand_removeLandAndPromoteSubLands"
        ),
        PLand_removeLandAndTransferSubLands: ll.imports(
            ImportNamespace,
            "PLand_removeLandAndTransferSubLands"
        ),
    };

    constructor() {
        throw new Error("PLand is a static class");
    }

    static isOperator(uuid: string): boolean {
        return PLand.IMPORTS.PLand_isOperator(uuid);
    }

    static addOperator(uuid: string): boolean {
        return PLand.IMPORTS.PLand_addOperator(uuid);
    }

    static removeOperator(uuid: string): boolean {
        return PLand.IMPORTS.PLand_removeOperator(uuid);
    }

    static hasPlayerSettings(uuid: string): boolean {
        return PLand.IMPORTS.PLand_hasPlayerSettings(uuid);
    }

    static getPlayerSettings(uuid: string): PlayerSettings | null {
        const jsonStr = PLand.IMPORTS.PLand_getPlayerSettings(uuid);
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            logger.error(`Failed to parse player settings: ${jsonStr}`);
            return null;
        }
    }

    static setPlayerSettings(uuid: string, settings: PlayerSettings): boolean {
        const jsonStr = JSON.stringify(settings);
        return PLand.IMPORTS.PLand_setPlayerSettings(uuid, jsonStr);
    }

    static hasLand(id: LandID): boolean {
        return PLand.IMPORTS.PLand_hasLand(id);
    }

    static getLand(landID: LandID): LandData | null {
        const id = PLand.IMPORTS.PLand_getLand(landID);
        if (id === -1) {
            return null;
        }
        return new LandData(id);
    }

    // 此 API 在 PLand 底层中已标记为废弃函数，将在未来版本中移除，请使用 removeOrdinaryLand() 代替
    static removeLand(landID: LandID): boolean {
        return PLand.IMPORTS.PLand_removeLand(landID);
    }

    /**
     * @brief 移除普通领地
     */
    static removeOrdinaryLand(land: LandData | LandID): boolean {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return PLand.IMPORTS.PLand_removeOrdinaryLand(id);
    }

    /**
     * @brief 移除子领地
     */
    static removeSubLand(land: LandData | LandID): boolean {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return PLand.IMPORTS.PLand_removeSubLand(id);
    }

    /**
     * @brief 移除领地和其子领地
     */
    static removeLandAndSubLands(land: LandData | LandID): boolean {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return PLand.IMPORTS.PLand_removeLandAndSubLands(id);
    }

    /**
     * @brief 移除当前领地并提升子领地为普通领地
     */
    static removeLandAndPromoteSubLands(land: LandData | LandID): boolean {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return PLand.IMPORTS.PLand_removeLandAndPromoteSubLands(id);
    }

    /**
     * @brief 移除当前领地并移交子领地给当前领地的父领地
     */
    static removeLandAndTransferSubLands(land: LandData | LandID): boolean {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return PLand.IMPORTS.PLand_removeLandAndTransferSubLands(id);
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
            return PLand.IMPORTS.PLand_getLands().map(
                (id: LandID) => new LandData(id)
            );
        } else if (args.length === 1 && IsType(args[0], "Number")) {
            // getLands(LandDimid dimid) const;
            return PLand.IMPORTS.PLand_getLands1(args[0]).map(
                (id: LandID) => new LandData(id)
            );
        } else if (args.length === 1 && IsType(args[0], "String")) {
            // getLands(UUIDs const& uuid) const;
            return PLand.IMPORTS.PLand_getLands2(args[0]).map(
                (id: LandID) => new LandData(id)
            );
        } else if (
            args.length === 2 &&
            IsType(args[0], "String") &&
            IsType(args[1], "Number")
        ) {
            // getLands(UUIDs const& uuid, LandDimid dimid) const;
            return PLand.IMPORTS.PLand_getLands3(args[0], args[1]).map(
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
        return PLand.IMPORTS.PLand_getPermType(uuid, landID, ignoreOperator);
    }

    /**
     * getLandAt(intPos) // 查询指定位置所在领地 返回 LandData / null
     * getLandAt(intPos, radius) // 查询圆形区域内领地 返回 LandData[]
     * getLandAt(intPos, intPos) // 查询矩形区域内领地 返回 LandData[]
     */
    static getLandAt(...args): LandData | null | LandData[] {
        if (args.length === 1 && IsType(args[0], "Object")) {
            const id = PLand.IMPORTS.PLand_getLandAt(args[0]);
            if (id === -1) {
                return null;
            }
            return new LandData(id);
        } else if (
            args.length === 2 &&
            IsType(args[0], "Object") &&
            IsType(args[1], "Number")
        ) {
            return PLand.IMPORTS.PLand_getLandAt1(args[0], args[1]).map(
                (id: LandID) => new LandData(id)
            );
        } else if (
            args.length === 2 &&
            IsType(args[0], "Object") &&
            IsType(args[1], "Object")
        ) {
            return PLand.IMPORTS.PLand_getLandAt2(args[0], args[1]).map(
                (id: LandID) => new LandData(id)
            );
        } else {
            throw new Error("Invalid arguments");
        }
    }

    static refreshLandRange(land: LandData): void {
        // @ts-ignore
        PLand.IMPORTS.PLand_refreshLandRange(land.unique_id);
    }

    static getVersionMeta(): VersionMeta {
        return JSON.parse(PLand.IMPORTS.PLand_getVersionMeta());
    }
}

Object.freeze(PLand.IMPORTS);
