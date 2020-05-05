import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import statisticalProvider from "@data-access/statistical-provider";
import Chart from "chart.js";
import { Input, Select, Form } from "antd";
import { Panel } from "@admin/components/admin";
import useInterval from "@hooks/useInterval";
import statusProvider from "@data-access/status-provider";
import cityProvider from "@data-access/city-provider";
import communeProvider from "@data-access/commune-provider";
import districtProvider from "@data-access/district-provider";
import hospitalProvider from "@data-access/hospital-provider";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import "./style.scss";
import snackbar from "@utils/snackbar-utils";
am4core.useTheme(am4themes_animated);
const { Option } = Select;

function index(props) {
  const chartRef = useRef(null);
  const [state, _setState] = useState({
    trangThaiId: "",
    tinhThanhPhoId: "",
    quanHuyenId: "",
    xaPhuongId: "",
    coSoYTeId: "",
    tieuChi: 1,
    data: {},
    listStatus: [],
    bieuDo: 2,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  const loadData = (action, item) => {
    let trangThaiId = action === "trangThaiId" ? item : state.trangThaiId;
    let tinhThanhPhoId =
      action === "tinhThanhPhoId" ? item : state.tinhThanhPhoId;
    let quanHuyenId = action === "quanHuyenId" ? item : state.quanHuyenId;
    let xaPhuongId = action === "xaPhuongId" ? item : state.xaPhuongId;
    let coSoYTeId = action === "coSoYTeId" ? item : state.coSoYTeId;
    let tieuChi = action === "tieuChi" ? item : state.tieuChi;
    let bieuDo = action === "bieuDo" ? item : state.bieuDo;
    if (tieuChi == 1) trangThaiId = "";
    if (tieuChi != 1) bieuDo = 1;
    statisticalProvider
      .status(
        trangThaiId,
        tinhThanhPhoId,
        quanHuyenId,
        xaPhuongId,
        coSoYTeId,
        tieuChi
      )
      .then((s) => {
        if (s && s.code === 0 && s.data && s.data.length) {
          let total = 0;
          let obj = {};
          let arr = [];
          if (tieuChi != 3)
            s.data.forEach((item) => {
              total += item.soLuong;
              if (!obj[item.trangThaiId]) {
                obj[item.trangThaiId] = {
                  id: item.trangThaiId,
                  name: item.trangThai,
                  type: {},
                  dictrict: {},
                  value: 0,
                };
              }
              obj[item.trangThaiId].value += item.soLuong;
              if (item.maLoaiThietBi) {
                if (!obj[item.trangThaiId].type[item.maLoaiThietBi]) {
                  obj[item.trangThaiId].type[item.maLoaiThietBi] = {
                    id: item.maLoaiThietBi,
                    name: item.tenLoaiThietBi,
                    value: 0,
                  };
                }
                obj[item.trangThaiId].type[item.maLoaiThietBi].value +=
                  item.soLuong;
              }
              if (item.maTinhThanhPho) {
                if (!obj[item.trangThaiId].dictrict[item.maTinhThanhPho]) {
                  obj[item.trangThaiId].dictrict[item.maTinhThanhPho] = {
                    id: item.maTinhThanhPho,
                    name: item.tenTinhThanhPho,
                    value: 0,
                  };
                }
                obj[item.trangThaiId].dictrict[item.maTinhThanhPho].value +=
                  item.soLuong;
              }
            });
          else
            s.data.forEach((item) => {
              total += item.soLuong;
              if (!obj[item.maTinhThanhPho]) {
                obj[item.maTinhThanhPho] = {
                  id: item.maTinhThanhPho,
                  name: item.tenTinhThanhPho,
                  type: {},
                  status: {},
                  value: 0,
                };
              }
              obj[item.maTinhThanhPho].value += item.soLuong;
              if (item.maLoaiThietBi) {
                if (!obj[item.maTinhThanhPho].type[item.maLoaiThietBi]) {
                  obj[item.maTinhThanhPho].type[item.maLoaiThietBi] = {
                    id: item.maLoaiThietBi,
                    name: item.tenLoaiThietBi,
                    value: 0,
                  };
                }
                obj[item.maTinhThanhPho].type[item.maLoaiThietBi].value +=
                  item.soLuong;
              }
              if (item.trangThaiId) {
                if (!obj[item.maTinhThanhPho].status[item.trangThaiId]) {
                  obj[item.maTinhThanhPho].status[item.trangThaiId] = {
                    id: item.trangThaiId,
                    name: item.trangThai,
                    value: 0,
                  };
                }
                obj[item.maTinhThanhPho].status[item.trangThaiId].value +=
                  item.soLuong;
              }
            });

          for (let key in obj) {
            arr.push(obj[key]);
          }
          console.log(arr);
          showChart(arr, tieuChi, bieuDo);
        } else if (s && s.data && s.data.length === 0) {
          // snackbar.show("Không có kết quả phù hợp!", "danger");
        } else {
          snackbar.show("Lấy dữ liệu thất bại!", "danger");
        }
      });
  };
  useEffect(() => {
    loadData();
    getStatus();
    getCity();
    getHospital();
    return () => {
      if (chartRef.current) {
        chartRef.current.dispose();
      }
    };
  }, []);

  const setColor = (chart) => {
    chart.colors.list = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#883997",
      "#8bf6ff",
      "#4ebaaa",
      "#6effe8",
      "#63a4ff",
      "#ff5983",
      "#fa5788",
      "#39796b",
      "#ffad42",
      "#7b5e57",
      "#ffff56",
      "#484848",
      "#6ab7ff",
      "#845EC2",
      "#D65DB1",
      "#FF6F91",
      "#FF9671",
      "#FFC75F",
      "#F9F871",
    ].map((item) => am4core.color(item));
  };

  const showChart = (data, tieuChi, bieuDo) => {
    if (tieuChi == 1) {
      if (bieuDo == 2) {
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

        chart.legend = new am4charts.Legend();

        chart.data = data;

        chart.innerRadius = am4core.percent(50);
        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "value";
        series.dataFields.category = "name";
        setColor(series);
        chartRef.current = chart;
      } else {
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        setColor(chart);
        chart.data = data;

        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.tooltip.disabled = true;
        categoryAxis.renderer.minHeight = 110;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "name";
        series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = "vertical";

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 0.8;

        // on hover, make corner radiuses bigger
        var hoverState = series.columns.template.column.states.create("hover");
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add("fill", function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        });

        // Cursor
        chart.cursor = new am4charts.XYCursor();

        chartRef.current = chart;
      }
    } else {
      if (tieuChi == 2) {
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        setColor(chart);

        chart.legend = new am4charts.Legend();
        chart.legend.position = "top";
        chart.legend.paddingBottom = 20;
        chart.legend.labels.template.maxWidth = 95;

        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        xAxis.dataFields.category = "name";
        xAxis.renderer.cellStartLocation = 0.1;
        xAxis.renderer.cellEndLocation = 0.9;
        xAxis.renderer.grid.template.location = 0;

        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.min = 0;

        function createSeries(value, name) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = value;
          series.dataFields.categoryX = "name";
          series.name = name;

          series.events.on("hidden", arrangeColumns);
          series.events.on("shown", arrangeColumns);

          var bullet = series.bullets.push(new am4charts.LabelBullet());
          bullet.interactionsEnabled = false;
          bullet.dy = 30;
          bullet.label.text = "{valueY}";
          bullet.label.fill = am4core.color("#ffffff");

          return series;
        }
        let _series = {};
        chart.data = data.map((item) => {
          let item2 = {};
          item2.name = item.name;
          for (let key in item.type) {
            item2[item.type[key].name] = item.type[key].value;
            _series[item.type[key].name] = "";
          }
          return item2;
        });
        for (let key in _series) {
          createSeries(key, key);
        }

        function arrangeColumns() {
          var series = chart.series.getIndex(0);

          var w =
            1 -
            xAxis.renderer.cellStartLocation -
            (1 - xAxis.renderer.cellEndLocation);
          if (series.dataItems.length > 1) {
            var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            var delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
              var middle = chart.series.length / 2;

              var newIndex = 0;
              chart.series.each(function (series) {
                if (!series.isHidden && !series.isHiding) {
                  series.dummyData = newIndex;
                  newIndex++;
                } else {
                  series.dummyData = chart.series.indexOf(series);
                }
              });
              var visibleCount = newIndex;
              var newMiddle = visibleCount / 2;

              chart.series.each(function (series) {
                var trueIndex = chart.series.indexOf(series);
                var newIndex = series.dummyData;

                var dx = (newIndex - trueIndex + middle - newMiddle) * delta;

                series.animate(
                  { property: "dx", to: dx },
                  series.interpolationDuration,
                  series.interpolationEasing
                );
                series.bulletsContainer.animate(
                  { property: "dx", to: dx },
                  series.interpolationDuration,
                  series.interpolationEasing
                );
              });
            }
          }
        }
        chartRef.current = chart;
      }
      if (tieuChi == 3) {
        var chart = am4core.create("chartdiv", am4charts.XYChart);
        setColor(chart);

        let _series = {};
        chart.data = data.map((item) => {
          let item2 = {};
          item2.name = item.name + "(" + item.value + ")";
          for (let key in item.status) {
            item2[item.status[key].name] = item.status[key].value;
            _series[item.status[key].name] = "";
          }
          return item2;
        });
        // Create axes
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.title.text = "Trạng thái: [bold]{valueY}[/]";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.cellStartLocation = 0.1;
        categoryAxis.renderer.cellEndLocation = 0.9;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.title.text = "Số lượng";

        // Create series
        function createSeries(field, name, stacked) {
          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = field;
          series.dataFields.categoryX = "name";
          series.name = name ;
          series.columns.template.tooltipText = "{name}: [bold]{valueY}[/]";
          series.stacked = stacked;
          series.columns.template.width = am4core.percent(50);
        }
        for (let key in _series) {
          createSeries(key, key, true);
        }

        // Add legend
        chart.legend = new am4charts.Legend();
        chartRef.current = chart;
      }
    }
  };

  const getStatus = () => {
    statusProvider
      .search(1, 9999)
      .then((s) => {
        if (s.code == 0) {
          setState({
            listStatus: s.data,
          });
        }
      })
      .catch((e) => {});
  };
  const getHospital = () => {
    hospitalProvider
      .search(0, 9999)
      .then((s) => {
        if (s.code == 0) {
          setState({
            listHospital: s.data,
          });
        }
      })
      .catch((e) => {});
  };
  const getCity = () => {
    cityProvider
      .search(0, 9999)
      .then((s) => {
        setState({
          listCity: s.data,
        });
      })
      .catch((e) => {});
  };
  const getDistrict = (e) => {
    districtProvider
      .search(0, 9999, e)
      .then((s) => {
        setState({
          listDistrict: s.data,
        });
      })
      .catch((e) => {});
  };
  const getCommune = (e) => {
    communeProvider
      .search(0, 9999, e)
      .then((s) => {
        setState({
          listCommune: s.data,
        });
      })
      .catch((e) => {});
  };
  return (
    <Panel
      id={"effortmonth"}
      sortable={true}
      allowClose={false}
      title="Biểu đồ thống kê"
    >
      <div className="chart-status row">
        <div className="detail-left col-md-4">
          <div className="row">
            <div className="col-md-6">
              <Form.Item className="chart-selcect" label="Tiêu chí">
                <Select
                  value={state.tieuChi}
                  placeholder="Chọn tiêu chí"
                  onChange={(e, i) => {
                    setState({
                      tieuChi: e,
                      trangThaiId: e == 1 ? "" : state.trangThaiId,
                      bieuDo: e != 1 ? 1 : state.bieuDo,
                    });
                    loadData("tieuChi", e);
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={1}>Thiết bị</Option>
                  <Option value={2}>Loại thiết bị</Option>
                  <Option value={3}>Tỉnh / thành phố</Option>
                </Select>
              </Form.Item>
              <Form.Item className="chart-selcect" label="Trạng thái">
                <Select
                  value={state.trangThaiId}
                  placeholder="Chọn trạng thái"
                  onChange={(e, i) => {
                    setState({
                      trangThaiId: e,
                    });
                    loadData("trangThaiId", e);
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="">Tất cả</Option>
                  {state.tieuChi != 1 &&
                  state.listStatus &&
                  state.listStatus.length
                    ? state.listStatus.map((item, index) => {
                        return (
                          item && (
                            <Option key={index} value={item.id}>
                              {item.ten}
                            </Option>
                          )
                        );
                      })
                    : null}
                </Select>
              </Form.Item>
              {state.tieuChi !== 3 ? (
                <Form.Item className="chart-selcect" label="Cơ sở y tế">
                  <Select
                    value={state.coSoYTeId}
                    placeholder="Chọn cơ sở y tế"
                    onChange={(e, i) => {
                      setState({
                        coSoYTeId: e,
                      });
                      loadData("coSoYTeId", e);
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Tất cả</Option>
                    {state.listHospital && state.listHospital.length
                      ? state.listHospital.map((item, index) => {
                          return (
                            item && (
                              <Option key={index} value={item.id}>
                                {item.ten}
                              </Option>
                            )
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
              ) : null}
              <Form.Item className="chart-selcect" label="Loại biểu đồ">
                <Select
                  value={state.bieuDo}
                  placeholder="Chọn loại biểu đồ"
                  onChange={(e, i) => {
                    setState({
                      bieuDo: e,
                    });
                    loadData("bieuDo", e);
                  }}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={1}>Hình Cột</Option>
                  {state.tieuChi == 1 && <Option value={2}>Hình Tròn</Option>}
                </Select>
              </Form.Item>
            </div>
            {state.tieuChi !== 3 ? (
              <div className="col-md-6">
                <Form.Item className="chart-selcect" label="Tỉnh/Thành phố">
                  <Select
                    value={state.tinhThanhPhoId}
                    placeholder="Chọn tỉnh/Thành phố"
                    onChange={(e, i) => {
                      setState({
                        tinhThanhPhoId: e,
                      });
                      getDistrict(e);
                      loadData("tinhThanhPhoId", e);
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Chọn tỉnh/ thành phố</Option>
                    {state.listCity &&
                      state.listCity.length &&
                      state.listCity.map((option, index) => {
                        return (
                          <Option key={index} value={option.id}>
                            {option.ten}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
                <Form.Item className="chart-selcect" label="Quận/huyện">
                  <Select
                    value={state.quanHuyenId}
                    placeholder="Chọn quận/huyện"
                    onChange={(e, i) => {
                      setState({
                        quanHuyenId: e,
                      });
                      loadData("quanHuyenId", e);
                      getCommune(e);
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Chọn quận/huyện</Option>
                    {state.listDistrict && state.listDistrict.length
                      ? state.listDistrict.map((item, index) => {
                          return (
                            item && (
                              <Option key={index} value={item.id}>
                                {item.ten}
                              </Option>
                            )
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item className="chart-selcect" label="Xã/phường">
                  <Select
                    value={state.xaPhuongId}
                    placeholder="Chọn xã/phường"
                    onChange={(e, i) => {
                      setState({
                        xaPhuongId: e,
                      });
                      loadData("xaPhuongId", e);
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="">Chọn xã/phường</Option>
                    {state.listCommune && state.listCommune.length
                      ? state.listCommune.map((item, index) => {
                          return (
                            item && (
                              <Option key={index} value={item.id}>
                                {item.ten}
                              </Option>
                            )
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-md-8 detail-right">
          <h3 className="title">
            <small></small>
          </h3>
          <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
          {/* 
          <canvas ref={chartRef} /> */}
        </div>
      </div>
    </Panel>
  );
}

export default index;
