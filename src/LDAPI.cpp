#include "RemoteCallAPI.h"
#include "mc/math/Vec3.h"
#include "mc/world/level/BlockPos.h"
#include "pland/Global.h"
#include "pland/LandData.h"
#include "pland/PLand.h"
#include "pland/utils/JSON.h"
#include <utility>
#include <vector>


using string            = std::string;
static string NAMESPACE = "PLand_LDAPI";

using IntPos   = std::pair<BlockPos, int>; // pos, dimid
using FloatPos = std::pair<Vec3, float>;   // pos, dimid


void Export_Class_PLand() {
    RemoteCall::exportAs(NAMESPACE, "PLand_isOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().isOperator(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_addOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().addOperator(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_removeOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().removeOperator(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_hasLand", [](int id) -> bool {
        return land::PLand::getInstance().hasLand(id);
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_getLand", [](int id) -> int {
        auto land = land::PLand::getInstance().getLand(id);
        if (!land) return -1;
        return land->getLandID();
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_removeLand", [](int id) -> bool {
        return land::PLand::getInstance().removeLand(id);
    });

    using LandList = std::vector<land::LandID>;
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands", []() -> LandList {
        auto     lands = land::PLand::getInstance().getLands();
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands1", [](int dimid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(dimid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands2", [](string const& uuid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands3", [](string const& uuid, int dimid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid, dimid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_getPermType", [](string const& uuid, int landID, bool ignoreOperator) {
        return static_cast<int>(land::PLand::getInstance().getPermType(uuid, landID, ignoreOperator));
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_getLandAt", [](IntPos const& pos) -> int {
        auto land = land::PLand::getInstance().getLandAt(pos.first, pos.second);
        if (!land) return -1;
        return land->getLandID();
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLandAt1", [](IntPos const& pos, int radius) -> LandList {
        auto     lands = land::PLand::getInstance().getLandAt(pos.first, radius, pos.second);
        LandList li;
        for (auto land : lands) {
            li.push_back(land->getLandID());
        }
        return li;
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLandAt2", [](IntPos const& a, IntPos const& b) -> LandList {
        auto     lands = land::PLand::getInstance().getLandAt(a.first, b.first, a.second);
        LandList li;
        for (auto land : lands) {
            li.push_back(land->getLandID());
        }
        return li;
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_refreshLandRange", [](int id) -> bool {
        auto& inst = land::PLand::getInstance();
        auto  land = inst.getLand(id);
        if (!land) return false;
        return inst.refreshLandRange(land);
    });
}

void Export_Class_LandData() {
    auto* db = &land::PLand::getInstance();
    RemoteCall::exportAs(NAMESPACE, "LandData_version", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->version;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandID", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mLandID;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandDimid", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mLandDimid;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mIs3DLand", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIs3DLand;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandPermTable", [db](int landID) -> string {
        auto land = db->getLand(landID);
        if (!land) return "null";
        return land::JSON::structTojson(land->mLandPermTable).dump();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandOwner", [db](int landID) -> string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandOwner;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandMembers", [db](int landID) -> std::vector<string> {
        auto land = db->getLand(landID);
        if (!land) return {};
        return land->mLandMembers;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandName", [db](int landID) -> string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandName;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mLandDescribe", [db](int landID) -> string {
        auto land = db->getLand(landID);
        if (!land) return "";
        return land->mLandDescribe;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mIsSaleing", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIsSaleing;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mSalePrice", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mSalePrice;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mOriginalBuyPrice", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mOriginalBuyPrice;
    });
}


// export
void ExportLDAPI() {
    Export_Class_PLand();
    Export_Class_LandData();
}