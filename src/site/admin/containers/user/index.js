import React, { useState, useEffect } from "react";
import { AdminPage, Panel } from "@admin/components/admin";
import Table from "@admin/components/common/Table";
import SelectSize from "@admin/components/common/SelectSize";
import Pagination from "@admin/components/common/Pagination";
import { Button, Form, Tooltip, Modal, DatePicker, Select } from "antd";
import userProvider from "@data-access/user-provider";
import DataContants from "@admin/components/config/data-contants";
import { connect } from "react-redux";
const { confirm } = Modal;
const { Option } = Select;
function index(props) {
  const [state, _setState] = useState({
    size: 10,
    page: 1,
    data: [],
    listHospital: []
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onSizeChange = (size) => {
    onSearch("size", size);
    setState({
      size: size
    })
  };
  const onPageChange = (page) => {
    onSearch("page", page);
    setState({
      page: page
    })
  };
  useEffect(() => {
    onSearch(0, 10);
    getRoles()
  }, []);
  const getRoles = () => {
    userProvider.roles(1, 9999).then(s => {
      if (s && s.code === 0) {
        let data = [
          {
            id: "",
            ten: "Tất cả"
          }
        ]
        setState({
          listRoles: data.concat(s.data)
        })
      }

    }).catch(e => { })
  }
  const onSearch = (action, item) => {
    let page = action === "page" ? item : action === "size" ? 1 : state.page;
    let size = action === "size" ? item : state.size;
    let dmDonViTen = action === "dmDonViTen" ? item : state.dmDonViTen;
    let username = action === "username" ? item : state.usernameSearch;
    let roleId = action === "roleId" ? item : state.roleId;
    let email = action === "email" ? item : state.emailSearch;
    let trangThai = action === "trangThai" ? item : state.trangThai;
    let createdAt = action === "createdAt" ? new Date(item).format("YYYY-MM-dd") : item.createdAt ? new Date(item.createdAt).format("YYYY-MM-dd") : item.createdAt
    userProvider
      .search(page, size, dmDonViTen, username, roleId, email, createdAt, trangThai)
      .then((s) => {
        if (s.code == 0) {

          setState({
            total: s.totalElements,
            data:
              s.data && s.data.length
                ? s.data.map((item, index) => {
                  return {
                    key: index,
                    col1: (page - 1) * size + index + 1,
                    col2: item.dmDonVi && item.dmDonVi.ten,
                    col3: item.username,
                    col4: item.role && item.role.ten,
                    col5: item.email,
                    col6: new Date(item.createdAt).format("dd-MM-YYYY"),
                    col7: item.trangThai,
                    col8: item,
                  };
                })
                : [],
          });
        }
      })
      .catch((e) => { });
  };
  const editItem = (item) => {
    if (item) {
      props.history.push("/admin/user/" + item.id)
    } else {
      props.history.push("/admin/user/create")
    }
  };
  const onClose = () => {
    setState({
      ma: "",
      ten: ""
    })
    props.history.push("/admin/user")
  }
  const columns = [
    {
      title: (
        <div className="custome-header">
          <div className="title-box">STT</div>
          <div className="addition-box"></div>
        </div>
      ),
      width: 100,
      dataIndex: "col1",
      key: "col1",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Đơn vị</div>
          <div className="addition-box">
            <div className="search-box">
              <img src={require("@images/icon/ic-search.png")} />
              <input
                value={state.dmDonViTen}
                onChange={(e) => {
                  setState({
                    dmDonViTen: e.target.value
                  })
                  onSearch("dmDonViTen", e.target.value)
                }}
                placeholder="Tìm theo tên đơn vị"
              />
            </div>
          </div>
        </div>
      ),
      width: 200,
      dataIndex: "col2",
      key: "col2",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Tên đăng nhập</div>
          <div className="addition-box">
            <div className="search-box">
              <img src={require("@images/icon/ic-search.png")} />
              <input
                value={state.usernameSearch}
                onChange={(e) => {
                  setState({
                    usernameSearch: e.target.value
                  })
                  onSearch("username", e.target.value)
                }}
                placeholder="Tìm theo tên đăng nhập"
              />
            </div>
          </div>
        </div>
      ),
      width: 200,
      dataIndex: "col3",
      key: "col3",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Loại tài khoản</div>
          <div className="addition-box">
            <Select
              onChange={(e) => {
                setState({
                  roleId: e
                });
                onSearch("roleId", e)
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Chọn loại tài khoản"
            >
              {state.listRoles &&
                state.listRoles.length &&
                state.listRoles.map((option, index) => {
                  return (
                    <Option key={index} value={option.id}>
                      {option.ten}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      ),
      width: 300,
      dataIndex: "col4",
      key: "col4",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Email</div>
          <div className="addition-box">
            <div className="search-box">
              <img src={require("@images/icon/ic-search.png")} />
              <input
                value={state.emailSearch}
                onChange={(e) => {
                  setState({
                    emailSearch: e.target.value
                  })
                  onSearch("email", e.target.value)
                }
                }
                placeholder="Tìm theo email"
              />
            </div>
          </div>
        </div>
      ),
      width: 300,
      dataIndex: "col5",
      key: "col5",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Ngày tạo</div>
          <div className="addition-box">
            <DatePicker
              value={state.createdAt}
              onChange={(e) => {
                onSearch("createdAt", e._d);
                setState({
                  createdAt: e._d
                })
              }}
              style={{ width: "100%" }}
              disabled={props.id ? true : false}
              format={"dd/MM/YYYY"}
              placeholder="Nhập ngày tạo"
              getPopupContainer={trigger => trigger.parentNode}
            />
          </div>
        </div>
      ),
      width: 200,
      dataIndex: "col6",
      key: "col6",
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Trạng thái</div>
          <div className="addition-box">
            <Select
              value={state.trangThai}
              onChange={(e) => {
                onSearch("trangThai", e);
                setState({
                  trangThai: e,
                });
              }}
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Chọn trạng thái"
            >
              {DataContants.listUserStatus &&
                DataContants.listUserStatus.length &&
                DataContants.listUserStatus.map((option, index) => {
                  return (
                    <Option key={index} value={option.id}>
                      {option.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      ),
      width: 300,
      dataIndex: "col7",
      key: "col7",
      render: (item) => {
        return (
          <div className="col-action">
            {
              item === 0 ? "Đang hoạt động" : item === 1 ? "Đã khóa" : ""
            }
          </div>
        );
      },
    },
    {
      title: (
        <div className="custome-header">
          <div className="title-box">Tiện ích</div>
          <div className="addition-box"></div>
        </div>
      ),
      width: 90,
      dataIndex: "col8",
      key: "col8",
      fixed: "right",
      render: (item) => {
        return (
          <div className="col-action">
            <Tooltip placement="topLeft" title={"Sửa"}>
              <div>
                <a
                  onClick={() => editItem(item)}
                  className="btn btn-info btn-icon waves-effect waves-themed"
                >
                  <i className="fal fa-edit"></i>
                </a>
              </div>
            </Tooltip>
            <Tooltip placement="topLeft" title={"Reset mật khẩu"}>
              <div>
                <a
                  // onClick={() => editItem(item)}
                  className="btn btn-info btn-icon waves-effect waves-themed"
                >
                  <i className="fal fa-sync"></i>
                </a>
              </div>
            </Tooltip>
            {
              item && item.trangThai === 0 ?
                <Tooltip placement="topLeft" title={"Khóa tài khoản"}>
                  <div>
                    <a
                      // onClick={() => editItem(item)}
                      className="btn btn-info btn-icon waves-effect waves-themed"
                    >
                      <i className="fal fa-lock"></i>
                    </a>
                  </div>
                </Tooltip> :
                <Tooltip placement="topLeft" title={"Mở khóa tài khoản"}>
                  <div>
                    <a
                      // onClick={() => editItem(item)}
                      className="btn btn-info btn-icon waves-effect waves-themed"
                    >
                      <i className="fal fa-unlock"></i>
                    </a>
                  </div>
                </Tooltip>
            }

          </div>
        );
      },
    },
  ]
  return (
    <AdminPage
      icon="subheader-icon fal fa-window"
      header="Quản lý tài khoản"
      subheader="Danh sách tài khoản"
    >
      <Panel
        id="panel-list-site"
        title="DANH SÁCH TÀI KHOẢN"
        toolbar={
          ((props.auth.authorities || []).find((item) => item == "bo_y_te") == "bo_y_te") ?
            <div className="toolbar">
              <Button className="button" onClick={() => editItem()}>
                Thêm mới
            </Button>
            </div> : ""
        }
      >
        <Table
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          className="custom"
          columns={
            (props.auth.authorities || []).find((item) => item == "bo_y_te") == "bo_y_te" ? columns : (columns && columns.slice(0, 7))
          }
          dataSource={state.data}
        ></Table>
        <div className="footer">
          <SelectSize value={state.size} selectItem={onSizeChange} />
          <Pagination
            onPageChange={onPageChange}
            page={state.page}
            size={state.size}
            total={state.total}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </div>
      </Panel>
    </AdminPage>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

export default connect(mapStateToProps)(Form.create()(index));