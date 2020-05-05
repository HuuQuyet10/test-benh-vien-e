import client from "../utils/client-utils";
import constants from "../resources/strings";
// loaiDonVi : 10 csyt, 20 công ty, 30 cơ quan quản lý
export default {
  getById(id) {
    let url = constants.api.hospital.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, loaiDonVi, ma, maSoThue, ten, loaiCsyt, createdAt, soDienThoai, dmTinhThanhPhoId, dmQuanHuyenId, dmCoQuanQuanLyId, loaiCongTy, nguoiLienHe, coQuanQuanLyTen) {
    let url = constants.api.hospital.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (loaiDonVi) url += "&loaiDonVi=" + loaiDonVi;
    if (ma) url += "&ma=" + ma;
    if (maSoThue) url += "&maSoThue=" + maSoThue;
    if (ten) url += "&ten=" + ten;
    if (loaiCsyt) url += "&loaiCsyt=" + loaiCsyt;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (soDienThoai) url += "&soDienThoai=" + soDienThoai;
    if (dmTinhThanhPhoId) url += "&dmTinhThanhPhoId=" + dmTinhThanhPhoId;
    if (dmQuanHuyenId) url += "&dmQuanHuyenId=" + dmQuanHuyenId;
    if (dmCoQuanQuanLyId) url += "&coQuanQuanLyId=" + dmCoQuanQuanLyId;
    if (loaiCongTy) url += "&loaiCongTy=" + loaiCongTy;
    if (nguoiLienHe) url += "&nguoiLienHe=" + nguoiLienHe;
    if (coQuanQuanLyTen) url += "&coQuanQuanLyTen=" + coQuanQuanLyTen;
    return client.requestApi("get", url, {});
  },
  report(loaiDonVi, ma, maSoThue, ten, loaiCsyt, createdAt, soDienThoai, dmTinhThanhPhoId, dmQuanHuyenId, dmCoQuanQuanLyId, loaiCongTy, nguoiLienHe, coQuanQuanLyTen) {
    let url = constants.api.hospital.report + "?";
    if (loaiDonVi) url += "loaiDonVi=" + loaiDonVi + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma;
    if (maSoThue) url += "&maSoThue=" + maSoThue;
    if (ten) url += "&ten=" + ten;
    if (loaiCsyt) url += "&loaiCsyt=" + loaiCsyt;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (soDienThoai) url += "&soDienThoai=" + soDienThoai;
    if (dmTinhThanhPhoId) url += "&dmTinhThanhPhoId=" + dmTinhThanhPhoId;
    if (dmQuanHuyenId) url += "&dmQuanHuyenId=" + dmQuanHuyenId;
    if (dmCoQuanQuanLyId) url += "&dmCoQuanQuanLyId=" + dmCoQuanQuanLyId;
    if (loaiCongTy) url += "&loaiCongTy=" + loaiCongTy;
    if (nguoiLienHe) url += "&nguoiLienHe=" + nguoiLienHe;
    if (coQuanQuanLyTen) url += "&coQuanQuanLyTen=" + coQuanQuanLyTen;
    return client.requestApiReport("get", url, {});
  },
  delete(id) {
    let url = constants.api.hospital.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(
    id,
    ma,
    maSoThue,
    ten,
    logo,
    loaiCsyt,
    nguoiLienHe,
    dmTinhThanhPhoId,
    soDienThoai,
    dmQuanHuyenId,
    dmXaPhuongId,
    ghiChu,
    diaChi,
    coQuanQuanLyIds,
    email,
    loaiDonVi,
    loaiCongTy
  ) {
    if (!id) {
      let url = constants.api.hospital.search;
      return client.requestApi("post", url, {
        ma,
        maSoThue,
        ten,
        logo,
        loaiCsyt,
        nguoiLienHe,
        dmTinhThanhPhoId,
        soDienThoai,
        dmQuanHuyenId,
        dmXaPhuongId,
        ghiChu,
        diaChi,
        coQuanQuanLyIds,
        email,
        loaiDonVi,
        loaiCongTy
      });
    } else {
      let url = constants.api.hospital.search + "/" + id;
      return client.requestApi("put", url, {
        ma,
        maSoThue,
        ten,
        logo,
        loaiCsyt,
        nguoiLienHe,
        dmTinhThanhPhoId,
        soDienThoai,
        dmQuanHuyenId,
        dmXaPhuongId,
        ghiChu,
        diaChi,
        coQuanQuanLyIds,
        email,
        loaiDonVi,
        loaiCongTy
      });
    }
  },
};
