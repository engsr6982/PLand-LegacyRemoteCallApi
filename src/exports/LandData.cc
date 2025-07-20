#include "pland/PLand.h"
#include "pland/aabb/LandAABB.h"
#include "pland/utils/JSON.h"

#include "ExportDef.h"

namespace ldapi {


void Export_Class_LandData() {
    auto* db = &land::PLand::getInstance();
    exportAs("LandData_version", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->version;
    });
    exportAs("LandData_mLandID", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mLandID;
    });
    exportAs("LandData_mLandDimid", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mLandDimid;
    });
    exportAs("LandData_mIs3DLand", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIs3DLand;
    });
    exportAs("LandData_mLandPermTable", [db](int landID) -> std::string {
        auto land = db->getLand(landID);
        if (!land) return "null";
        return land::JSON::structTojson(land->mLandPermTable).dump();
    });
    exportAs("LandData_mLandOwner", [db](int landID) -> std::string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandOwner;
    });
    exportAs("LandData_mLandMembers", [db](int landID) -> std::vectorstring {
        auto land = db->getLand(landID);
        if (!land) return {};
        return land->mLandMembers;
    });
    exportAs("LandData_mLandName", [db](int landID) -> std::string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandName;
    });
    exportAs("LandData_mLandDescribe", [db](int landID) -> std::string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandDescribe;
    });
    exportAs("LandData_mIsSaleing", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIsSaleing;
    });
    exportAs("LandData_mSalePrice", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mSalePrice;
    });
    exportAs("LandData_mOriginalBuyPrice", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mOriginalBuyPrice;
    });
    exportAs("LandData_mPos", [db](int landID) -> std::vector<IntPos> {
        auto land = db->getLand(landID);
        if (!land) return {};
        return {
            IntPos{land->mPos.min, land->mLandDimid},
            IntPos{land->mPos.max, land->mLandDimid}
        };
    });
    exportAs("LandData_mTeleportPos", [db](int landID) -> IntPos {
        auto land = db->getLand(landID);
        if (!land) return IntPos{{}, 0};
        return IntPos{land->mTeleportPos, land->mLandDimid};
    });
    exportAs("LandData_mIsConvertedLand", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIsConvertedLand;
    });
    exportAs("LandData_mOwnerDataIsXUID", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mOwnerDataIsXUID;
    });
    exportAs("LandData_mParentLandID", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mParentLandID;
    });
    exportAs("LandData_mSubLandIDs", [db](int landID) -> std::vector<int> {
        auto land = db->getLand(landID);
        if (!land) return {};
        std::vector<int> res;
        res.reserve(land->mSubLandIDs.size());
        for (auto& i : land->mSubLandIDs) {
            res.push_back(i); // int64 to int
        }
        return res;
    });


    exportAs("LandData_hasParentLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->hasParentLand();
    });
    exportAs("LandData_hasSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->hasSubLand();
    });
    exportAs("LandData_isSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isSubLand();
    });
    exportAs("LandData_isParentLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isParentLand();
    });
    exportAs("LandData_isMixLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isMixLand();
    });
    exportAs("LandData_isOrdinaryLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isOrdinaryLand();
    });
    exportAs("LandData_canCreateSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->canCreateSubLand();
    });
    exportAs("LandData_getParentLand", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return land->getParentLand()->getLandID();
    });
    exportAs("LandData_getSubLands", [db](int id) -> std::vector<int> {
        auto land = db->getLand(id);
        if (!land) return {};
        auto             lands = land->getSubLands();
        std::vector<int> res;
        res.reserve(lands.size());
        for (auto& i : lands) {
            res.push_back(i->getLandID());
        }
        return res;
    });
    exportAs("LandData_getNestedLevel", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return 0;
        return land->getNestedLevel();
    });
    exportAs("LandData_getRootLand", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return land->getRootLand()->getLandID();
    });

    exportAs("LandData_setSaleing", [db](int id, bool isSale) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setSaleing(isSale);
    });
    exportAs("LandData_setIs3DLand", [db](int id, bool is3D) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setIs3DLand(is3D);
    });
    exportAs("LandData_setLandOwner", [db](int id, std::string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandOwner(uuid);
    });
    exportAs("LandData_setSalePrice", [db](int id, int price) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setSalePrice(price);
    });
    exportAs("LandData_setLandDescribe", [db](int id, std::string const& describe) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandDescribe(describe);
    });
    exportAs("LandData_setLandName", [db](int id, std::string const& name) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandName(name);
    });
    exportAs("LandData_addLandMember", [db](int id, std::string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->addLandMember(uuid);
    });
    exportAs("LandData_removeLandMember", [db](int id, std::string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->removeLandMember(uuid);
    });
    exportAs("LandData__setLandPos", [db](int id, IntPos const& a, IntPos const& b) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->_setLandPos(land::LandAABB::make(a.first, b.first));
    });

    exportAs("LandData_isRadiusInLand", [db](int id, IntPos const& pos, int radius) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isRadiusInLand(pos.first, radius);
    });
    exportAs("LandData_isAABBInLand", [db](int id, IntPos const& a, IntPos const& b) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isAABBInLand(a.first, b.first);
    });
    exportAs("LandData_getPermType", [db](int id, std::string const& uuid) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return static_cast<int>(land->getPermType(uuid));
    });
}


} // namespace ldapi