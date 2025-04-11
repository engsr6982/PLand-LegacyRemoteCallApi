#include "ll/api/event/Event.h"
#include "ll/api/event/EventBus.h"
#include "ll/api/event/ListenerBase.h"
#include "ll/api/utils/HashUtils.h"
#include "mc/world/actor/player/Player.h"
#include "mc/world/level/BlockPos.h"
#include "pland/Global.h"
#include "pland/LandData.h"

#include "pland/LandEvent.h"
#include "pland/LandPos.h"
#include "pland/PLand.h"
#include "pland/utils/JSON.h"
#include <memory>
#include <unordered_map>
#include <utility>
#include <vector>


#include "RemoteCallAPI.h"

using string            = std::string;
static string NAMESPACE = "PLand_LDAPI";

using IntPos   = std::pair<BlockPos, int>; // pos, dimid
using FloatPos = std::pair<Vec3, int>;     // pos, dimid


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

    RemoteCall::exportAs(NAMESPACE, "PLand_hasPlayerSettings", [](string const& uuid) -> bool {
        return land::PLand::getInstance().hasPlayerSettings(uuid);
    });

    RemoteCall::exportAs(NAMESPACE, "PLand_getPlayerSettings", [](string const& uuid) -> std::string {
        try {
            // struct -> json -> string
            auto settings = land::PLand::getInstance().getPlayerSettings(uuid);
            auto j        = land::JSON::structTojson(*settings);
            return j.dump();
        } catch (...) {
            return {};
        }
    });
    RemoteCall::exportAs(
        NAMESPACE,
        "PLand_setPlayerSettings",
        [](string const& uuid, std::string const& jsonStr) -> bool {
            try {
                // jsonStr -> json -> struct
                auto json = nlohmann::json::parse(jsonStr);
                auto set  = land::PlayerSettings{};
                land::JSON::jsonToStructNoMerge(json, set);
                return land::PLand::getInstance().setPlayerSettings(uuid, std::move(set));
            } catch (...) {
                return false;
            }
        }
    );


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
        return static_cast<int>(
            land::PLand::getInstance().getPermType(uuid, static_cast<land::LandID>(landID), ignoreOperator)
        );
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

    RemoteCall::exportAs(NAMESPACE, "PLand_refreshLandRange", [](int id) -> void {
        auto& inst = land::PLand::getInstance();
        auto  land = inst.getLand(id);
        if (land) inst.refreshLandRange(land);
    });
}


