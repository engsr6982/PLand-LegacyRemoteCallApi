add_rules("mode.debug", "mode.release")

add_repositories("liteldev-repo https://github.com/LiteLDev/xmake-repo.git")
add_repositories("engsr6982-repo https://github.com/engsr6982/xmake-repo.git")

-- add_requires("levilamina x.x.x") for a specific version
-- add_requires("levilamina develop") to use develop version
-- please note that you should add bdslibrary yourself if using dev version
add_requires("levilamina 1.3.1", {configs = {target_type = "server"}})
add_requires("levibuildscript 0.4.0")
add_requires("legacyremotecall 0.9.0-rc.1")

local PLandVersion = "0.10.0"
add_requires("pland "..PLandVersion)

if not has_config("vs_runtime") then
    set_runtimes("MD")
end

option("target_type")
    set_default("server")
    set_showmenu(true)
    set_values("server", "client")
option_end()

target("PLand-LegacyRemoteCallApi") -- Change this to your mod name.
    add_rules("@levibuildscript/linkrule")
    add_rules("@levibuildscript/modpacker")
    add_cxflags(
        "/EHa",
        "/utf-8",
        "/W4",
        "/w44265",
        "/w44289",
        "/w44296",
        "/w45263",
        "/w44738",
        "/w45204"
    )
    add_defines("NOMINMAX", "UNICODE", "_HAS_CXX23=1")
    add_files("src/**.cpp", "src/**.cc")
    add_includedirs("src")
    add_packages("levilamina", "pland", "legacyremotecall")
    set_exceptions("none") -- To avoid conflicts with /EHa.
    set_kind("shared")
    set_languages("c++20")
    set_symbols("debug")

    on_load(function (target) 
        local pland_version_major, pland_version_minor, pland_version_patch = PLandVersion:match("^(%d+)%.(%d+)%.(%d+)$")
        target:add("defines", 'SUPPORTED_PLAND_VERSION="'..PLandVersion..'"')
        target:add("defines", 'SUPPORTED_PLAND_VERSION_MAJOR='..pland_version_major)
        target:add("defines", 'SUPPORTED_PLAND_VERSION_MINOR='..pland_version_minor)
        target:add("defines", 'SUPPORTED_PLAND_VERSION_PATCH='..pland_version_patch)
    end)