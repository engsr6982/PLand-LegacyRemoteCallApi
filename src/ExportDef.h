#pragma once
#include <string>

#include "IRemoteCall.h"
#include "fmt/core.h"

namespace ldapi {

using IntPos   = std::pair<BlockPos, int>; // pos, dimid
using FloatPos = std::pair<Vec3, int>;     // pos, dimid
using string   = std::string;

constexpr auto ExportNamespace = "PLand_LDAPI";


#define LDAPI_COLLECT_EXPORT_SYMBOLS


template <typename CB>
inline bool exportAs(string const& fn, CB&& callback) {
#ifdef LDAPI_COLLECT_EXPORT_SYMBOLS
    fmt::print("Exporting func: {} | {}\n", ExportNamespace, fn);
#endif
    return RemoteCall::exportAs(ExportNamespace, fn, std::move(callback));
}


} // namespace ldapi