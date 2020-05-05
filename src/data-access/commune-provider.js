import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size, dmQuanHuyenId) {
    let url = constants.api.commune.search + "?sort=ten,asc&";
    url += "page=" + (page || 0) + "&";
    url += "size=" + (size || 10) + "&";
    if (dmQuanHuyenId) url += "dmQuanHuyenId=" + dmQuanHuyenId;
    return client.requestApi("get", url, {});
  },
};
