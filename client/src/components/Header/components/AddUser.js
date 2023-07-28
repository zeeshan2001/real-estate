import { useState, memo, useEffect } from "react";
import { Col, Input, Modal, Row, Select, Button, Divider, Form } from "antd";

import Loading from "../../../ui/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../redux/actions";
import { openNotification } from "../../../utils/ui";

const CreateNotes = ({ isModalOpen, setIsModalOpen }) => {
  const { loading, error } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    let formData = new FormData();
    // formData.append("file", values.file.file);
    // formData.append("date", moment(currentDate).format("YYYY-MM-DD"));
    // formData.append("time", moment().format("hh:mm A"));
    // formData.append("propertyId", values.propertyId);
    // formData.append("userId", user._id);
    // formData.append("contact", values.contact);
    // formData.append("description", values.description);

    dispatch(addUser(values)).then(() => {
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
      <Modal
        title="Add User"
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
              <Col className="mt-15" span={24}>
                <div className="input-label">Username</div>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Username" />
                </Form.Item>
              </Col>
              <Col className="mt-15" span={24}>
                <div className="input-label">Password</div>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "password is required",
                    },
                  ]}
                >
                  <Input.Password type="text" placeholder="Password" />
                </Form.Item>
              </Col>
              <Col className="mt-15" span={24}>
                <div className="input-label">Role</div>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Role is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select Role"
                    options={[
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                    ]}
                    className="select-input"
                  />
                </Form.Item>
              </Col>
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
