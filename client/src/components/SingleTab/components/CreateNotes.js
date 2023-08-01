import { useState, memo, useEffect } from "react";
import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  message,
  Button,
  Upload,
  Divider,
  DatePicker,
  TimePicker,
  Form,
  Tooltip,
} from "antd";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
import PlusIcon from "../../../assets/icons/plus-icon.png";
import Loading from "../../../ui/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addStickyNote } from "../../../redux/actions";
import { openNotification } from "../../../utils/ui";

const { TextArea } = Input;

const CreateNotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error } = useSelector((state) => state.stickynotes);
  const { user } = useSelector((state) => state.auth);
  const { existingProperties } = useSelector((state) => state.property);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentDate = moment();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleUpload = ({ fileList }) => {};

  const onFinish = (values) => {
    let formData = new FormData();
    // formData.append("file", values.file.file);
    formData.append("date", moment(currentDate).format("YYYY-MM-DD"));
    formData.append("time", moment().format("hh:mm A"));
    formData.append("propertyId", values.propertyId);
    formData.append("userId", user._id);
    formData.append("contact", values.contact);
    formData.append("description", values.description);

    dispatch(addStickyNote(formData)).then(() => {
      setIsModalOpen(false);
      form.resetFields();
    });
  };
  const onFinishFailed = (values) => {
    console.log("*values: ", values);
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
        <div className="notes-icon-wrapper notes-plus-icon" onClick={showModal}>
          <Tooltip placement="topLeft" title={<span>Create Note</span>}>
            <img src={PlusIcon} alt="Plus Icon" />
          </Tooltip>
        </div>
      </div>
      <Modal
        title="New Note"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="create-notes-modal"
        footer={false}
      >
        <Loading loading={loading}>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
            // initialValues={editedProperty}
          >
            <Row>
              <Col className="mt-20" span={24}>
                <div className="input-label">Date</div>
                <Form.Item name="date">
                  <DatePicker
                    disabled
                    defaultValue={currentDate}
                    className="w-100"
                    format="YYYY-MM-DD"
                  />
                </Form.Item>
              </Col>
              <Col className="mt-15" span={24}>
                <div className="input-label">Property</div>
                <Form.Item
                  name="propertyId"
                  rules={[
                    {
                      required: true,
                      message: "Property is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Property"
                    options={existingProperties?.map((property) => ({
                      label: property.name,
                      value: property._id,
                    }))}
                    className="select-input"
                  />
                </Form.Item>
              </Col>
              <Col className="mt-15" span={24}>
                <div className="input-label">Contact</div>
                <Form.Item
                  name="contact"
                  rules={[
                    {
                      required: true,
                      message: "Contact is required",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Contact" />
                </Form.Item>
              </Col>
              <Col className="mt-15" span={24}>
                <div className="input-label">Notes:</div>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Notes is required",
                    },
                  ]}
                >
                  <TextArea placeholder="Enter notes" rows={4} />
                </Form.Item>
              </Col>
              {/* <Col className="mt-15" span={24}>
                <Form.Item
                  name="file"
                  rules={[
                    {
                      required: true,
                      message: "file is required",
                    },
                  ]}
                >
                  <Upload
                    multiple={false}
                    onChange={handleUpload}
                    beforeUpload={() => false}
                  >
                    <Button
                      className="btn btn-default"
                      icon={<UploadOutlined />}
                    >
                      Attach File
                    </Button>
                  </Upload>
                </Form.Item> 
              </Col>*/}
            </Row>
            <Row>
              <Col span={24}>
                <div className="notes-buttons-container">
                  <div>
                    <button
                      className="notes-close-btn mr-10"
                      onClick={() => form.resetFields()}
                    >
                      Close
                    </button>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Loading>
        <Divider />
      </Modal>
    </>
  );
};
export default memo(CreateNotes);
