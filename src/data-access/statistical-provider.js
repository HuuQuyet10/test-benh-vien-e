import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
    status(trangThaiId, tinhThanhPhoId, quanHuyenId, xaPhuongId, coSoYTeId, tieuChi) {
        let url = constants.api.statistical.status + "?";
        url += "&trangThaiId=" + (trangThaiId || "");
        url += "&tinhThanhPhoId=" + (tinhThanhPhoId || "");
        url += "&quanHuyenId=" + (quanHuyenId || "");
        url += "&xaPhuongId=" + (xaPhuongId || "");
        url += "&coSoYTeId=" + (coSoYTeId || "");
        url += "&tieuChi=" + (tieuChi || "");
        return client.requestApi("get", url, {});
    },
};