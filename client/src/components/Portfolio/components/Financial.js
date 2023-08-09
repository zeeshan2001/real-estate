import React, { useState } from "react";
import { Row, Col, Popover, Button, Divider } from "antd";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { convertToMillion } from "../../../utils/services";
import ChartLegends from "./ChartLegends";
import { DEAL_STATUSES } from "../../../constants/common";

const data = [
  { name: "Following Site", value: 400 },
  { name: "Offer Out", value: 100 },
  { name: "LOI Signed", value: 400 },
  { name: "Under Contract", value: 150 },
  { name: "Closed", value: 500 },
  { name: "Dead Deal", value: 120 },
];

const COLORS = DEAL_STATUSES.map((status) => status.color);

const Financial = (props) => {
  const { portfolio, chartData } = props;
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeData, setActiveData] = useState(null);

  const totalUnits = chartData.reduce(
    (accum, curr) => accum + curr.totalUnits,
    0
  );
  const totalDevFees = chartData.reduce(
    (accum, curr) => accum + curr.totalDevFees,
    0
  );
  const totalGcFees = chartData.reduce(
    (accum, curr) => accum + curr.totalGcFees,
    0
  );

  const devFees = convertToMillion(totalDevFees);
  const gcFees = convertToMillion(totalGcFees);

  const unitsWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: ((item.totalUnits / totalUnits) * 100).toFixed(2),
  }));
  const devFeesWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: ((item.totalDevFees / totalDevFees) * 100).toFixed(2),
  }));
  const gcFeesWithPercentage = chartData.map((item) => ({
    ...item,
    percentage: ((item.totalGcFees / totalGcFees) * 100).toFixed(2),
  }));

  const onPieClick = (openedPopup, data, index) => {
    setActiveIndex(openedPopup);
    setActiveData(data);
  };

  return (
    <div className="financial-container">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={8}>
          <p className="heading" style={{ paddingLeft: "30%" }}>
            Units
          </p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={210} height={400}>
              <Pie
                data={unitsWithPercentage}
                cx={95}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="totalUnits"
                textRendering={12}
              >
                {unitsWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    onClick={() => onPieClick("units", entry, index)}
                  />
                ))}
              </Pie>
              <text
                x={95}
                y={90}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#515151"
                className="pie-text1"
              >
                Total
              </text>
              <text
                x={95}
                y={110}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0E5574"
                className="pie-text2"
              >
                {totalUnits}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <p className="heading">Dev Fees</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={210} height={400}>
              <Pie
                data={devFeesWithPercentage}
                cx={95}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="totalDevFees"
                textRendering={12}
              >
                {devFeesWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    onClick={() => onPieClick("devFees", entry, index)}
                  />
                ))}
              </Pie>
              <text
                x={100}
                y={90}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#515151"
                className="pie-text1"
              >
                Total
              </text>
              <text
                x={100}
                y={110}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0E5574"
                className="pie-text2"
              >
                ${devFees}M
              </text>
            </PieChart>
          </ResponsiveContainer>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <p className="heading">GC Fees</p>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={210} height={400}>
              <Pie
                data={gcFeesWithPercentage}
                cx={95}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="totalGcFees"
                textRendering={12}
              >
                {gcFeesWithPercentage.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    onClick={() => onPieClick("gcFees", entry, index)}
                  />
                ))}
              </Pie>
              <text
                x={100}
                y={90}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#515151"
                className="pie-text1"
              >
                Total
              </text>
              <text
                x={100}
                y={110}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#0E5574"
                className="pie-text2"
              >
                ${gcFees}M
              </text>
            </PieChart>
          </ResponsiveContainer>
        </Col>

        <Col span={24}>
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
                        {activeIndex === "units" && (
                          <div>
                            <strong>Units: </strong>
                            {property.units}
                          </div>
                        )}
                        {activeIndex === "devFees" && (
                          <div>
                            <strong>Dev Fees: </strong> ${property.devFees}
                          </div>
                        )}
                        {activeIndex === "gcFees" && (
                          <div>
                            <strong>GC Fees: </strong> ${property.gcFees}
                          </div>
                        )}
                        <Divider className="m-10" />
                      </div>
                    </div>
                  ))}
                </div>
              }
              title={<div className="info-heading">{activeData._id}</div>}
              trigger="click"
              className="chart-popover-container"
              open={activeIndex !== null}
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
    </div>
  );
};

export default Financial;
