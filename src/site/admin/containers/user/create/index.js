import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Col, Row, Input, Select, Switch, Upload, Modal } from "antd";
import userProvider from "@data-access/user-provider";
import fileProvider from "@data-access/file-provider";
import hospitalProvider from "@data-access/hospital-provider";
import snackbar from "@utils/snackbar-utils";
import { AdminPage, Panel } from "@admin/components/admin";
const { Option } = Select;
const { TextArea } = Input;
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
function index(props) {
    const id = props.match.params.id;
    const files = useRef([]);
    const [state, _setState] = useState({
        data: [],
        fileList: [],
        listRoles: [],
        listAll: [],
        ma: "",
        ten: "",
        trangThai: 0
    });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };
    useEffect(() => {
        if (id) {
            getDetail(id);
        }
        getRoles()
        getUnits()
    }, []);
    const getRoles = () => {
        userProvider.roles(1, 9999).then(s => {
            setState({
                listRoles: s.data
            })
        }).catch(e => { })
    }
    const getUnits = () => {
        hospitalProvider.search(1, 9999).then(s => {
            setState({
                listAll: s.data
            })
        }).catch(e => { })
    }
    const { previewVisible, previewImage, fileList } = state;
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    const handleChange = ({ fileList }) => { };
    const handleCancel = () => setState({ previewVisible: false });
    const getDetail = (id) => {
        userProvider.getById(id).then(s => {
            if (s && s.code === 0) {
                setState({
                    roleId: s.data.roleId,
                    dmDonViId: s.data.dmDonViId,
                    username: s.data.username ? s.data.username : "",
                    email: s.data.email ? s.data.email : "",
                    diaChi: s.data.diaChi ? s.data.diaChi : "",
                    anhDaiDien: s.data.anhDaiDien ? s.data.anhDaiDien : "",
                    ghiChu: s.data.ghiChu ? s.data.ghiChu : "",
                    fileList: s.data.anhDaiDien ? [
                        {
                            uid: '-1',
                            name: 'image.png',
                            status: 'done',
                            url: s.data.anhDaiDien.absoluteFileUrl(),
                        }
                    ] : []
                });
            }
        }).catch(e => { })
    }
    const onClose = () => () => {
        props.history.push("/admin/user");
    };

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                handleCreate();
            }
        });
    };
    const { getFieldDecorator } = props.form;
    const handleCreate = () => {
        let {
            username,
            anhDaiDien,
            dmDonViId,
            roleId,
            email,
            diaChi,
            ghiChu,
            trangThai
        } = state
        let params = {
            username: username.trim(),
            anhDaiDien,
            dmDonViId,
            roleId,
            email,
            diaChi,
            ghiChu,
            trangThai
        }
        userProvider.createOrEdit(id, params).then(s => {
            if (s && s.code === 0) {
                if (id) {
                    snackbar.show("Cập nhật tài khoản thành công", "success");
                } else {
                    snackbar.show("Thêm mới tài khoản thành công", "success");
                }
                props.history.push("/admin/user");
            } else if (s && s.code === 1500) {
                snackbar.show("Tên đăng nhập đã tồn tại trên hệ thống, vui lòng kiểm tra lại", "danger");
            } else {
                if (id) {
                    snackbar.show("Cập nhật tài khoản thất bại", "danger");
                } else {
                    snackbar.show("Thêm mới tài khoản thất bại", "danger");
                }
            }
        }).catch(e => { })
    }
    const checkGhiChu = (rule, value, callback) => {
        if (!value || !state.ghiChu) {
            callback();
        } else {
            if (value.length > 255) {
                callback([new Error("Vui lòng nhập ghi chú tối đa 255 kí tự!")]);
            } else {
                callback();
            }
        }
    };
    const checkName = (rule, value, callback) => {
        if (!value || !state.username) {
            callback([new Error("Vui lòng nhập tên đăng nhập")]);
        } else {
            if (value.length > 255) {
                callback([new Error("Vui lòng nhập tên đăng nhập tối đa 255 kí tự!")]);
            } else {
                callback();
            }
        }
    };
    const checkEmail = (rule, value, callback) => {
        if (!value || !state.email) {
            callback([new Error("Vui lòng nhập email")]);
        } else {
            if (!value.isEmail()) {
                callback([new Error("Vui lòng nhập đúng định dạng email")]);
            } else {
                callback();
            }
        }
    };
    const checkAddress = (rule, value, callback) => {
        if (!value || !state.diaChi) {
            callback();
        } else {
            if (value.length > 255) {
                callback([new Error("Vui lòng nhập địa chỉ tối đa 255 kí tự!")]);
            } else {
                callback();
            }
        }
    };
    return (
        <AdminPage
            icon="subheader-icon fal fa-window"
            header={id ? "Cập nhật thông tin tài khoản" : "Thêm mới tài khoản"}
            subheader={
                id
                    ? "Nhập thông tin tài khoản cần chỉnh sửa"
                    : "Nhập thông tin tài khoản cần thêm"
            }>
            <Panel id="panel-list-site" title="THÔNG TIN TÀI KHOẢN">
                <Form layout="vertical" hideRequiredMark onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item label="Loại tài khoản (*)">
                                {getFieldDecorator("roleId", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Chọn loại tài khoản",
                                        },
                                    ],
                                    initialValue: state.roleId
                                })(
                                    <Select
                                        onChange={(e) => {
                                            setState({
                                                roleId: e
                                            });
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
                                )}
                            </Form.Item>
                            <Form.Item label="Đơn vị (*)">
                                {getFieldDecorator("dmDonViId", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "Chọn đơn vị",
                                        },
                                    ],
                                    initialValue: state.dmDonViId
                                })(
                                    <Select
                                        onChange={(e) => {
                                            setState({
                                                dmDonViId: e
                                            });
                                        }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        placeholder="Chọn đơn vị"
                                    >
                                        {state.listAll &&
                                            state.listAll.length &&
                                            state.listAll.map((option, index) => {
                                                return (
                                                    <Option key={index} value={option.id}>
                                                        {option.ten}
                                                    </Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item label="Ảnh tài khoản">
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList.map((item) => {
                                        let item2 = JSON.parse(JSON.stringify(item));
                                        if (item2.url) item2.url = item2.url.absoluteFileUrl();
                                        return item2;
                                    })}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    onRemove={(file) => {
                                        files.current = files.current.filter((item) => item.uid != file.uid);
                                        setState({
                                            fileList: files.current,
                                            hasChange: true,
                                        });
                                    }}
                                    customRequest={({ onSuccess, onError, file }) => {
                                        file.status = "uploading";
                                        files.current.push(file);
                                        setState({
                                            fileList: files.current,
                                        });
                                        fileProvider
                                            .uploadImage(file)
                                            .then((s) => {
                                                var x = files.current.find((item) => item.uid == file.uid);
                                                if (x) {
                                                    if (s && s.code == 0 && s.data.length) {
                                                        setState({
                                                            anhDaiDien: s.data[0]
                                                        })
                                                        let url = s.data[0];
                                                        x.status = "done";
                                                        x.url = url;
                                                    } else {
                                                        x.status = "error";
                                                    }
                                                    setState({
                                                        fileList: files.current,
                                                        hasChange: true,
                                                    });
                                                }
                                            })
                                            .catch((e) => {
                                                var x = files.current.find((item) => item.uid == file.uid);
                                                if (x) {
                                                    x.status = "error";
                                                    setState({
                                                        fileList: files.current,
                                                    });
                                                }
                                            });
                                    }}
                                    accept=".png,.gif,.jpg"
                                >
                                    {fileList.length >= 1 ? null : <div className="ant-upload-text">Upload</div>}
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Form.Item label="Tên đăng nhập *">
                                {getFieldDecorator("username", {
                                    rules: [{ validator: checkName }],
                                    initialValue: state.username
                                })(
                                    <Input
                                        autoComplete="off"
                                        onChange={e => setState({
                                            username: e.target.value
                                        })}
                                        placeholder="Nhập tên đăng nhập"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Email *">
                                {getFieldDecorator("email", {
                                    rules: [{ validator: checkEmail }],
                                    initialValue: state.email
                                })(
                                    <Input
                                        autoComplete="off"
                                        onChange={e => setState({
                                            email: e.target.value
                                        })}
                                        placeholder="Nhập địa chỉ email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item label="Địa chỉ">
                                {getFieldDecorator("diaChi", {
                                    rules: [{ validator: checkAddress }],
                                    initialValue: state.diaChi
                                })(
                                    <Input
                                        autoComplete="off"
                                        onChange={e => setState({
                                            diaChi: e.target.value
                                        })}
                                        placeholder="Nhập địa chỉ"
                                    />
                                )}
                            </Form.Item>
                        </div>
                        <div className="col-6">
                            <Form.Item label="Ghi chú">
                                {getFieldDecorator("ghiChu", {
                                    rules: [{ validator: checkGhiChu }],
                                    initialValue: state.ghiChu
                                })(
                                    <TextArea
                                        rows={5}
                                        onChange={e => setState({
                                            ghiChu: e.target.value
                                        })}
                                        placeholder="Nhập ghi chú"
                                    />
                                )}
                            </Form.Item>
                        </div>
                    </div>
                    <div
                        style={{
                            width: "100%",
                            borderTop: "1px solid #e9e9e9",
                            padding: "16px 16px 0px",
                            background: "#fff",
                            textAlign: "right"
                        }}
                    >
                        <Button onClick={onClose(false)} style={{ marginRight: 8 }}>
                            Hủy
                        </Button>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            {id ? "Lưu thay đổi" : "Tạo mới"}
                        </Button>
                    </div>
                </Form>
            </Panel>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
        </AdminPage>
    );
}

export default (Form.create()(index));
