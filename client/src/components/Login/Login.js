import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions";
import { Input, Button, Row, Col, Form } from "antd";
import Logo from "../../assets/images/logo@2x.png";
import "./Login.css";
import { openNotification } from "../../utils/ui";
import Loading from "../../ui/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { error, loading, isLoggedIn } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    if (!username || !password) {
      openNotification(
        "error",
        "Form Fields Error",
        "Please fill in all the fields"
      );
      return;
    }

    const user = { username, password };
    dispatch(loginUser(user)).then(() => {
      navigate("/dashboard");
    });
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
                <Form.Item className="login-button">
                  <Button onClick={handleLogin} type="default">
                    Login
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

export default Login;
