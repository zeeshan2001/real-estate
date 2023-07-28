import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, setUser } from "../../redux/actions";
import { Input, Select, Button, Row, Col, Form, notification } from "antd";
import Logo from "../../assets/images/logo.png";
import "./Register.css";
import { openNotification } from "../../utils/ui";
import Loading from "../../ui/Loading/Loading";

const { Option } = Select;

const Register = () => {
  const { error, loading, user } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const dispatch = useDispatch();

  const handleRegister = () => {
    if (!username || !password || !role) {
      openNotification(
        "error",
        "Form Fields Error",
        "Please fill in all the fields"
      );
      return;
    }

    const user = { username, password, role };
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (!error) return;
    openNotification("error", "Error", error);
  }, [error]);

  return (
    <Fragment>
      <Row>
        <Col span={12} className="image-column"></Col>
        <Col span={12}>
          <Loading loading={loading}>
            <div className="form-container">
              <img src={Logo} className="logo" alt="Logo" />
              <Form
                className="form-content"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Form.Item label="Username">
                  <Input
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Password">
                  <Input.Password
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Role">
                  <Select
                    placeholder="Select a role"
                    value={role}
                    onChange={(value) => setRole(value)}
                  >
                    <Option value="admin">Admin</Option>
                    <Option value="user">User</Option>
                  </Select>
                </Form.Item>
                <Form.Item className="register-button">
                  <Button onClick={handleRegister} type="default">
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Loading>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Register;
