import constants from "@strings";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import clientUtils from "@utils/client-utils";
import userProvider from "@data-access/user-provider";

function onLogin(username, password) {
  return (dispath, getState) => {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        snackbar.show("Vui lòng nhập tài khoản và mật khẩu", "danger");
        return;
      }
      userProvider
        .login(username, password)
        .then((res) => {
          switch (res.code) {
            case 0:
              snackbar.show("Đăng nhập thành công", "success");
              dispath(
                updateData({
                  auth: res.data,
                  detail: null,
                })
              );
              clientUtils.auth = "Bearer " + res.data.access_token || "";
              resolve(res.data);
              break;
            default:
              snackbar.show(
                res.message || constants.text.user.login_error,
                "danger"
              );
              break;
          }
          reject("Đăng nhập không thành công");
        })
        .catch((e) => {
          reject(e);
          console.log(e);
        });
    });
  };
}

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "AUTH-UPDATE-DATA",
      data: data,
    });
  };
}
export default {
  onLogin,
  onLogout() {
    return (dispatch) => {
      return new Promise((resolve, reject) => {
        dispatch(
          updateData({
            auth: null,
            detail: null,
          })
        );
        clientUtils.auth = null;
        resolve();
      });
    };
  },
  updateData,
};