void Export_Class_LandPos() {
    static auto Make = [](IntPos const& a, IntPos const& b) { return land::LandPos::make(a.first, b.first); };

    RemoteCall::exportAs(NAMESPACE, "LandPos_fix", [](IntPos const& a, IntPos const& b) -> std::vector<IntPos> {
        auto p = Make(a, b);
        p.fix();
        std::vector<IntPos> res = {
            IntPos{p.mMin_A, a.second},
            IntPos{p.mMax_B, b.second}
        };
        return res;
    });

    RemoteCall::exportAs(NAMESPACE, "LandPos_getDepth", [](IntPos const& a, IntPos const& b) -> int {
        auto p = Make(a, b);
        return p.getDepth();
    });
    RemoteCall::exportAs(NAMESPACE, "LandPos_getHeight", [](IntPos const& a, IntPos const& b) -> int {
        auto p = Make(a, b);
        return p.getHeight();
    });
    RemoteCall::exportAs(NAMESPACE, "LandPos_getWidth", [](IntPos const& a, IntPos const& b) -> int {
        auto p = Make(a, b);
        return p.getWidth();
    });
    RemoteCall::exportAs(NAMESPACE, "LandPos_getSquare", [](IntPos const& a, IntPos const& b) -> int {
        auto p = Make(a, b);
        return p.getSquare();
    });
    RemoteCall::exportAs(NAMESPACE, "LandPos_getVolume", [](IntPos const& a, IntPos const& b) -> int {
        auto p = Make(a, b);
        return p.getVolume();
    });

    RemoteCall::exportAs(NAMESPACE, "LandPos_toString", [](IntPos const& a, IntPos const& b) -> string {
        auto p = Make(a, b);
        return p.toString();
    });

    RemoteCall::exportAs(NAMESPACE, "LandPos_getBorder", [](IntPos const& a, IntPos const& b) -> std::vector<IntPos> {
        auto                p   = Make(a, b);
        auto                res = p.getBorder();
        std::vector<IntPos> li;
        for (auto pos : res) {
            li.push_back(IntPos{pos, a.second});
        }
        return li;
    });
    RemoteCall::exportAs(NAMESPACE, "LandPos_getRange", [](IntPos const& a, IntPos const& b) -> std::vector<IntPos> {
        auto                p   = Make(a, b);
        auto                res = p.getRange();
        std::vector<IntPos> li;
        for (auto pos : res) {
            li.push_back(IntPos{pos, a.second});
        }
        return li;
    });

    RemoteCall::exportAs(
        NAMESPACE,
        "LandPos_hasPos",
        [](IntPos const& a, IntPos const& b, IntPos const& pos, bool ignoreY) -> bool {
            auto p = Make(a, b);
            return p.hasPos(pos.first, ignoreY);
        }
    );


    RemoteCall::exportAs(
        NAMESPACE,
        "LandPos_isCollision",
        [](IntPos const& a, IntPos const& b, IntPos const& c, IntPos const& d) -> bool {
            auto p1 = Make(a, b);
            auto p2 = Make(c, d);
            return land::LandPos::isCollision(p1, p2);
        }
    );
    RemoteCall::exportAs(
        NAMESPACE,
        "LandPos_isComplisWithMinSpacing",
        [](IntPos const& a, IntPos const& b, IntPos const& c, IntPos const& d, bool ignoreY) -> bool {
            auto p1 = Make(a, b);
            auto p2 = Make(c, d);
            return land::LandPos::isComplisWithMinSpacing(p1, p2, ignoreY);
        }
    );
    RemoteCall::exportAs(
        NAMESPACE,
        "LandPos_isContain",
        [](IntPos const& a, IntPos const& b, IntPos const& c, IntPos const& d) -> bool {
            auto ab1 = Make(a, b);
            auto ab2 = Make(c, d);
            return land::LandPos::isContain(ab1, ab2);
        }
    );
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
    RemoteCall::exportAs(NAMESPACE, "LandData_mPos", [db](int landID) -> std::vector<IntPos> {
        auto land = db->getLand(landID);
        if (!land) return {};
        return {
            IntPos{land->mPos.mMin_A, land->mLandDimid},
            IntPos{land->mPos.mMax_B, land->mLandDimid}
        };
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mTeleportPos", [db](int landID) -> IntPos {
        auto land = db->getLand(landID);
        if (!land) return IntPos{{}, 0};
        return IntPos{land->mTeleportPos, land->mLandDimid};
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mIsConvertedLand", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mIsConvertedLand;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mOwnerDataIsXUID", [db](int landID) -> bool {
        auto land = db->getLand(landID);
        if (!land) return false;
        return land->mOwnerDataIsXUID;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mParentLandID", [db](int landID) -> int {
        auto land = db->getLand(landID);
        if (!land) return -1;
        return land->mParentLandID;
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_mSubLandIDs", [db](int landID) -> std::vector<int> {
        auto land = db->getLand(landID);
        if (!land) return {};
        std::vector<int> res;
        res.reserve(land->mSubLandIDs.size());
        for (auto& i : land->mSubLandIDs) {
            res.push_back(i); // int64 to int
        }
        return res;
    });


    RemoteCall::exportAs(NAMESPACE, "LandData_hasParentLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->hasParentLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_hasSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->hasSubLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_isSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isSubLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_isParentLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isParentLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_isMixLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isMixLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_isOrdinaryLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isOrdinaryLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_canCreateSubLand", [db](int id) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->canCreateSubLand();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_getParentLand", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return land->getParentLand()->getLandID();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_getSubLands", [db](int id) -> std::vector<int> {
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
    RemoteCall::exportAs(NAMESPACE, "LandData_getNestedLevel", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return 0;
        return land->getNestedLevel();
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_getRootLand", [db](int id) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return land->getRootLand()->getLandID();
    });

    RemoteCall::exportAs(NAMESPACE, "LandData_setSaleing", [db](int id, bool isSale) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setSaleing(isSale);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_setIs3DLand", [db](int id, bool is3D) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setIs3DLand(is3D);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_setLandOwner", [db](int id, string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandOwner(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_setSalePrice", [db](int id, int price) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setSalePrice(price);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_setLandDescribe", [db](int id, string const& describe) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandDescribe(describe);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_setLandName", [db](int id, string const& name) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->setLandName(name);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_addLandMember", [db](int id, string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->addLandMember(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_removeLandMember", [db](int id, string const& uuid) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->removeLandMember(uuid);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData__setLandPos", [db](int id, IntPos const& a, IntPos const& b) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->_setLandPos(land::LandPos::make(a.first, b.first));
    });

    RemoteCall::exportAs(NAMESPACE, "LandData_isRadiusInLand", [db](int id, IntPos const& pos, int radius) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isRadiusInLand(pos.first, radius);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_isAABBInLand", [db](int id, IntPos const& a, IntPos const& b) -> bool {
        auto land = db->getLand(id);
        if (!land) return false;
        return land->isAABBInLand(a.first, b.first);
    });
    RemoteCall::exportAs(NAMESPACE, "LandData_getPermType", [db](int id, string const& uuid) -> int {
        auto land = db->getLand(id);
        if (!land) return -1;
        return static_cast<int>(land->getPermType(uuid));
    });
}


using namespace ll::hash_utils;
class ScriptEventManager {
private:
    int64                                             mListenerCount{0}; // 监听器计数
    std::unordered_map<int64, ll::event::ListenerPtr> mListeners;        // 监听器列表 (key: ScriptEventID)

public:
    string genListenerID() { return NAMESPACE + "_Event_" + std::to_string(mListenerCount++); }

    void addListener(string const& scriptEventID, ll::event::ListenerPtr listener) {
        mListeners[doHash(scriptEventID)] = std::move(listener);
    }
    void removeListener(string const& scriptEventID) {
        ll::event::EventBus::getInstance().removeListener(mListeners[doHash(scriptEventID)]);
        mListeners.erase(doHash(scriptEventID));
    }

public:
    static ScriptEventManager& getInstance() {
        static ScriptEventManager instance;
        return instance;
    }
};

#define REGISTER_LISTENER(className, importFunc, callParams, cancelFunc)                                               \
    eventManager->addListener(                                                                                         \
        scriptEventID,                                                                                                 \
        bus->emplaceListener<className>([eventName, scriptEventID, eventManager](className& ev) {                      \
            if (!RemoteCall::hasFunc(eventName, scriptEventID)) {                                                      \
                eventManager->removeListener(scriptEventID);                                                           \
                return;                                                                                                \
            }                                                                                                          \
            bool result = true;                                                                                        \
            try {                                                                                                      \
                result = RemoteCall::importAs<bool importFunc>(eventName, scriptEventID) callParams;                   \
            } catch (...) {}                                                                                           \
            if (!result) {                                                                                             \
                cancelFunc;                                                                                            \
            }                                                                                                          \
        })                                                                                                             \
    );                                                                                                                 \
    return true;


void Export_LDEvents() {
    auto* bus          = &ll::event::EventBus::getInstance();
    auto* eventManager = &ScriptEventManager::getInstance();

    RemoteCall::exportAs(NAMESPACE, "ScriptEventManager_genListenerID", [eventManager]() -> string {
        return eventManager->genListenerID();
    });
    RemoteCall::exportAs(
        NAMESPACE,
        "Event_RegisterListener",
        [bus, eventManager](string const& eventName, string const& scriptEventID) -> bool {
            if (!RemoteCall::hasFunc(eventName, scriptEventID)) {
                return false;
            }

            switch (doHash(eventName)) {

            case doHash("PlayerAskCreateLandBeforeEvent"): {
                REGISTER_LISTENER(land::PlayerAskCreateLandBeforeEvent, (Player*), (&ev.getPlayer()), ev.cancel());
            }
            case doHash("PlayerAskCreateLandAfterEvent"): {
                REGISTER_LISTENER(
                    land::PlayerAskCreateLandAfterEvent,
                    (Player*, bool),
                    (&ev.getPlayer(), ev.is3DLand()),
                )
            }

            case doHash("PlayerBuyLandBeforeEvent"): {
                REGISTER_LISTENER(
                    land::PlayerBuyLandBeforeEvent,
                    (Player*, int, IntPos, IntPos, bool),
                    (&ev.getPlayer(),
                     ev.getPrice(),
                     IntPos{ev.getSelector()->getPointA().value(), ev.getSelector()->getDimensionId()},
                     IntPos{ev.getSelector()->getPointB().value(), ev.getSelector()->getDimensionId()},
                     ev.getSelector()->is3D()),
                    ev.cancel()
                )
            }
            case doHash("PlayerBuyLandAfterEvent"): {
                REGISTER_LISTENER(
                    land::PlayerBuyLandAfterEvent,
                    (Player*, int),
                    (&ev.getPlayer(), ev.getLandData()->getLandID()),
                )
            }

            case doHash("PlayerEnterLandEvent"): {
                REGISTER_LISTENER(land::PlayerEnterLandEvent, (Player*, int), (&ev.getPlayer(), ev.getLandID()), )
            }
            case doHash("PlayerLeaveLandEvent"): {
                REGISTER_LISTENER(land::PlayerLeaveLandEvent, (Player*, int), (&ev.getPlayer(), ev.getLandID()), )
            }

            case doHash("PlayerDeleteLandBeforeEvent"): {
                REGISTER_LISTENER(
                    land::PlayerDeleteLandBeforeEvent,
                    (Player*, int, int),
                    (&ev.getPlayer(), ev.getLandID(), ev.getRefundPrice()),
                    ev.cancel()
                )
            }
            case doHash("PlayerDeleteLandAfterEvent"): {
                REGISTER_LISTENER(land::PlayerDeleteLandAfterEvent, (Player*, int), (&ev.getPlayer(), ev.getLandID()), )
            }

            case doHash("LandMemberChangeBeforeEvent"): {
                REGISTER_LISTENER(
                    land::LandMemberChangeBeforeEvent,
                    (Player*, string, int, bool),
                    (&ev.getPlayer(), ev.getTargetPlayer(), ev.getLandID(), ev.isAdd()),
                    ev.cancel()
                )
            }
            case doHash("LandMemberChangeAfterEvent"): {
                REGISTER_LISTENER(
                    land::LandMemberChangeAfterEvent,
                    (Player*, string, int, bool),
                    (&ev.getPlayer(), ev.getTargetPlayer(), ev.getLandID(), ev.isAdd()),
                )
            }

            case doHash("LandOwnerChangeBeforeEvent"): {
                REGISTER_LISTENER(
                    land::LandOwnerChangeBeforeEvent,
                    (Player*, Player*, int),
                    (&ev.getPlayer(), &ev.getNewOwner(), ev.getLandID()),
                    ev.cancel()
                )
            }
            case doHash("LandOwnerChangeAfterEvent"): {
                REGISTER_LISTENER(
                    land::LandOwnerChangeAfterEvent,
                    (Player*, Player*, int),
                    (&ev.getPlayer(), &ev.getNewOwner(), ev.getLandID()),
                )
            }

            case doHash("LandRangeChangeBeforeEvent"): {
                REGISTER_LISTENER(
                    land::LandRangeChangeBeforeEvent,
                    (Player*, int, IntPos, IntPos, int, int),
                    (&ev.getPlayer(),
                     ev.getLandData()->getLandID(),
                     IntPos{ev.getNewRange().mMin_A, ev.getLandData()->getLandDimid()},
                     IntPos{ev.getNewRange().mMax_B, ev.getLandData()->getLandDimid()},
                     ev.getNeedPay(),
                     ev.getRefundPrice()),
                    ev.cancel()
                )
            }
            case doHash("LandRangeChangeAfterEvent"): {
                REGISTER_LISTENER(
                    land::LandRangeChangeAfterEvent,
                    (Player*, int, IntPos, IntPos, int, int),
                    (&ev.getPlayer(),
                     ev.getLandData()->getLandID(),
                     IntPos{ev.getNewRange().mMin_A, ev.getLandData()->getLandDimid()},
                     IntPos{ev.getNewRange().mMax_B, ev.getLandData()->getLandDimid()},
                     ev.getNeedPay(),
                     ev.getRefundPrice()),
                )
            }

            default:
                return false;
            }
        }
    );
}


// export
void ExportLDAPI() {
    Export_Class_PLand();
    Export_Class_LandData();
    Export_Class_LandPos();
    Export_LDEvents();
}