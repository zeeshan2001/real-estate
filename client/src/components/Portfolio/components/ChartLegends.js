import { Col, Row } from "antd";
import React, { Fragment } from "react";
import { DEAL_STATUSES } from "../../../constants/common";

const ChartLegends = () => {
  return (
    <Fragment>
      <Row>
        {DEAL_STATUSES.map((status) => {
          return (
            <Col span={12} key={status.label}>
              <div
                className="properties-legend-box"
                style={{ background: status.color }}
              ></div>
              <span className="properties-legend-text">{status.label}</span>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default ChartLegends;
