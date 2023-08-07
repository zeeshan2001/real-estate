import React, { memo, useState } from "react";
import { Col, Row, Form } from "antd";
import "./SingleTab.css";
import SingleDetails from "./components/SingleDetails";
import SingleMap from "./components/SingleMap";
import StickyNotes from "./components/StickyNotes";
import CreateNotes from "./components/CreateNotes";
import { useSelector } from "react-redux";
import NoteModal from "./components/NoteModal";

const SingleTab = () => {
  const { fetchedProperty } = useSelector((state) => state.property);
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const [form] = Form.useForm();
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
          {fetchedProperty && <SingleMap property={fetchedProperty} />}
        </Col>
        <Col xs={24} md={8} className="gutter-row full-height">
          <CreateNotes
            form={form}
            setMode={setMode}
            setModalVisible={setModalVisible}
          />
          <StickyNotes
            form={form}
            setMode={setMode}
            setModalVisible={setModalVisible}
          />
        </Col>
      </Row>
      <NoteModal
        property={fetchedProperty}
        form={form}
        mode={mode}
        setMode={setMode}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </div>
  );
};

export default SingleTab;
