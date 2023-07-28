import React, { useEffect, useState } from "react";
import { Tabs, Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD_TABS } from "../../constants/common";
import "./Dashboard.css";
import printIcon from "../../assets/icons/ico-print@2x.png";
import Portfolio from "../../components/Portfolio/Portfolio";
import MultiTab from "../../components/MultiTab/MultiTab";
import SingleTab from "../../components/SingleTab/SingleTab";
import {
  fetchDashboardData,
  fetchProperty,
  fetchStickyNoteByProperty,
} from "../../redux/actions";
import { fetchMultiTabData } from "../../redux/actions/propertyActions";

const { TabPane } = Tabs;
const Dashboard = () => {
  const { selectedProperties, fetchedProperty, multiTabData } = useSelector(
    (state) => state.property
  );
  const [activeTab, setActiveTab] = useState("1");

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (selectedProperties.length === 1) {
      dispatch(fetchProperty(selectedProperties[0]));
      dispatch(
        fetchStickyNoteByProperty({
          params: { propertyIds: [selectedProperties[0]] },
        })
      );
      setActiveTab("2");
    } else if (selectedProperties.length > 1) {
      dispatch(fetchMultiTabData({ ids: selectedProperties }));
      setActiveTab("3");
    } else {
      dispatch(
        fetchStickyNoteByProperty({
          params: { propertyIds: [] },
        })
      );
      setActiveTab("1");
    }
  }, [selectedProperties]);

  const dispatch = useDispatch();
  useEffect(() => {
    const filters = { startYear: "", yearRange: "", state: "", percentage: "" };
    dispatch(fetchDashboardData({ params: filters }));
  }, []);

  const onChange = (key) => {
    setActiveTab(key);
  };

  const renderTabContent = () => {
    if (activeTab === "1") {
      return <Portfolio />;
    } else if (activeTab === "2") {
      return fetchedProperty ? (
        <SingleTab />
      ) : (
        <Empty description="Select a property from mastersheet to view here" />
      );
    } else if (activeTab === "3") {
      return multiTabData ? (
        <MultiTab />
      ) : (
        <Empty description="Select properties from mastersheet to view data" />
      );
    }
    return null;
  };

  return (
    <div className="body-container">
      <Tabs
        activeKey={activeTab}
        onChange={onChange}
        type="card"
        tabBarExtraContent={{
          right: (
            <div
              className="print-img-wrapper filter-item"
              onClick={handlePrint}
            >
              <img src={printIcon} alt="Print" width="18px" />
            </div>
          ),
        }}
      >
        {DASHBOARD_TABS.map((tab, i) => {
          const id = String(i + 1);
          return (
            <TabPane tab={tab} key={id}>
              {renderTabContent()}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Dashboard;
