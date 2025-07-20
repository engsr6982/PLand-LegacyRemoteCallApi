import {
    importAs,
    isIntPos,
    LandID,
    LandPermType,
    UUIDs,
} from "../ImportDef.js";
import { LandAABB } from "./LandAABB.js";

export interface LandPermTable {}

export enum LandType {
    Ordinary = 0, // 普通领地(无父、无子)
    Parent = 1, // 父领地(无父、有子)
    Mix = 2, // 混合领地(有父、有子)
    Sub = 3, // 子领地(有父、无子)
}

type InternalLandAABB = [IntPos, IntPos];

export class Land {
    static SYMBOLS = {
        Land_getAABB: importAs("Land_getAABB") as (
            id: LandID
        ) => InternalLandAABB,

        Land_setAABB: importAs("Land_setAABB") as (
            id: LandID,
            aabb: InternalLandAABB
        ) => boolean,

        Land_getTeleportPos: importAs("Land_getTeleportPos") as (
            id: LandID
        ) => IntPos,

        Land_setTeleportPos: importAs("Land_setTeleportPos") as (
            id: LandID,
            pos: IntPos
        ) => void,

        Land_getId: importAs("Land_getId") as (id: LandID) => LandID,

        Land_getDimensionId: importAs("Land_getDimensionId") as (
            id: LandID
        ) => number,

        Land_getPermTable: importAs("Land_getPermTable") as (
            id: LandID
        ) => string,

        Land_setPermTable: importAs("Land_setPermTable") as (
            id: LandID,
            table: string
        ) => void,

        Land_getOwner: importAs("Land_getOwner") as (id: LandID) => UUIDs,

        Land_setOwner: importAs("Land_setOwner") as (
            id: LandID,
            owner: UUIDs
        ) => void,

        Land_getMembers: importAs("Land_getMembers") as (id: LandID) => UUIDs[],

        Land_addLandMember: importAs("Land_addLandMember") as (
            id: LandID,
            uuid: UUIDs
        ) => void,

        Land_removeLandMember: importAs("Land_removeLandMember") as (
            id: LandID,
            uuid: UUIDs
        ) => void,

        Land_getName: importAs("Land_getName") as (id: LandID) => string,

        Land_setName: importAs("Land_setName") as (
            id: LandID,
            name: string
        ) => void,

        Land_getDescribe: importAs("Land_getDescribe") as (
            id: LandID
        ) => string,

        Land_setDescribe: importAs("Land_setDescribe") as (
            id: LandID,
            describe: string
        ) => void,

        Land_getOriginalBuyPrice: importAs("Land_getOriginalBuyPrice") as (
            id: LandID
        ) => number,

        Land_setOriginalBuyPrice: importAs("Land_setOriginalBuyPrice") as (
            id: LandID,
            price: number
        ) => void,

        Land_is3D: importAs("Land_is3D") as (id: LandID) => boolean,
        Land_isOwner: importAs("Land_isOwner") as (
            id: LandID,
            uuid: UUIDs
        ) => boolean,
        Land_isMember: importAs("Land_isMember") as (
            id: LandID,
            uuid: UUIDs
        ) => boolean,

        Land_isConvertedLand: importAs("Land_isConvertedLand") as (
            id: LandID
        ) => boolean,

        Land_isOwnerDataIsXUID: importAs("Land_isOwnerDataIsXUID") as (
            id: LandID
        ) => boolean,

        Land_isCollision: importAs("Land_isCollision") as (
            id: LandID,
            pos: IntPos,
            radius: number
        ) => boolean,

        Land_isCollision2: importAs("Land_isCollision2") as (
            id: LandID,
            pos1: IntPos,
            pos2: IntPos
        ) => boolean,

        Land_isDirty: importAs("Land_isDirty") as (id: LandID) => boolean,
        Land_getType: importAs("Land_getType") as (id: LandID) => number,

        Land_hasParentLand: importAs("Land_hasParentLand") as (
            id: LandID
        ) => boolean,
        Land_hasSubLand: importAs("Land_hasSubLand") as (id: LandID) => boolean,
        Land_isSubLand: importAs("Land_isSubLand") as (id: LandID) => boolean,
        Land_isParentLand: importAs("Land_isParentLand") as (
            id: LandID
        ) => boolean,
        Land_isMixLand: importAs("Land_isMixLand") as (id: LandID) => boolean,
        Land_isOrdinaryLand: importAs("Land_isOrdinaryLand") as (
            id: LandID
        ) => boolean,
        Land_canCreateSubLand: importAs("Land_canCreateSubLand") as (
            id: LandID
        ) => boolean,

        Land_getParentLand: importAs("Land_getParentLand") as (
            id: LandID
        ) => LandID,
        Land_getSubLands: importAs("Land_getSubLands") as (
            id: LandID
        ) => LandID[],
        Land_getNestedLevel: importAs("Land_getNestedLevel") as (
            id: LandID
        ) => number,
        Land_getRootLand: importAs("Land_getRootLand") as (
            id: LandID
        ) => LandID,

        Land_getFamilyTree: importAs("Land_getFamilyTree") as (
            id: LandID
        ) => LandID[],
        Land_getSelfAndAncestors: importAs("Land_getSelfAndAncestors") as (
            id: LandID
        ) => LandID[],
        Land_getSelfAndDescendants: importAs("Land_getSelfAndDescendants") as (
            id: LandID
        ) => LandID[],

        Land_getPermType: importAs("Land_getPermType") as (
            id: LandID,
            uuid: UUIDs
        ) => number,
    };

