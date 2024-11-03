#include "RemoteCallAPI.h"
#include "pland/PLand.h"


using string            = std::string;
static string NAMESPACE = "PLand_LDAPI";


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
}