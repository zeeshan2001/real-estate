import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import deleteIcon from "../../../assets/icons/ico-delete.svg";
import { useDispatch } from "react-redux";
import { deleteProperty } from "../../../redux/actions";
import { openNotification } from "../../../utils/ui";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

const DeleteProperty = ({ selectedRowKeys }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showDeleteConfirm = () => {
    confirm({
      title: "Delete",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to delete?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        if (selectedRowKeys.length > 0) {
          dispatch(deleteProperty({ data: { ids: selectedRowKeys } })).then(
            () => {
              openNotification("success", "Record(s) deleted sucessfully!", "");
              navigate("/mastersheet");
            }
          );
        } else {
          openNotification("error", "Please select the rows to delete!", "");
        }
      },
      onCancel() {},
    });
  };
  return (
    <div className="icon-wrapper delete-icon" onClick={showDeleteConfirm}>
      <img src={deleteIcon} alt="Delete Icon" />
    </div>
  );
};

export default DeleteProperty;
