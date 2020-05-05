import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.unit.search + "/" + id;
    return client.requestApi("get", url, {});
  },

  search(page, size, ma, ten) {
    let url = constants.api.unit.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma
    if (ten) url += "&ten=" + ten;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.unit.search + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten) {
    if (!id) {
      let url = constants.api.unit.search;
      return client.requestApi("post", url, {
        ten
      });
    } else {
      let url = constants.api.unit.search + "/" + id;
      return client.requestApi("put", url, {
        ten
      });
    }
  },
};
