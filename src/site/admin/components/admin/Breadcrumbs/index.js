import React, { useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
// import { useRouter } from 'next/router'
function index(props) {
  // const router = useRouter();
  const getBreadcrumbs = () => {
    let url = (window.location.pathname || "").toLowerCase();
    let obj = [];
    switch (url) {
      case "/admin":
      case "/admin/dashboard":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/dashboard",
            name: "Dashboard",
          },
        ];
        break;
      case "/admin/allocation":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/allocation",
            name: "Bản đồ phân bổ",
          },
        ];
        break;

      case "/admin/phanquyentaikhoan":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin",
            name: "Phân quyền tài khoản",
          },
        ];
        break;
      case "/admin/manufacturer":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/manufacturer",
            name: "Quản lý hãng sản xuất",
          },
        ];
        break;
      case "/admin/user":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/user",
            name: "Quản lý tài khoản",
          },
        ];
        break;
      case "/admin/user-type":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/user-type",
            name: "Quản lý loại tài khoản",
          },
        ];
        break;
      case "/admin/user/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/user",
            name: "Quản lý tài khoản",
          },
          {
            url: "/admin/user/create",
            name: "Tạo mới",
          },
        ];
        break;
      case "/admin/name-device":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/name-device",
            name: "Danh mục thiết bị",
          },
        ];
        break;
      case "/admin/model":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/model",
            name: "Danh mục model",
          },
        ];
        break;
      case "/admin/status":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/status",
            name: "Danh mục trạng thái",
          },
        ];
        break;
      case "/admin/device-type":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/device-type",
            name: "Loại thiết bị",
          },
        ];
        break;

      case "/admin/manufacturer":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/manufacturer",
            name: "Hãng sản xuất",
          },
        ];
        break;
      case "/admin/resource":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/resource",
            name: "Nguồn vốn",
          },
        ];
        break;
      case "/admin/unit":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Quản lý danh mục",
          },
          {
            url: "/admin/unit",
            name: "Đơn vị tính",
          },
        ];
        break;
      case "/admin/supplier":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Công ty trang thiết bị",
          },
          {
            url: "/admin/supplier",
            name: "Công ty TTB",
          },
        ];
        break;
      case "/admin/supplier/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Công ty trang thiết bị",
          },
          {
            url: "/admin/supplier",
            name: "Công ty TTB",
          },
          {
            url: "/admin/supplier/create",
            name: "Tạo mới",
          },
        ];
        break;
      case "/admin/company-device":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Công ty trang thiết bị",
          },
          {
            url: "/admin/company-device",
            name: "Quản lý thiết bị - Công ty TTB",
          },
        ];
        break;
      case "/admin/company-device/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            name: "Công ty trang thiết bị",
          },
          {
            url: "/admin/company-device",
            name: "Quản lý thiết bị - Công ty TTB",
          },
          {
            url: "/admin/company-device/create",
            name: "Tạo mới",
          },
        ];
        break;
      case "/admin/device":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/device",
            name: "Quản lý trang thiết bị",
          },
        ];
        break;
      case "/admin/device/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/device",
            name: "Quản lý trang thiết bị",
          },
          {
            url: "/admin/device/create",
            name: "Tạo mới",
          },
        ];
        break;
      case "/admin/hospital":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/hospital",
            name: "Quản lý cơ sở y tế",
          },
        ];
        break;
      case "/admin/organization":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/organization",
            name: "Cấp cơ quan quản lý",
          },
        ];
        break;
      case "/admin/hospital/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/hospital",
            name: "Quản lý cơ sở y tế",
          },
          {
            url: "/admin/hospital/create",
            name: "Tạo mới",
          },
        ];
        break;
      case "/admin/guide-company":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/guide-company",
            name: "HDSD - Công ty",
          },
        ];
        break;
      case "/admin/guide-hospital":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/guide-hospital",
            name: "HDSD - Cơ sở y tế",
          },
        ];
        break;
      case "/admin/guide-department":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/admin",
            name: "Home",
          },
          {
            url: "/admin/guide-department",
            name: "HDSD - Sở y tế",
          },
        ];
        break;
      default:
        if (url.indexOf("/admin/device/edit") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              url: "/admin/device",
              name: "Quản lý trang thiết bị",
            },
            {
              name: "Chỉnh sửa thiết bị",
            },
          ];
        } else if (url.indexOf("/admin/device/") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              url: "/admin/device",
              name: "Quản lý trang thiết bị",
            },
            {
              name: "Chi tiết thiết bị",
            },
          ];
        } else if (url.indexOf("/admin/company-device/edit") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              name: "Công ty trang thiết bị",
            },
            {
              url: "/admin/company-device",
              name: "Quản lý thiết bị - Công ty TTB",
            },
            {
              name: "Chỉnh sửa thiết bị",
            },
          ];
        } else if (url.indexOf("/admin/company-device/") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              name: "Công ty trang thiết bị",
            },
            {
              url: "/admin/company-device",
              name: "Quản lý thiết bị - Công ty TTB",
            },
            {
              name: "Chi tiết thiết bị",
            },
          ];
        } else if (url.indexOf("/admin/hospital/edit") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              url: "/admin/hospital",
              name: "Quản lý cơ sở y tế",
            },
            {
              name: "Chỉnh sửa cơ sở y tế",
            },
          ];
        } else if (url.indexOf("/admin/supplier/edit") == 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/admin",
              name: "Home",
            },
            {
              name: "Công ty trang thiết bị",
            },
            {
              url: "/admin/supplier",
              name: "Quản lý công ty TTB",
            },
            {
              name: "Chỉnh sửa Công ty TTB",
            },
          ];
        }
        break;
    }
    return obj;
  };

  console.log(window.location.pathname);
  const breadCrumb = getBreadcrumbs();
  return (
    <ol className="breadcrumb bg-info-400">
      {breadCrumb.map((item, index) => {
        if (index < breadCrumb.length - 1)
          return (
            <li className="breadcrumb-item" key={index}>
              <Link to={item.url || "#"} className="text-white">
                {item.icon && <i className="fal fa-home mr-1"></i>}
                {item.name}
              </Link>
            </li>
          );
        return (
          <li className="breadcrumb-item active text-white" key={index}>
            {item.name}
          </li>
        );
      })}
    </ol>
  );
}
export default index;
