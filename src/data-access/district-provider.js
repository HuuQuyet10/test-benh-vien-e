import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size, dmTinhThanhPhoId) {
    let url = constants.api.district.search + "?";
    url += "page=" + (page || 0) + "&";
    url += "size=" + (size || 10) + "&";
    if (dmTinhThanhPhoId) url += "dmTinhThanhPhoId=" + dmTinhThanhPhoId;
    return client.requestApi("get", url, {});
  },
};
