import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.organization.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, maSoThue, ten, dmTinhThanhPhoId, soDienThoai, nguoiLienHe, dmQuanHuyenId, coQuanQuanLyCapTren, createdAt) {
    let url = constants.api.organization.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (maSoThue) url += "&maSoThue=" + maSoThue;
    if (ten) url += "&ten=" + ten;
    if (dmTinhThanhPhoId) url += "&dmTinhThanhPhoId=" + dmTinhThanhPhoId;
    if (soDienThoai) url += "&soDienThoai=" + soDienThoai;
    if (nguoiLienHe) url += "&nguoiLienHe=" + nguoiLienHe;
    if (dmQuanHuyenId) url += "&dmQuanHuyenId=" + dmQuanHuyenId;
    if (coQuanQuanLyCapTren) url += "&coQuanQuanLyCapTrenTen=" + coQuanQuanLyCapTren;
    if (createdAt) url += "&createdAt=" + createdAt;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.organization.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(
    id,
    maSoThue,
    ten,
    email,
    logo,
    coQuanQuanLyCapTrenIds,
    nguoiLienHe,
    dmTinhThanhPhoId,
    soDienThoai,
    dmQuanHuyenId,
    dmXaPhuongId,
    ghiChu,
    soNha
  ) {
    if (!id) {
      let url = constants.api.organization.search;
      return client.requestApi("post", url, {
        maSoThue,
        ten,
        email,
        logo,
        coQuanQuanLyCapTrenIds,
        nguoiLienHe,
        dmTinhThanhPhoId,
        soDienThoai,
        dmQuanHuyenId,
        dmXaPhuongId,
        ghiChu,
        soNha
      });
    } else {
      let url = constants.api.organization.search + "/" + id;
      return client.requestApi("put", url, {
        maSoThue,
        ten,
        email,
        logo,
        coQuanQuanLyCapTrenIds,
        nguoiLienHe,
        dmTinhThanhPhoId,
        soDienThoai,
        dmQuanHuyenId,
        dmXaPhuongId,
        ghiChu,
        soNha
      });
    }
  },
};
