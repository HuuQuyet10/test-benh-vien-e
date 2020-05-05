import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { Route, Link, Switch } from "react-router-dom";
import RouterWithPaths from "@components/RouterWithPaths";
import $ from "jquery";
import {
  SideBar,
  Header,
  Breadcrumbs,
  Footer,
  SettingLayout,
} from "@admin/components/admin";
import { connect } from "react-redux";
import dateUtils from "mainam-react-native-date-utils";
import "antd/dist/antd.css";
import { Loading } from "@admin/components/admin";
function index(props) {
  useEffect(() => {
    global.registerEvent();
  });

  const routers = [
    {
      path: ["/admin", "/admin/dashboard"],
      component: Loadable({
        loader: () => import("@admin/containers/dashboard"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin", "/admin/phanquyentaikhoan"],
      component: Loadable({
        loader: () => import("@admin/containers/phanquyentaikhoan"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/allocation"],
      component: Loadable({
        loader: () => import("@admin/containers/allocation"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/device"],
      component: Loadable({
        loader: () => import("@admin/containers/device"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/device/create", "/admin/device/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/device/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/device/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/device/detail"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/device-type"],
      component: Loadable({
        loader: () => import("@admin/containers/device-type"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/manufacturer"],
      component: Loadable({
        loader: () => import("@admin/containers/manufacturer"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/supplier"],
      component: Loadable({
        loader: () => import("@admin/containers/company"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/supplier/create", "/admin/supplier/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/company/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/name-device"],
      component: Loadable({
        loader: () => import("@admin/containers/nameDevice"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/status"],
      component: Loadable({
        loader: () => import("@admin/containers/status"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/unit"],
      component: Loadable({
        loader: () => import("@admin/containers/unit"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/user"],
      component: Loadable({
        loader: () => import("@admin/containers/user"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/user/create", "/admin/user/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/user/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/user-info"],
      component: Loadable({
        loader: () => import("@admin/containers/userinfo"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/hospital"],
      component: Loadable({
        loader: () => import("@admin/containers/hospital"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/hospital/create", "/admin/hospital/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/hospital/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/organization"],
      component: Loadable({
        loader: () => import("@admin/containers/organization"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/organization/create", "/admin/organization/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/organization/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/model"],
      component: Loadable({
        loader: () => import("@admin/containers/model"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/model/create", "/admin/model/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/model/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/company-device"],
      component: Loadable({
        loader: () => import("@admin/containers/companyDevice"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/company-device/create", "/admin/company-device/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/companyDevice/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/company-device/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/companyDevice/detail"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/guide-company"],
      component: Loadable({
        loader: () => import("@admin/containers/guide"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/guide-hospital"],
      component: Loadable({
        loader: () => import("@admin/containers/guide/index2"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/guide-department"],
      component: Loadable({
        loader: () => import("@admin/containers/guide/guideDepartment"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/resource"],
      component: Loadable({
        loader: () => import("@admin/containers/resource"),
        loading: Loading,
      }),
    },
    {
      path: ["/admin/user-type"],
      component: Loadable({
        loader: () => import("@admin/containers/user-type"),
        loading: Loading,
      }),
    }
  ];
  if (!props.auth || !props.auth.id) {
    props.history.push("/login");
    return null;
  }
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-inner">
          <SideBar />
          <div className="page-content-wrapper">
            <Header />
            <main id="js-page-content" role="main" className="page-content">
              <Breadcrumbs />
              <Switch>
                {routers.map((route, key) => {
                  if (route.component)
                    return (
                      <RouterWithPaths
                        exact
                        key={key}
                        path={route.path}
                        render={(props) => {
                          return <route.component {...props} />;
                        }}
                      />
                    );
                  return null;
                })}
              </Switch>
            </main>
            <div
              className="page-content-overlay"
              data-action="toggle"
              data-class="mobile-nav-on"
            ></div>
            <Footer />
            <div
              className="modal fade modal-backdrop-transparent"
              id="modal-shortcut"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modal-shortcut"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-top modal-transparent"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <ul className="app-list w-auto h-auto p-0 text-left">
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Home</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="page_inbox_general.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                            <i className="ni ni-envelope icon-stack-1x text-white"></i>
                          </div>
                          <span className="app-list-name">Inbox</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Add More</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p id="js-color-profile" className="d-none">
              <span className="color-primary-50"></span>
              <span className="color-primary-100"></span>
              <span className="color-primary-200"></span>
              <span className="color-primary-300"></span>
              <span className="color-primary-400"></span>
              <span className="color-primary-500"></span>
              <span className="color-primary-600"></span>
              <span className="color-primary-700"></span>
              <span className="color-primary-800"></span>
              <span className="color-primary-900"></span>
              <span className="color-info-50"></span>
              <span className="color-info-100"></span>
              <span className="color-info-200"></span>
              <span className="color-info-300"></span>
              <span className="color-info-400"></span>
              <span className="color-info-500"></span>
              <span className="color-info-600"></span>
              <span className="color-info-700"></span>
              <span className="color-info-800"></span>
              <span className="color-info-900"></span>
              <span className="color-danger-50"></span>
              <span className="color-danger-100"></span>
              <span className="color-danger-200"></span>
              <span className="color-danger-300"></span>
              <span className="color-danger-400"></span>
              <span className="color-danger-500"></span>
              <span className="color-danger-600"></span>
              <span className="color-danger-700"></span>
              <span className="color-danger-800"></span>
              <span className="color-danger-900"></span>
              <span className="color-warning-50"></span>
              <span className="color-warning-100"></span>
              <span className="color-warning-200"></span>
              <span className="color-warning-300"></span>
              <span className="color-warning-400"></span>
              <span className="color-warning-500"></span>
              <span className="color-warning-600"></span>
              <span className="color-warning-700"></span>
              <span className="color-warning-800"></span>
              <span className="color-warning-900"></span>
              <span className="color-success-50"></span>
              <span className="color-success-100"></span>
              <span className="color-success-200"></span>
              <span className="color-success-300"></span>
              <span className="color-success-400"></span>
              <span className="color-success-500"></span>
              <span className="color-success-600"></span>
              <span className="color-success-700"></span>
              <span className="color-success-800"></span>
              <span className="color-success-900"></span>
              <span className="color-fusion-50"></span>
              <span className="color-fusion-100"></span>
              <span className="color-fusion-200"></span>
              <span className="color-fusion-300"></span>
              <span className="color-fusion-400"></span>
              <span className="color-fusion-500"></span>
              <span className="color-fusion-600"></span>
              <span className="color-fusion-700"></span>
              <span className="color-fusion-800"></span>
              <span className="color-fusion-900"></span>
            </p>
          </div>
        </div>
      </div>
      <SettingLayout />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth.auth,
  };
}

export default connect(mapStateToProps)(index);