    readonly mLandId: LandID = -1;
    constructor(id: LandID) {
        this.mLandId = id;
    }

    /**
     * 获取领地AABB范围
     * @returns
     */
    getAABB(): LandAABB | null {
        const result = Land.SYMBOLS.Land_getAABB(this.mLandId);
        if (result.length > 0) {
            return new LandAABB(result[0], result[1]);
        }
        return null;
    }

    /**
     *  修改领地AABB范围（仅限普通领地，且新范围没有任何重叠等冲突）
     * @warning 修改后务必在 LandRegistry 中刷新领地范围
     */
    setAABB(aabb: LandAABB): boolean {
        return Land.SYMBOLS.Land_setAABB(this.mLandId, [aabb.min, aabb.max]);
    }

    getTeleportPos(): IntPos {
        return Land.SYMBOLS.Land_getTeleportPos(this.mLandId);
    }

    setTeleportPos(pos: IntPos): void {
        Land.SYMBOLS.Land_setTeleportPos(this.mLandId, pos);
    }

    getId(): LandID {
        return Land.SYMBOLS.Land_getId(this.mLandId);
    }

    getDimensionId(): number {
        return Land.SYMBOLS.Land_getDimensionId(this.mLandId);
    }

    getPermTable(): LandPermTable | null {
        const result = Land.SYMBOLS.Land_getPermTable(this.mLandId);
        if (result === "") {
            return null;
        }
        return JSON.parse(result);
    }

    setPermTable(table: LandPermTable): void {
        Land.SYMBOLS.Land_setPermTable(this.mLandId, JSON.stringify(table));
    }

    getOwner(): UUIDs {
        return Land.SYMBOLS.Land_getOwner(this.mLandId);
    }

    setOwner(owner: UUIDs): void {
        Land.SYMBOLS.Land_setOwner(this.mLandId, owner);
    }

    getMembers(): UUIDs[] {
        return Land.SYMBOLS.Land_getMembers(this.mLandId);
    }

    addLandMember(uuid: UUIDs): void {
        Land.SYMBOLS.Land_addLandMember(this.mLandId, uuid);
    }

    removeLandMember(uuid: UUIDs): void {
        Land.SYMBOLS.Land_removeLandMember(this.mLandId, uuid);
    }

    getName(): string {
        return Land.SYMBOLS.Land_getName(this.mLandId);
    }

    setName(name: string): void {
        Land.SYMBOLS.Land_setName(this.mLandId, name);
    }

    getDescribe(): string {
        return Land.SYMBOLS.Land_getDescribe(this.mLandId);
    }

    setDescribe(describe: string): void {
        Land.SYMBOLS.Land_setDescribe(this.mLandId, describe);
    }

