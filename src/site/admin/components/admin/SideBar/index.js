import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { connect } from "react-redux";
import ItemMenu from "../ItemMenu";
import $ from "jquery";
function index(props) {
  const menus = useRef(null);
  console.log(props.auth);
  const [state, _setState] = useState({
    show: false,
    // menus: getMenu()
  });

  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const getMenu = () => {
    let allMenus = [
      {
        userType: ["co_so_y_te", "bo_y_te", "cong_ty", "so_y_te", "vu_ttb"],
        href: "/admin/dashboard",
        i18n: "nav.dashboard",
        name: "Dashboard",
        icon: "fal fa-game-board-alt",
        filter: "dashboard tổng quan",
      },
      {
        userType: ["co_so_y_te", "bo_y_te", "cong_ty", "so_y_te", "vu_ttb"],
        href: "/admin/allocation",
        i18n: "nav.dashboard",
        name: "Bản đồ phân bổ",
        icon: "fal fa-map-marked-alt",
        filter: "bản đồ phân bổ allocation",
      },
      {
        userType: ["bo_y_te", "so_y_te", "vu_ttb"],
        href: "#",
        i18n: "nav.user",
        name: "Quản lý tài khoản",
        icon: "fal fa-users",
        filter: "quan ly tai khoan",
        menus: [
          {
            href: "/admin/user-type",
            name: "Quản lý loại tài khoản",
            i18n: "nav.user-type",
          },
          {
            href: "/admin/user",
            name: "Quản lý tài khoản",
            i18n: "nav.user",
          },
        ],
      },
      {
        userType: ["co_so_y_te", "bo_y_te", "so_y_te", "vu_ttb"],
        // href: "#",
        href: "/admin/hospital",
        i18n: "nav.device_management",
        name: "Quản lý cơ sở y tế",
        icon: "fal fa-hospital",
        filter: "quan ly co so y te",
        // menus: [
        //   {
        //     userType: ["co_so_y_te", "bo_y_te"],
        //     href: "/admin/hospital",
        //     name: "Cơ sở y tế",
        //     i18n: "nav.hospital",
        //   },
        // ],
      },
      {
        userType: ["bo_y_te", "so_y_te", "vu_ttb"],
        href: "/admin/organization",
        name: "Cấp cơ quan quản lý",
        i18n: "nav.organization",
        icon: "fal fa-hotel",
        filter: "organization Cấp cơ quan quản lý",
      },
      {
        userType:["co_so_y_te", "bo_y_te", "so_y_te", "vu_ttb"],
        href: "/admin/device",
        name: "Quản lý trang thiết bị",
        i18n: "nav.organization",
        icon: "fal fa-layer-group",
        filter: "device_management quan ly trang thiet bi",
      },
      // {
      //   userType: ["co_so_y_te", "bo_y_te", "so_y_te", "vu_ttb"],
      //   href: "#",
      //   i18n: "nav.device_management",
      //   name: "Quản lý trang thiết bị",
      //   icon: "fal fa-layer-group",
      //   filter: "quan ly trang thiet bi",
      //   menus: [
      //     // {
      //     //   userType: ["co_so_y_te", "bo_y_te"],
      //     //   href: "/admin/device/create",
      //     //   name: "Thêm thiết bị",
      //     //   i18n: "nav.device_add_new",
      //     // },
      //     {
      //       userType: ["co_so_y_te", "bo_y_te", "vu_ttb"],
      //       href: "/admin/device",
      //       name: "Danh sách thiết bị",
      //       i18n: "nav.list_device",
      //     },
      //   ],
      // },
      {
        userType: ["bo_y_te", "cong_ty", "vu_ttb"],
        href: "/admin/supplier",
        name: "Quản lý công ty TTB",
        i18n: "nav.company",
        icon: "fal fa-hotel",
        filter: "organization Quản lý công ty TTB",
      },
      // {
      //   userType: ["bo_y_te", "cong_ty", "vu_ttb"],
      //   href: "#",
      //   i18n: "nav.mgr_category",
      //   name: "Công ty trang thiết bị",
      //   icon: "fal fa-hotel",
      //   menus: [
      //     {
      //       userType: ["bo_y_te", "cong_ty"],
      //       href: "/admin/supplier",
      //       i18n: "nav.supplier",
      //       name: "Quản lý công ty TTB",
      //     },
      //     {
      //       userType: ["bo_y_te", "cong_ty"],
      //       href: "/admin/company-device",
      //       i18n: "nav.company_device",
      //       name: "Quản lý thiết bị - Công ty TTB",
      //     }
      //   ],
      // },
      {
        userType: ["co_so_y_te", "bo_y_te", "cong_ty", "so_y_te", "vu_ttb"],
        href: "#",
        i18n: "nav.mgr_category",
        name: "Quản lý danh mục",
        icon: "fal fa-list-alt",
        menus: [
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/name-device",
            i18n: "nav.name-device",
            name: "Danh mục thiết bị",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/device-type",
            i18n: "nav.device_type",
            name: "Loại thiết bị",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/manufacturer",
            i18n: "nav.manufacturer",
            name: "Hãng sản xuất",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/unit",
            i18n: "nav.unit",
            name: "Đơn vị tính",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/status",
            i18n: "nav.status",
            name: "Trạng thái",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/model",
            i18n: "nav.model",
            name: "Model",
          },
          {
            userType: ["co_so_y_te", "bo_y_te", "cong_ty"],
            href: "/admin/resource",
            i18n: "nav.resource",
            name: "Nguồn vốn",
          },
        ],
      },
      {
        userType: ["bo_y_te", "cong_ty", "vu_ttb"],
        href: "/admin/guide-company",
        i18n: "nav.guide-company",
        name: "HDSD - Công ty",
        icon: "fal fa-game-board-alt",
        filter: "guide-company HDSD - Công ty",
      },
      {
        userType: ["co_so_y_te", "bo_y_te", "so_y_te", "vu_ttb"],
        href: "/admin/guide-hospital",
        i18n: "nav.guide-hospital",
        name: "HDSD - Cơ sở y tế",
        icon: "fal fa-game-board-alt",
        filter: "guide-hospital HDSD - Cơ sở y tế",
      },
      {
        userType: ["bo_y_te", "so_y_te", "vu_ttb"],
        href: "/admin/guide-department",
        i18n: "nav.guide-department",
        name: "HDSD - Sở y tế",
        icon: "fal fa-game-board-alt",
        filter: "guide-department HDSD - sở y tế",
      },
    ]
    return allMenus.filter(item => {
      if (!(item.userType || []).length)
        return true;
      for (let i = 0; i < item.userType.length; i++) {
        if (item.userType[i] == (props.auth.authorities && props.auth.authorities.length && props.auth.authorities[0])) {
          return true;
        }
      }
    })
  }
  useEffect(() => {
    try {
      window.initApp.listFilter(
        $("#js-nav-menu"),
        $("#nav_filter_input"),
        $("#js-primary-nav")
      );
    } catch (error) { }
  });
  useEffect(() => {
    setState({ menus: getMenu() })
    if (menus.current) {
      setState({ menus: menus.current });
    }
  }, []);
  const toggle = (item) => {
    item.open = !item.open;
    menus.current = [...state.menus];
    setState({ menus: menus.current });
  };
  return (
    <aside className="page-sidebar list-filter-active">
      <div
        className="page-logo"
        style={{ backgroundColor: "#FFF", padding: 0, height: 80 }}
      >
        <a
          href="#"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          // data-toggle="modal"
          // data-target="#modal-shortcut"
          style={{ padding: 5, width: "65%" }}
        >
          <img
            src={require("@images/logobyt.png")}
            alt="iSofH"
            style={{ maxHeight: 70, maxWidth: "95%" }}
            aria-roledescription="logo"
          />
          {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
        </a>
        <a
          href="#"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          // data-toggle="modal"
          // data-target="#modal-shortcut"
          style={{ padding: 5, width: "35%" }}
        >
          <img
            src={require("@images/logo.png")}
            alt="iSofH"
            style={{ maxHeight: 70, maxWidth: "98%" }}
            aria-roledescription="logo"
          />
          {/* <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
          <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i> */}
        </a>
      </div>
      <nav
        id="js-primary-nav"
        className="primary-nav js-list-filter"
        role="navigation"
      >
        <div className="nav-filter">
          <div className="position-relative">
            <input
              type="text"
              id="nav_filter_input"
              placeholder="Tìm kiếm tính năng"
              className="form-control"
              tabIndex="0"
            />
            <a
              href="#"
              onClick={() => {
                return false;
              }}
              className="btn-primary btn-search-close js-waves-off"
              data-action="toggle"
              data-class="list-filter-active"
              data-target=".page-sidebar"
            >
              <i className="fal fa-chevron-up"></i>
            </a>
          </div>
        </div>
        <div className="info-card">
          <img
            src="/img/demo/avatars/avatar-admin.png"
            className="profile-image rounded-circle"
            alt={props.auth.full_name}
          />
          <div className="info-card-text">
            <a href="#" className="d-flex align-items-center text-white">
              <span className="text-truncate text-truncate-sm d-inline-block">
                {props.auth.full_name}
              </span>
            </a>
            {props.auth.email && (
              <span className="d-inline-block text-truncate text-truncate-sm">
                {props.auth.email}
              </span>
            )}
          </div>
          <img
            src="/img/card-backgrounds/cover-2-lg.png"
            className="cover"
            alt="cover"
          />
          <a
            href="#"
            onClick={() => {
              return false;
            }}
            className="pull-trigger-btn"
            data-action="toggle"
            data-class="list-filter-active"
            data-target=".page-sidebar"
            data-focus="nav_filter_input"
          >
            <i className="fal fa-angle-down"></i>
          </a>
        </div>
        <ul id="js-nav-menu" className="nav-menu">
          {state.menus && state.menus.length && state.menus.map((item, index) => {
            // if (item.authorities) {
            // props.auth.authorities.map(item1 => {
            //   if (item.authorities == item1) {
            //     return <ItemMenu key={index} item={item} toggle={toggle} />;
            //   }
            // })
            // } else {
            return <ItemMenu key={index} item={item} toggle={toggle} />;
            // }
          })}
        </ul>
        <div className="filter-message js-filter-message bg-success-600"></div>
      </nav>
      <div className="nav-footer shadow-top">
        <a
          href="#"
          onClick={() => {
            return false;
          }}
          data-action="toggle"
          data-class="nav-function-minify"
          className="hidden-md-down"
        >
          <i className="ni ni-chevron-right"></i>
          <i className="ni ni-chevron-right"></i>
        </a>
        <ul className="list-table m-auto nav-footer-buttons"></ul>
      </div>
    </aside>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

export default connect(mapStateToProps)(index);
