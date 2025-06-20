import {
    ImportNamespace,
    isIntPos,
    LandID,
    LandPermType,
    Result,
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
        PLand_getLands4: ll.imports(ImportNamespace, "PLand_getLands4"),
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

    /**
     * @deprecated 此 API 在 PLand 底层中已标记为废弃函数，将在未来版本中移除，请使用 removeOrdinaryLand() 代替
     */
    static removeLand(landID: LandID): boolean {
        return PLand.IMPORTS.PLand_removeLand(landID);
    }

    /**
     * @brief 移除普通领地
     */
    static removeOrdinaryLand(land: LandData | LandID): Result<boolean> {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return Result.fromBoolResult(
            PLand.IMPORTS.PLand_removeOrdinaryLand(id)
        );
    }

    /**
     * @brief 移除子领地
     */
    static removeSubLand(land: LandData | LandID): Result<boolean> {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return Result.fromBoolResult(PLand.IMPORTS.PLand_removeSubLand(id));
    }

    /**
     * @brief 移除领地和其子领地
     */
    static removeLandAndSubLands(land: LandData | LandID): Result<boolean> {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return Result.fromBoolResult(
            PLand.IMPORTS.PLand_removeLandAndSubLands(id)
        );
    }

    /**
     * @brief 移除当前领地并提升子领地为普通领地
     */
    static removeLandAndPromoteSubLands(
        land: LandData | LandID
    ): Result<boolean> {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return Result.fromBoolResult(
            PLand.IMPORTS.PLand_removeLandAndPromoteSubLands(id)
        );
    }

    /**
     * @brief 移除当前领地并移交子领地给当前领地的父领地
     */
    static removeLandAndTransferSubLands(
        land: LandData | LandID
    ): Result<boolean> {
        // @ts-ignore
        const id = IsType(land, "Number") ? land : (land as LandData).unique_id;
        return Result.fromBoolResult(
            PLand.IMPORTS.PLand_removeLandAndTransferSubLands(id)
        );
    }

    static getLand(landID: LandID): LandData | null {
        const id = PLand.IMPORTS.PLand_getLand(landID);
        if (id === -1) {
            return null;
        }
        return new LandData(id);
    }

    /**
     * 获取所有领地
     */
    static getLands(): LandData[];
    /**
     * 批量获取领地
     * @param ids id 列表
     */
    static getLands(ids: LandID[]): LandData[];
    /**
     * 获取指定维度的所有领地
     * @param dimid 维度 id
     */
    static getLands(dimid: number): LandData[];
    /**
     * 获取玩家所有的领地
     * @param uuid 玩家 uuid
     * @param includeShared 是否包含其它玩家共享的领地(默认false)
     */
    static getLands(uuid: UUIDs, includeShared: boolean): LandData[];
    /**
     * 获取玩家在指定维度所有的领地
     * @param uuid 玩家 uuid
     * @param dimid 维度 id
     */
    static getLands(uuid: UUIDs, dimid: number): LandData[];

    static getLands(...args: any[]): LandData[] {
        switch (args.length) {
            case 0: {
                // getLands() const;
                return PLand.IMPORTS.PLand_getLands().map(
                    (id: LandID) => new LandData(id)
                );
            }
            case 1: {
                if (Array.isArray(args[0])) {
                    // getLands(std::vector<LandID> const& ids) const;
                    return PLand.IMPORTS.PLand_getLands4(args[0]).map(
                        (id: LandID) => new LandData(id)
                    );
                } else if (typeof args[0] === "number") {
                    // getLands(LandDimid dimid) const;
                    return PLand.IMPORTS.PLand_getLands1(args[0]).map(
                        (id: LandID) => new LandData(id)
                    );
                }
            }
            case 2: {
                const arg0 = args[0];
                if (typeof arg0 === "string") {
                    if (typeof args[1] === "boolean" || args[1] === undefined) {
                        // getLands(UUIDs const& uuid, bool includeShared = false) const;
                        const includeShared = args[1] ?? false;
                        return PLand.IMPORTS.PLand_getLands2(
                            arg0,
                            includeShared
                        ).map((id: LandID) => new LandData(id));
                    } else {
                        // getLands(UUIDs const& uuid, LandDimid dimid) const;
                        return PLand.IMPORTS.PLand_getLands3(arg0, args[1]).map(
                            (id: LandID) => new LandData(id)
                        );
                    }
                }
            }
        }
        throw new Error("Invalid arguments");
    }

    /**
     * 查询指定坐标的领地
     * @param pos 坐标
     */
    static getLandAt(pos: IntPos): LandData | null;
    /**
     * 查询指定坐标半径内的领地
     * @param pos 坐标
     * @param radius 半径
     */
    static getLandAt(pos: IntPos, radius: number): LandData[];
    /**
     * 查询 AABB 区域内的领地
     * @param pos1 min 坐标
     * @param pos2 max 坐标
     */
    static getLandAt(pos1: IntPos, pos2: IntPos): LandData[];

    static getLandAt(
        pos1: IntPos,
        radius_or_pos2?: number | IntPos
    ): LandData | null | LandData[] {
        if (!isIntPos(pos1)) {
            throw new Error("Invalid arguments");
        }

        if (radius_or_pos2 === undefined) {
            // getLandAt(BlockPos const& pos, LandDimid dimid) const;
            const id = PLand.IMPORTS.PLand_getLandAt(pos1);
            if (id === -1) {
                return null;
            }
            return new LandData(id);
        } else if (typeof radius_or_pos2 === "number") {
            // getLandAt(BlockPos const& center, int radius, LandDimid dimid) const;
            return PLand.IMPORTS.PLand_getLandAt1(pos1, radius_or_pos2).map(
                (id: LandID) => new LandData(id)
            );
        } else if (isIntPos(radius_or_pos2)) {
            // getLandAt(BlockPos const& pos1, BlockPos const& pos2, LandDimid dimid) const;
            if (pos1.dimid != (radius_or_pos2 as IntPos).dimid) {
                throw new Error("Invalid arguments");
            }
            return PLand.IMPORTS.PLand_getLandAt2(pos1, radius_or_pos2).map(
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

    static refreshLandRange(land: LandData): void {
        // @ts-ignore
        PLand.IMPORTS.PLand_refreshLandRange(land.unique_id);
    }

    static getVersionMeta(): VersionMeta {
        return JSON.parse(PLand.IMPORTS.PLand_getVersionMeta());
    }
}

Object.freeze(PLand.IMPORTS);
