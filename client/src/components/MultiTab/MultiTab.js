import React from "react";
import { Col, Row } from "antd";
import "./MultiTab.css";
import MultiDetails from "./components/MultiDetails";
import MultiMap from "./components/MultiMap";
import { useSelector } from "react-redux";
import { DEAL_STATUSES } from "../../constants/common";

const MultiTab = () => {
  const { multiTabData } = useSelector((state) => state.property);
  return (
    <div className="multi-tab">
      <Row>
        <Col span={24}>
          <div>
            <span className="multi-heading-label mr-20">Properties: </span>
            {multiTabData?.properties?.map((property, index) => {
              const status = DEAL_STATUSES?.filter(
                (status) => status.label === property.status
              );
              return (
                <div className="multi-heading mr-15" key={index}>
                  <div
                    className="multi-heading-box"
                    style={{ background: status.color }}
                  ></div>
                  <span className="multi-heading-label">{property.name}</span>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={12} className="gutter-row full-height">
          <h3 className="info-heading">Details</h3>
          <MultiDetails data={multiTabData} />
        </Col>
        <Col xs={24} md={12} className="gutter-row full-height">
          <h3 className="info-heading">Map</h3>
          <MultiMap data={multiTabData} />
        </Col>
      </Row>
    </div>
  );
};

export default MultiTab;
