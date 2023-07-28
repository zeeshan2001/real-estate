import React, { useState } from "react";
import { Input, Row, Col, Collapse, Empty } from "antd";
import moment from "moment";
import { CaretRightOutlined } from "@ant-design/icons";
import iconPlus from "../../../assets/icons/ico-max@2x.png";
import iconMinus from "../../../assets/icons/ico-min@2x.png";
import { useSelector } from "react-redux";

const { Search } = Input;

const Notes = () => {
  const { propertyStickNotes } = useSelector((state) => state.stickynotes);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = (value) => {
    setSearchTerm(value);
  };

  const panelStyle = {
    marginBottom: 10,
    background: "linear-gradient(180deg, #FFE38D 0%, #FFE38D 100%)",
    borderRadius: "2px",
    border: "none",
  };

  const getItems = (panelStyle) => {
    const filteredNotes = propertyStickNotes?.filter(
      (note) =>
        note.userId.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        moment(note.date)
          .format("D MMM")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        note.time.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredNotes.length > 0) {
      return filteredNotes?.map((note) => ({
        key: note._id,
        label: (
          <div className="collapse-header multi-notes-header">
            <div className="multi-note-header-left">
              <strong>{note.userId.username} </strong>
              created this deal
            </div>
            <div className="multi-note-header-right fs-12 fw-500">
              <span>{moment(note.date).format("D MMM")} </span>
              <span>{note.time}</span>
            </div>
          </div>
        ),
        children: <p>{note.description}</p>,
        style: panelStyle,
      }));
    } else {
      return [
        {
          key: "empty",
          label: <Empty description="No sticky note found!" />,
          children: null,
          style: panelStyle,
        },
      ];
    }
  };

  return (
    <div className="portfolio-notes-container">
      <Row>
        <Col span={24}>
          <Search placeholder="Search" allowClear onSearch={onSearch} />
        </Col>
      </Row>
      <Row>
        <Col span={24} className="mt-10">
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIconPosition="end"
            expandIcon={({ isActive }) =>
              isActive ? (
                <img src={iconMinus} alt="Plus" width="17" />
              ) : (
                <img src={iconPlus} alt="Plus" width="17" />
              )
            }
            style={{
              background:
                "linear-gradient(180deg, #FFE38D 19.92%, #FFEDB8 20.1%, #FFEDB8 100%)",
            }}
            items={getItems(panelStyle)}
            // extra={

            // }
          />
        </Col>
      </Row>
    </div>
  );
};

export default Notes;
