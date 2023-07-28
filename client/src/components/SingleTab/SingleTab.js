import React, { memo } from "react";
import { Col, Row } from "antd";
import "./SingleTab.css";
import SingleDetails from "./components/SingleDetails";
import SingleMap from "./components/SingleMap";
import StickyNotes from "./components/StickyNotes";
import CreateNotes from "./components/CreateNotes";
import { useSelector } from "react-redux";

const SingleTab = () => {
  const { fetchedProperty } = useSelector((state) => state.property);
  return (
    <div className="single-tab">
      <Row>
        <Col span={24}>
          <div className="single-heading">
            <div className="single-heading-box"></div>
            <span>{fetchedProperty?.name}</span>
          </div>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} md={8} className="gutter-row full-height">
          {/* <h3 className="info-heading">Details</h3> */}
          <SingleDetails property={fetchedProperty} />
        </Col>
        <Col xs={24} md={8} className="gutter-row full-height">
          <h3 className="info-heading">Map</h3>
          <SingleMap property={fetchedProperty} />
        </Col>
        <Col xs={24} md={8} className="gutter-row full-height">
          <CreateNotes />
          <StickyNotes />
        </Col>
      </Row>
    </div>
  );
};

export default SingleTab;
