import React from "react";
import { Spin } from "antd";

const Loading = ({ loading, children }) => {
  return (
    <div style={{ position: "relative" }}>
      {children}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)", // adjust opacity level
            zIndex: 1000, // ensure loading screen is above content
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Loading;
