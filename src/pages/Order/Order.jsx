import React, { useEffect, useState } from "react";
import {
  fetchGetOrdersByUser,
  putCreateOrder,
} from "../../services/OrderService";
import { NumericFormat } from "react-number-format";
import { format as dateFormat } from "date-fns";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { postView } from "../../services/ReviewService";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../components/FormControl/FormikControl";
import { Space, Table } from "antd";

const Order = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="container mt-3 shadow-sm rounded py-3">
        <div className="text-center"><h4>Công Ty TNHH Sản Xuất Thương Mại Dịch Vụ Dinh Dưỡng Phát An Nhiên</h4></div>
        <div className="row">
          <div className="col-md-6">
            <span>Người chịu trách nhiệm: Phạm Duy Cường</span><br />
            <span>Mã số thuế: 0315714600</span><br />
            <span>Địa chỉ: 45/31B Trần Thái Tông, Phường 15, Quận Tân Bình</span><br />
            <span>Kho hàng: </span><br />
            <span>Hotline: </span><br />
            <span>Email: cuongpham@phatannhien.com.vn</span><br />
            <span>Số điện thoại: 0907001161</span><br />
            <span>Website: phatannhien.com.vn</span><br />
          </div>
          <div className="col-md-6"></div>
          <div className="text-center"><span><b>Phát An Nhiên</b> tự hào là nhà cung cấp đáng tin cậy, đồng hành cùng sự thành công của quý khách!</span><br />
          <span>Bằng sự nhiệt tình và nhiệt huyết, chúng tôi luôn mong muốn đem lại những sản phẩm chất lượng đến quý khách!</span></div>
        </div>
      </div>
    </>
  );
};

export default Order;
