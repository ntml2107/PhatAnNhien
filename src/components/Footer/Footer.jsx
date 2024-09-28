import React from "react";
import {useTranslation} from 'react-i18next'


const Footer = () => {
  const {t} = useTranslation();

  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="pt-3">
        <div className="text-center text-md-start">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h4 className="text-uppercase fw-bold ">Phát An Nhiên</h4>
              <h6 className="text-uppercase">All Nutrition Products</h6>
            <br />
              <p>
                {t('Footer_P')}
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            </div>

            

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">{t('Liên hệ')}</h6>
              <p>
                <i className="fa fa-home me-3"></i> 
                45/31B Trần Thái Tông, Phường 15, Quận Tân Bình
              </p>
              <p>
                <i> Mã số thuế:</i> 0315714600
              </p>
              <p>
                <i className="fa fa-envelope me-3"></i>
                cuongpham@phatannhien.com.vn
              </p>
              <p>
                <i className="fa fa-phone me-3"></i> 0907001161
              </p>
              
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <a href="#" style={{ textDecoration: "none", color: "#333" }}>
          <span>Phat An Nhien Nutrition Service Trading Produce Company Limited </span>
        </a>
      </div>
      
    </footer>
    
  );
};

export default Footer;
