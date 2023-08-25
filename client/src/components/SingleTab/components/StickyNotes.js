import React, { memo, useEffect } from "react";
import { Row, Col, Collapse, Empty, Button } from "antd";
import iconPlus from "../../../assets/icons/ico-max@2x.png";
import iconMinus from "../../../assets/icons/ico-min@2x.png";
import { useSelector } from "react-redux";
import moment from "moment";

const StickyNotes = ({ form, setMode, setModalVisible }) => {
  const { propertyStickNotes } = useSelector((state) => state.stickynotes);
  const { user } = useSelector((state) => state.auth);
  const panelStyle = {
    marginBottom: 10,
    background: "linear-gradient(180deg, #FFE38D 0%, #FFE38D 100%)",
    borderRadius: "2px",
    border: "none",
  };

  const handleEdit = (record) => {
    const recordClone = { ...record };
    recordClone["date"] = moment(record["date"]);
    form.setFieldsValue(recordClone);
    setMode("edit");
    setModalVisible(true);
  };

  const getItems = (panelStyle) => {
    if (propertyStickNotes.length > 0) {
      return propertyStickNotes?.map((note) => ({
        key: note._id,
        label: (
          <div className="collapse-header">
            <div className="note-header-left">
              <strong>{note.userId.username} </strong>
              created this note for <strong>{note.propertyId.name} </strong>
            </div>
            <div className="note-header-right fs-12 fw-500">
              <span>{moment(note.date).format("D MMM")} </span>
              <span>{note.time}</span>
            </div>
          </div>
        ),
        children: (
          <>
            <p>{note.description}</p>
            {note?.userId?.username === user.username && (
              <div className="note-edit-btn">
                <Button type="primary" onClick={() => handleEdit(note)}>
                  Edit
                </Button>
              </div>
            )}
          </>
        ),
        style: panelStyle,
      }));
    } else {
      return [
        {
          key: "empty",
          label: <Empty description="No sticky note found for this property" />,
          children: null,
          style: panelStyle,
        },
      ];
    }
  };

  return (
    <div className="single-notes-container">
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

export default StickyNotes;
