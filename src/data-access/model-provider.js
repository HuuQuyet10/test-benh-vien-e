import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.model.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, dmThietBiId, ma, ten, dmLoaiThietBiId, dmHangSanXuatId, hangSoHuuId, nuocSanXuatId, nuocSoHuuId, namSanXuat, nhaCungCapId) {
    let url = constants.api.model.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma
    if (ten) url += "&ten=" + ten;
    if (dmThietBiId) url += "&dmThietBiId=" + dmThietBiId;
    if (dmLoaiThietBiId) url += "&dmLoaiThietBiId=" + dmLoaiThietBiId;
    if (dmHangSanXuatId) url += "&dmHangSanXuatId=" + dmHangSanXuatId;
    if (hangSoHuuId) url += "&hangSoHuuId=" + hangSoHuuId;
    if (nuocSanXuatId) url += "&nuocSanXuatId=" + nuocSanXuatId;
    if (nuocSoHuuId) url += "&nuocSoHuuId=" + nuocSoHuuId;
    if (namSanXuat) url += "&namSanXuat=" + namSanXuat;
    if (nhaCungCapId) url += "&nhaCungCapId=" + nhaCungCapId;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.model.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, params) {
    if (!id) {
      let url = constants.api.model.search;
      return client.requestApi("post", url, params);
    } else {
      let url = constants.api.model.search + "/" + id;
      return client.requestApi("put", url, params);
    }
  },
};