    getOriginalBuyPrice(): number {
        return Land.SYMBOLS.Land_getOriginalBuyPrice(this.mLandId);
    }

    setOriginalBuyPrice(price: number): void {
        Land.SYMBOLS.Land_setOriginalBuyPrice(this.mLandId, price);
    }

    is3D(): boolean {
        return Land.SYMBOLS.Land_is3D(this.mLandId);
    }

    isOwner(uuid: UUIDs): boolean {
        return Land.SYMBOLS.Land_isOwner(this.mLandId, uuid);
    }

    isMember(uuid: UUIDs): boolean {
        return Land.SYMBOLS.Land_isMember(this.mLandId, uuid);
    }

    isConvertedLand(): boolean {
        return Land.SYMBOLS.Land_isConvertedLand(this.mLandId);
    }

    isOwnerDataIsXUID(): boolean {
        return Land.SYMBOLS.Land_isOwnerDataIsXUID(this.mLandId);
    }

    isCollision(pos: IntPos, radius: number): boolean;
    isCollision(pos1: IntPos, pos2: IntPos): boolean;
    isCollision(pos1: IntPos, pos2: any): boolean {
        if (typeof pos2 === "number") {
            return Land.SYMBOLS.Land_isCollision(this.mLandId, pos1, pos2);
        } else if (isIntPos(pos2)) {
            return Land.SYMBOLS.Land_isCollision2(this.mLandId, pos1, pos2);
        }
        throw new TypeError("pos2 must be IntPos or number");
    }

    isDirty(): boolean {
        return Land.SYMBOLS.Land_isDirty(this.mLandId);
    }

    getType(): LandType | null {
        const result = Land.SYMBOLS.Land_getType(this.mLandId);
        if (result === -1) {
            return null;
        }
        return result as LandType;
    }

    hasParentLand(): boolean {
        return Land.SYMBOLS.Land_hasParentLand(this.mLandId);
    }

    hasSubLand(): boolean {
        return Land.SYMBOLS.Land_hasSubLand(this.mLandId);
    }

    isSubLand(): boolean {
        return Land.SYMBOLS.Land_isSubLand(this.mLandId);
    }

    isParentLand(): boolean {
        return Land.SYMBOLS.Land_isParentLand(this.mLandId);
    }

    isMixLand(): boolean {
        return Land.SYMBOLS.Land_isMixLand(this.mLandId);
    }

    isOrdinaryLand(): boolean {
        return Land.SYMBOLS.Land_isOrdinaryLand(this.mLandId);
    }

    canCreateSubLand(): boolean {
        return Land.SYMBOLS.Land_canCreateSubLand(this.mLandId);
    }

    getParentLand(): Land | null {
        const result = Land.SYMBOLS.Land_getParentLand(this.mLandId);
        if (result === -1) {
            return null;
        }
        return new Land(result);
    }

    getSubLands(): Land[] {
        return Land.SYMBOLS.Land_getSubLands(this.mLandId).map(
            (id) => new Land(id)
        );
    }

    getNestedLevel(): number {
        return Land.SYMBOLS.Land_getNestedLevel(this.mLandId);
    }

    getRootLand(): Land | null {
        const result = Land.SYMBOLS.Land_getRootLand(this.mLandId);
        if (result === -1) {
            return null;
        }
        return new Land(result);
    }

    getFamilyTree(): Land[] {
        return Land.SYMBOLS.Land_getFamilyTree(this.mLandId).map(
            (id) => new Land(id)
        );
    }

    getSelfAndAncestors(): Land[] {
        return Land.SYMBOLS.Land_getSelfAndAncestors(this.mLandId).map(
            (id) => new Land(id)
        );
    }

    getSelfAndDescendants(): Land[] {
        return Land.SYMBOLS.Land_getSelfAndDescendants(this.mLandId).map(
            (id) => new Land(id)
        );
    }

    getPermType(uuid: UUIDs): LandPermType {
        return Land.SYMBOLS.Land_getPermType(this.mLandId, uuid);
    }
}

Object.freeze(Land.SYMBOLS);
