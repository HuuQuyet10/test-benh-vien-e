import client from "../utils/client-utils";
import stringUtils from "mainam-react-native-string-utils";
import constants from "../resources/strings";
import datacacheProvider from "./datacache-provider";
import clientUtils from "../utils/client-utils";

export default {
  login(username, password) {
    let object = {
      username,
      password
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.user.login, object)
        .then(x => {
          resolve(x);
        })
        .catch(e => {
          reject(e);
        });
    });
  },
  search(page, size, dmDonViTen, username, roleId, email, createdAt, trangThai) {
    let url = constants.api.user.search + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (dmDonViTen) url += "&dmDonViTen=" + dmDonViTen
    if (username) url += "&username=" + username;
    if (roleId) url += "&roleId=" + roleId
    if (email) url += "&email=" + email;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (trangThai) url += "&trangThai=" + trangThai;
    return client.requestApi("get", url, {});
  },
  getById(id) {
    let url = constants.api.user.search + "/" + id;
    return client.requestApi("get", url, {});
  },
  createOrEdit(id, params) {
    if (!id) {
      let url = constants.api.user.search;
      return client.requestApi("post", url, params);
    } else {
      let url = constants.api.user.search + "/" + id;
      return client.requestApi("put", url, params);
    }
  },
  changePass(id, password, newPassword) {
    let url = constants.api.user.search + "/change-password/" + id;
    return client.requestApi("put", url, {
      password,
      newPassword
    });
  },

  roles(page, size, ma, ten, createdAt) {
    let url = constants.api.user.roles + "?";
    url += "page=" + ((page - 1) || 0) + "&";
    url += "size=" + (size || 10) + "&sort=createdAt,desc";
    if (ma) url += "&ma=" + ma
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    return client.requestApi("get", url, {});
  },
  rolesCreateOrEdit(id, ten, ma) {
    if (!id) {
      let url = constants.api.user.roles;
      return client.requestApi("post", url, {
        ten,
        ma
      });
    } else {
      let url = constants.api.user.roles + "/" + id;
      return client.requestApi("put", url, {
        ten,
        ma
      });
    }
  },
  rolesDelete(id) {
    let url = constants.api.user.roles + "/" + id;
    return client.requestApi("delete", url, {});
  },
};
