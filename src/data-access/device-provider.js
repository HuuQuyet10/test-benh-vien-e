import client from "@utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.device.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, ma, ten, serial, model, dmHangSanXuat, namSanXuat, createdAt,
    donViSuDung, namSuDung, dmTrangThaiId, coSoYTeId, dmTinhThanhPhoId, dmQuanHuyenId, dmXaPhuongId) {
    let url = constants.api.device.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma;
    if (ten) url += "&ten=" + ten;
    if (serial) url += "&serial=" + serial;
    if (model) url += "&model=" + model;
    if (dmHangSanXuat) url += "&dmHangSanXuatTen=" + dmHangSanXuat;
    if (namSanXuat) url += "&namSanXuat=" + namSanXuat;
    if (donViSuDung) url += "&donViSuDung=" + donViSuDung;
    if (namSuDung) url += "&namSuDung=" + namSuDung;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (dmTrangThaiId) url += "&dmTrangThaiId=" + dmTrangThaiId;
    if (coSoYTeId) url += "&dmCoSoYTeId=" + coSoYTeId;
    if (dmTinhThanhPhoId) url += "&dmTinhThanhPhoId=" + dmTinhThanhPhoId;
    if (dmQuanHuyenId) url += "&dmQuanHuyenId=" + dmQuanHuyenId;
    if (dmXaPhuongId) url += "&dmXaPhuongId=" + dmXaPhuongId;
    return client.requestApi("get", url, {});
  },

  getAllDevice() {
    let url = constants.api.device.get_all + "?page=0&size=1000000&sort=createdAt,desc";
    return client.requestApi("get", url, {});
  },
  report(quanHuyenId, tinhThanhPhoId, dmTrangThaiId, xaPhuongId) {
    let url = constants.api.device.report + "?";
    // url += "coSoYTeId=" + coSoYTeId;
    if (tinhThanhPhoId) url += "&tinhThanhPhoId=" + tinhThanhPhoId;
    if (quanHuyenId) url += "&quanHuyenId=" + quanHuyenId;
    if (dmTrangThaiId) url += "&dmTrangThaiId=" + dmTrangThaiId;
    if (xaPhuongId) url += "&xaPhuongId=" + xaPhuongId;
    return client.requestApiReport("get", url, {});
  },
  delete(id) {
    let url = constants.api.device.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, param) {
    if (!id) {
      let url = constants.api.device.create;
      return client.requestApi("post", url, param);
    } else {
      let url = constants.api.device.create + "/" + id;
      return client.requestApi("put", url, param);
    }
  },
  setMyProduct(products) {
    let url = constants.api.product.set_my_product;
    return client.requestApi("put", url, {
      products
    });
  }
};
