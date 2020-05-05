import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.formType.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, dmThietBiId, ma, ten, createdAt, thietBiPhuTro) {
    let url = constants.api.formType.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma
    if (ten) url += "&ten=" + ten;
    if (dmThietBiId) url += "&dmThietBiId=" + dmThietBiId;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (thietBiPhuTro) url += "&thietBiPhuTro=" + thietBiPhuTro;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.formType.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten, dmThietBiId, ma, thietBiPhuTro) {
    if (!id) {
      let url = constants.api.formType.search;
      return client.requestApi("post", url, {
        ten,
        dmThietBiId,
        thietBiPhuTro
      });
    } else {
      let url = constants.api.formType.search + "/" + id;
      return client.requestApi("put", url, {
        ten,
        dmThietBiId,
        ma,
        thietBiPhuTro
      });
    }
  },
};
