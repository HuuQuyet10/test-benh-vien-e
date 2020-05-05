const prefix = "/api/may-tho/v1/";
module.exports = {
  api: {
    user: {
      login: prefix + "auth/login",
      roles: prefix + "roles",
      search: prefix + "users",
    },
    device: {
      search: prefix + "thiet-bi",
      create: prefix + "thiet-bi",
      report: prefix + "thiet-bi/thong-ke/excel/danh-sach",
      get_all: prefix + "thiet-bi/thong-ke/danh-sach"
    },
    nameDevice: {
      search: prefix + "dm-thiet-bi",
    },
    unit: {
      search: prefix + "dm-don-vi-tinh",
    },
    manufacturer: {
      search: prefix + "dm-hang-san-xuat",
    },
    resource: {
      search: prefix + "dm-nguon-von",
    },
    supplier: {
      search: prefix + "dm-don-vi-cung-cap",
    },
    country: {
      search: prefix + "dm-quoc-gia",
    },
    formType: {
      search: prefix + "dm-loai-thiet-bi",
    },
    status: {
      search: prefix + "dm-trang-thai",
    },
    file: {
      uploadImage: prefix + "thiet-bi/anh",
      uploadFile: prefix + "thiet-bi/tai-lieu",
    },
    hospital: {
      search: prefix + "dm-don-vi",
      report: prefix + "dm-don-vi/excel"
    },
    city: {
      search: prefix + "dm-tinh-thanh-pho",
    },
    commune: {
      search: prefix + "dm-xa-phuong",
    },
    district: {
      search: prefix + "dm-quan-huyen",
    },
    statistical: {
      status: prefix + "thiet-bi/thong-ke/trang-thai"
    },
    model: {
      search: prefix + "dm-model"
    },
    organization: {
      search: prefix + "dm-co-quan-quan-ly"
    },
    company: {
      search: prefix + "dm-cong-ty-ttb"
    }
  },
};
