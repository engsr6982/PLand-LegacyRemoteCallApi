#include "pland/PLand.h"
#include "ExportDef.h"
#include "pland/Global.h"
#include "pland/Version.h"
#include "pland/utils/JSON.h"
#include <unordered_map>


namespace ldapi {

void Export_PLand_Version_Getter();

void Export_Class_PLand() {
    exportAs("PLand_isOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().isOperator(uuid);
    });

    exportAs("PLand_addOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().addOperator(uuid);
    });

    exportAs("PLand_removeOperator", [](string const& uuid) -> bool {
        return land::PLand::getInstance().removeOperator(uuid);
    });

    exportAs("PLand_hasPlayerSettings", [](string const& uuid) -> bool {
        return land::PLand::getInstance().hasPlayerSettings(uuid);
    });

    exportAs("PLand_getPlayerSettings", [](string const& uuid) -> std::string {
        try {
            // struct -> json -> string
            auto settings = land::PLand::getInstance().getPlayerSettings(uuid);
            auto j        = land::JSON::structTojson(*settings);
            return j.dump();
        } catch (...) {
            return {};
        }
    });

    exportAs("PLand_setPlayerSettings", [](string const& uuid, std::string const& jsonStr) -> bool {
        try {
            // jsonStr -> json -> struct
            auto json = nlohmann::json::parse(jsonStr);
            auto set  = land::PlayerSettings{};
            land::JSON::jsonToStructNoMerge(json, set);
            return land::PLand::getInstance().setPlayerSettings(uuid, std::move(set));
        } catch (...) {
            return false;
        }
    });


    exportAs("PLand_hasLand", [](int id) -> bool { return land::PLand::getInstance().hasLand(id); });

    exportAs("PLand_getLand", [](int id) -> int {
        auto land = land::PLand::getInstance().getLand(id);
        if (!land) return -1;
        return land->getLandID();
    });

    exportAs("PLand_removeLand", [](int id) -> bool { return land::PLand::getInstance().removeLand(id); });
    exportAs("PLand_removeOrdinaryLand", [](int id) -> bool {
        auto ptr    = land::PLand::getInstance().getLand(id);
        auto result = land::PLand::getInstance().removeOrdinaryLand(ptr);
        return result ? result.value() : false;
    });
    exportAs("PLand_removeSubLand", [](int id) -> bool {
        auto ptr    = land::PLand::getInstance().getLand(id);
        auto result = land::PLand::getInstance().removeSubLand(ptr);
        return result ? result.value() : false;
    });
    exportAs("PLand_removeLandAndSubLands", [](int id) -> bool {
        auto ptr    = land::PLand::getInstance().getLand(id);
        auto result = land::PLand::getInstance().removeLandAndSubLands(ptr);
        return result ? result.value() : false;
    });
    exportAs("PLand_removeLandAndPromoteSubLands", [](int id) -> bool {
        auto ptr    = land::PLand::getInstance().getLand(id);
        auto result = land::PLand::getInstance().removeLandAndPromoteSubLands(ptr);
        return result ? result.value() : false;
    });
    exportAs("PLand_removeLandAndTransferSubLands", [](int id) -> bool {
        auto ptr    = land::PLand::getInstance().getLand(id);
        auto result = land::PLand::getInstance().removeLandAndTransferSubLands(ptr);
        return result ? result.value() : false;
    });


    using LandList = std::vector<land::LandID>;
    exportAs("PLand_getLands", []() -> LandList {
        auto     lands = land::PLand::getInstance().getLands();
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    exportAs("PLand_getLands1", [](int dimid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(dimid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    exportAs("PLand_getLands2", [](string const& uuid, bool includeShared) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid, includeShared);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    exportAs("PLand_getLands3", [](string const& uuid, int dimid) -> LandList {
        auto     lands = land::PLand::getInstance().getLands(uuid, dimid);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    exportAs("PLand_getLands4", [](LandList const& lds) {
        auto     lands = land::PLand::getInstance().getLands(lds);
        LandList landList;
        for (auto land : lands) {
            landList.push_back(land->getLandID());
        }
        return landList;
    });

    exportAs("PLand_getPermType", [](string const& uuid, int landID, bool ignoreOperator) {
        return static_cast<int>(
            land::PLand::getInstance().getPermType(uuid, static_cast<land::LandID>(landID), ignoreOperator)
        );
    });

    exportAs("PLand_getLandAt", [](IntPos const& pos) -> int {
        auto land = land::PLand::getInstance().getLandAt(pos.first, pos.second);
        if (!land) return -1;
        return land->getLandID();
    });

    exportAs("PLand_getLandAt1", [](IntPos const& pos, int radius) -> LandList {
        auto     lands = land::PLand::getInstance().getLandAt(pos.first, radius, pos.second);
        LandList li;
        for (auto land : lands) {
            li.push_back(land->getLandID());
        }
        return li;
    });

    exportAs("PLand_getLandAt2", [](IntPos const& a, IntPos const& b) -> LandList {
        auto     lands = land::PLand::getInstance().getLandAt(a.first, b.first, a.second);
        LandList li;
        for (auto land : lands) {
            li.push_back(land->getLandID());
        }
        return li;
    });

    exportAs("PLand_refreshLandRange", [](int id) -> void {
        auto& inst = land::PLand::getInstance();
        auto  land = inst.getLand(id);
        if (land) inst.refreshLandRange(land);
    });

    exportAs("PLand_getVersionMeta", []() -> std::string {
        static struct {
            int         major    = PLAND_VERSION_MAJOR;
            int         minor    = PLAND_VERSION_MINOR;
            int         patch    = PLAND_VERSION_PATCH;
            int         build    = PLAND_VERSION_BUILD;
            std::string commit   = PLAND_COMMIT_HASH;
            bool        snapshot = PLAND_VERSION_SNAPSHOT;
            bool        release  = PLAND_VERSION_RELEASE;
            std::string version  = PLAND_VERSION_STRING;
        } meta;
        static auto res = land::JSON::structTojson(meta).dump();
        return res;
    });
}


} // namespace ldapi