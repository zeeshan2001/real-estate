import { Col, Row } from "antd";
import React, { Fragment } from "react";

const MultiMapLegends = () => {
  return (
    <Fragment>
      <Row>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#FFC107" }}
          ></div>
          <span className="properties-legend-text">Following Site</span>
        </Col>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#FF9430" }}
          ></div>
          <span className="properties-legend-text">Offer Out</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#FFC107" }}
          ></div>
          <span className="properties-legend-text">LOI Signed</span>
        </Col>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#DD270F" }}
          ></div>
          <span className="properties-legend-text">Under Contruct</span>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#54A912" }}
          ></div>
          <span className="properties-legend-text">Closed</span>
        </Col>
        <Col span={12}>
          <div
            className="properties-legend-box"
            style={{ background: "#000000" }}
          ></div>
          <span className="properties-legend-text">Dead Deal</span>
        </Col>
      </Row>
    </Fragment>
  );
};

export default MultiMapLegends;
