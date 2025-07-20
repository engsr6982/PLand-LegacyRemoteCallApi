#include "mod/MyMod.h"

#include <memory>

#include "ll/api/mod/RegisterHelper.h"

#include "pland/Version.h"

namespace ldapi {

extern void Export_Class_LandRegistry();
extern void Export_Class_LandAABB();
extern void Export_Class_Land();
extern void Export_LDEvents();


} // namespace ldapi


namespace my_mod {

MyMod& MyMod::getInstance() {
    static MyMod instance;
    return instance;
}
bool MyMod::load() {
    auto& logger = getSelf().getLogger();

    if (SUPPORTED_PLAND_VERSION_MAJOR != PLAND_VERSION_MAJOR || SUPPORTED_PLAND_VERSION_MINOR != PLAND_VERSION_MINOR) {
        logger.warn(
            "PLand 版本不匹配，当前支持版本: v{}.{}.x，实际版本: v{}.{}.x，请确保 PLand-LRCA 与 PLand "
            "版本一致，否则某些功能可能无法正常使用。",
            SUPPORTED_PLAND_VERSION_MAJOR,
            SUPPORTED_PLAND_VERSION_MINOR,
            PLAND_VERSION_MAJOR,
            PLAND_VERSION_MINOR
        );
        logger.warn(
            "Unsupported PLand version, current supported version: v{}.{}.x, actual version: v{}.{}.x, please "
            "ensure that PLand-LRCA and PLand versions are consistent, otherwise some functions may not work properly.",
            SUPPORTED_PLAND_VERSION_MAJOR,
            SUPPORTED_PLAND_VERSION_MINOR,
            PLAND_VERSION_MAJOR,
            PLAND_VERSION_MINOR
        );
    }

    ldapi::Export_Class_LandRegistry();
    ldapi::Export_Class_LandAABB();
    ldapi::Export_Class_Land();
    ldapi::Export_LDEvents();

    return true;
}

bool MyMod::enable() {
    getSelf().getLogger().debug("Enabling...");
    // Code for enabling the mod goes here.
    return true;
}

bool MyMod::disable() {
    getSelf().getLogger().debug("Disabling...");
    // Code for disabling the mod goes here.
    return true;
}

} // namespace my_mod

LL_REGISTER_MOD(my_mod::MyMod, my_mod::MyMod::getInstance());
