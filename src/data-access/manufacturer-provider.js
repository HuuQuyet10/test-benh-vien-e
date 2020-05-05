import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.manufacturer.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, ma, ten, createdAt) {
    let url = constants.api.manufacturer.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.manufacturer.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten, ma) {
    if (!id) {
      let url = constants.api.manufacturer.search;
      return client.requestApi("post", url, {
        ten
      });
    } else {
      let url = constants.api.manufacturer.search + "/" + id;
      return client.requestApi("put", url, {
        ten,
        ma
      });
    }
  },
};
