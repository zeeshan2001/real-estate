import { useState, memo, useEffect } from "react";
import { Col, Input, Modal, Row, Select, Button, Divider, Form } from "antd";

import Loading from "../../../ui/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../../../redux/actions";
import { openNotification } from "../../../utils/ui";

const ManageUser = ({ mode, form, setMode, modalVisible, setModalVisible }) => {
  const { loading, error } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const handleOk = () => {
    setModalVisible(false);
    setMode(null);
    form.resetFields();
  };
  const handleCancel = () => {
    setModalVisible(false);
    setMode(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (mode === "edit") {
      dispatch(
        updateUser(values, (data) => {
          openNotification("success", "User Updated Successfully!", "");
          setModalVisible(false);
        })
      );
    } else {
      dispatch(
        addUser(values, (data) => {
          openNotification("success", "User Added Successfully!", "");
          setModalVisible(false);
          form.resetFields();
        })
      );
    }
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
        title={mode === "edit" ? "Edit User" : "Add User"}
        open={modalVisible}
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
                  name="_id"
                  hidden
                  initialValue={form.getFieldValue("_id")}
                ></Form.Item>
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
                      {mode === "edit" ? "Update Changes" : "Save Changes"}
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
export default memo(ManageUser);
