import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size) {
    let url = constants.api.city.search + "?sort=ten,asc&";
    url += "page=" + (page || 0) + "&";
    url += "size=" + (size || 10)
    return client.requestApi("get", url, {});
  },
};
