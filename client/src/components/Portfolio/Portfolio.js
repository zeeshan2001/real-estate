import React, { useEffect } from "react";
import { Col, Row } from "antd";
import "./Portfolio.css";
import Properties from "./components/Properties";
import PropertiesMap from "./components/PropertiesMap";
import Financial from "./components/Financial";
import Notes from "./components/Notes";
import { useSelector } from "react-redux";
import Loading from "../../ui/Loading/Loading";
import FilterPortfolio from "./components/FilterPortfolio";

const Portfolio = () => {
  const { portfolio, propertyChartData, financialChartData, loading } =
    useSelector((state) => state.property);

  return (
    <div className="portfolio">
      <Loading loading={loading}>
        <div className="filter-container">
          <FilterPortfolio />
        </div>
        <Row gutter={16}>
          <Col xs={24} md={12} className="gutter-row full-height">
            <h3 className="info-heading">Properties</h3>
            <Properties portfolio={portfolio} chartData={propertyChartData} />
          </Col>
          <Col xs={24} md={12} className="gutter-row full-height">
            <h3 className="info-heading">Project Location Map</h3>
            <PropertiesMap chartData={propertyChartData} />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={12} className="gutter-row full-height">
            <h3 className="info-heading">Financial</h3>
            <Financial portfolio={portfolio} chartData={financialChartData} />
          </Col>
          <Col xs={24} md={12} className="gutter-row full-height">
            <h3 className="info-heading">Recent Notes</h3>
            <Notes />
          </Col>
        </Row>
      </Loading>
    </div>
  );
};

export default Portfolio;
