import { useState, memo, useEffect } from "react";
import momentTimeZone from "moment-timezone";
import { Col, Input, Button, Tooltip } from "antd";
import moment from "moment";
import PlusIcon from "../../../assets/icons/plus-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { addStickyNote } from "../../../redux/actions";
import { openNotification } from "../../../utils/ui";

const { TextArea } = Input;

const CreateNotes = ({ form, setMode, setModalVisible }) => {
  const { loading, error } = useSelector((state) => state.stickynotes);
  const { user } = useSelector((state) => state.auth);
  const { existingProperties } = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const currentDate = moment();
  const showModal = () => {
    setModalVisible(true);
    setMode(null);
  };

  const handleUpload = ({ fileList }) => {};

  const handleDropboxClick = () => {
    window.open("https://www.dropbox.com", "_blank");
  };

  useEffect(() => {
    if (error) {
      openNotification("error", error, "");
    }
  }, [error]);

  return (
    <>
      <div className="sticky-notes-header">
        <div className="sticky-notes-heading">
          <h3 className="notes-info-heading">Sticky Notes</h3>
        </div>
        <div className="notes-button-container">
          <div
            className="notes-icon-wrapper notes-plus-icon"
            onClick={showModal}
          >
            <Tooltip placement="topLeft" title={<span>Create Note</span>}>
              <img src={PlusIcon} alt="Plus Icon" />
            </Tooltip>
          </div>
          <Button
            className="dropbox-button"
            type="primary"
            onClick={handleDropboxClick}
          >
            Dropbox
          </Button>
        </div>
      </div>
    </>
  );
};
export default CreateNotes;
