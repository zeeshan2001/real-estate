import React, { useState } from "react";
import { Row, Col, Popover, Button, Divider } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ChartLegends from "./ChartLegends";
import { DEAL_STATUSES } from "../../../constants/common";
import { useEffect } from "react";

const COLORS = DEAL_STATUSES.map((status) => status.color);

const Properties = (props) => {
  const { portfolio, chartData } = props;
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [propertyStates, setPropertyStates] = useState([]);

  const total = chartData.reduce((accum, curr) => accum + curr.count, 0);

  const dataWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: ((item.count / total) * 100).toFixed(2),
  }));

  const onPieClick = (data, index) => {
    setActiveIndex(index);
    setActiveData(data);
  };

  useEffect(() => {
    setPropertyStates(
      portfolio?.properties?.filter((property) => property._id)
    );
  }, [portfolio?.properties]);

  return (
    <div className="properties-container">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Row>
            <Col span={24}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={700}>
                  <Pie
                    data={dataWithPercentage}
                    cx={170}
                    cy={120}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                    textRendering={12}
                  >
                    {console.log("*data: ", dataWithPercentage)}
                    {dataWithPercentage.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        // fill={COLORS[index % COLORS.length]}
                        fill={
                          DEAL_STATUSES.find(
                            (status) => status.label === entry._id
                          ).color
                        }
                        onClick={() => onPieClick(entry, index)}
                      />
                    ))}
                  </Pie>
                  <text
                    x={175}
                    y={115}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#515151"
                    className="pie-text1"
                  >
                    Total
                  </text>
                  <text
                    x={175}
                    y={135}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#0E5574"
                    className="pie-text2"
                  >
                    {total}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col span={24}>
              <div className="legend-container">
                <ChartLegends />
              </div>
              {activeData && (
                <Popover
                  content={
                    <div>
                      {activeData.properties.map((property, index) => (
                        <div key={index}>
                          <div>
                            <div>
                              <strong>Name:</strong> {property.name}
                            </div>
                            <div>
                              <strong>Address:</strong>
                              {property.address}, {property.city},{" "}
                              {property.state}, {property.country}
                            </div>
                            <Divider className="m-10" />
                          </div>
                        </div>
                      ))}
                    </div>
                  }
                  title={
                    <div className="info-heading">
                      {activeData._id} - {activeData.count}
                    </div>
                  }
                  trigger="click"
                  className="chart-popover-container"
                  visible={activeIndex !== null}
                >
                  <div className="popover-btn-container">
                    <Button type="default" onClick={() => setActiveData(false)}>
                      Close Details
                    </Button>
                  </div>
                </Popover>
              )}
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12}>
          {propertyStates?.map((property) => {
            return (
              <Row key={property._id}>
                <Col xs={24} sm={24} md={24}>
                  <p className="heading">Total {property._id}</p>
                  {property?.percentageCounts?.map((percentage) => {
                    return (
                      <Row
                        gutter={16}
                        key={percentage.state}
                        className="property-list-container"
                      >
                        <Col span={12}>
                          <span className="label">{percentage.state}</span>
                        </Col>
                        <Col span={12}>
                          <span className="value">{percentage.count}</span>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default Properties;
