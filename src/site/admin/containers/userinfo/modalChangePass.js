import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import "../userinfo/style.scss";
import userProvider from "@data-access/user-provider";
import snackbar from "@utils/snackbar-utils";
import { connect } from "react-redux";
import authAction from "@actions/auth";

function index(props) {
  const [state, _setState] = useState({
    size: 10,
    page: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
  }, []);
  const closeModal = () => {
    props.onClose()
  }
  const { getFieldDecorator } = props.form;

  const handleChangePass = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        userProvider.changePass(props.auth.id, state.password, state.newPassword)
          .then(s => {
            if (s && s.code === 0) {
              snackbar.show("Thay đổi mật khẩu thành công", "success");
              closeModal()
              props.onLogout();
            } else {
              snackbar.show("Thay đổi mật khẩu thất bại", "danger");
            }
          }).catch(e => { })
      }
    })
  }
  return (
    <Modal
      className="change-status"
      width={770}
      title={"Thay đổi mật khẩu"}
      visible={true}
      cancelText={"Đóng"}
      onCancel={closeModal}
      footer={[
        <>
          <Button type="danger" key="back" onClick={() => closeModal()}>Hủy</Button>
          <Button key="submit" type="primary" onClick={(e) => handleChangePass(e)}>Lưu </Button>
        </>
      ]} >
      <div>
        <Form layout="vertical" hideRequiredMark onSubmit={handleChangePass}>
          <Form.Item
            name="owner"
            label="Mật khẩu cũ"
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Nhập mật khẩu",
                },
              ],
              initialValue: state.password,
            })(
              <Input placeholder="Vui lòng mật khẩu cũ"
                type="password"
                onChange={(e) => {
                  setState({
                    password: e.target.value,
                  });
                }}
                value={state.password} />
            )}
          </Form.Item>

          <Form.Item
            name="owner"
            label="Mật khẩu mới"
          >
            {getFieldDecorator("newPassword", {
              rules: [
                {
                  required: true,
                  message: "Nhập mật khẩu mới",
                },
              ],
              initialValue: state.newPassword,
            })(
              <Input placeholder="Vui lòng mật khẩu mới"
                type="password"
                onChange={(e) => {
                  setState({
                    newPassword: e.target.value,
                  });
                }}
                value={state.newPassword} />
            )}
          </Form.Item>

        </Form>
      </div>
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth.auth || {},
  };
}

export default connect(mapStateToProps, {
  onLogout: authAction.onLogout,
})(Form.create()(index));