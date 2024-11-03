#include "RemoteCallAPI.h"
#include "mc/world/level/BlockPos.h"
#include "pland/Global.h"
#include "pland/PLand.h"
#include <utility>

using string            = std::string;
static string NAMESPACE = "PLand_LDAPI";

using IntPos   = std::pair<BlockPos, int>;   // pos, dimid
using FloatPos = std::pair<BlockPos, float>; // pos, dimid


void ExportLDAPI() {
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
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands2", [](land::UUIDs const& uuid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });
    RemoteCall::exportAs(NAMESPACE, "PLand_getLands3", [](land::UUIDs const& uuid, int dimid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid, dimid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_getPermType", [](string const& uuid, int landID, bool ignoreOperator) {
        return land::PLand::getInstance().getPermType(uuid, landID, ignoreOperator);
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

    RemoteCall::exportAs(NAMESPACE, "PLand_refreshLandRange", [](land::LandID id) -> bool {
        auto& inst = land::PLand::getInstance();
        auto  land = inst.getLand(id);
        if (!land) return false;
        return inst.refreshLandRange(land);
    });
}