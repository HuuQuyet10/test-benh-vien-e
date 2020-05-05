import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Panel, AdminPage } from "@admin/components/admin";
import { ThongKe, PhanBo } from '@admin/components/statistic';
function index(props) {
  return (
    <AdminPage>
      <ThongKe />
    </AdminPage>
  );
}

export default index;
