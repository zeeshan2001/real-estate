import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Popconfirm, Card, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../redux/actions";
import Loading from "../../ui/Loading/Loading";
import "./Users.css";
import ManageUser from "./components/ManageUser";
import { openNotification } from "../../utils/ui";

const User = () => {
  const { loading, users } = useSelector((state) => state.users);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a.key - b.key,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            {currentUser._id !== record._id && (
              <Button
                type="danger"
                className="user-delete-button"
                style={{ marginLeft: 8 }}
              >
                Delete
              </Button>
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setMode("edit");
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    if (record?._id) {
      dispatch(
        deleteUser({ data: { id: record._id } }, (data) => {
          if (data.success) {
            openNotification("success", "User deleted successfully!");
          }
        })
      );
    }
  };

  const handleAddUser = () => {
    form.resetFields();
    setModalVisible(true);
  };

  return (
    <>
      <Loading loading={loading}>
        <Card
          title="Users"
          extra={
            <div className="user-add-button">
              <Button type="primary" onClick={handleAddUser}>
                Add User
              </Button>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={users?.map((user) => ({ ...user, key: user._id }))}
            pagination={false}
          />
        </Card>
      </Loading>
      <ManageUser
        mode={mode}
        form={form}
        setMode={setMode}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default User;
