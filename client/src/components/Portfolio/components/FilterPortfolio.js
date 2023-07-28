import { DatePicker, Select, Button } from "antd";
import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { STATES, DEAL_PERCENTAGES } from "../../../constants/common";
import { fetchDashboardData } from "../../../redux/actions";
import moment from "moment";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const FilterPortfolio = (props) => {
  const [filters, setFilters] = useState({
    startYear: null,
    yearRange: [],
    state: null,
    percentage: null,
  });
  const dispatch = useDispatch();

  const onChange = (field, value) => {
    setFilters((filter) => ({ ...filter, [field]: value }));
  };

  const handleFilters = () => {
    dispatch(fetchDashboardData({ params: filters }));
  };

  const disabledEndDate = (current) => {
    const { startYear } = filters;
    if (!startYear || !current) {
      return false;
    }
    const startYearValue = startYear.year();
    const currentYearValue = current.year();
    return startYearValue > currentYearValue;
  };

  const onClear = () => {
    setFilters({
      startYear: null,
      yearRange: [],
      state: null,
      percentage: null,
    });
    dispatch(
      fetchDashboardData({
        params: {
          startYear: null,
          yearRange: [],
          state: null,
          percentage: null,
        },
      })
    );
  };

  return (
    <Fragment>
      <div className="filter-item">
        <Select
          placeholder="Select State"
          options={STATES}
          className="select-input filter-select"
          value={filters.state}
          onChange={(value) => onChange("state", value)}
        />
      </div>
      <div className="filter-item">
        <Select
          placeholder="4% or 9$"
          options={DEAL_PERCENTAGES}
          className="select-input filter-select"
          value={filters.percentage}
          onChange={(value) => onChange("percentage", value)}
        />
      </div>
      <div className="filter-item">
        <DatePicker
          className="filter-input"
          picker="year"
          value={filters.startYear ? moment(filters.startYear) : null}
          // onChange={(date, value) => onChange("startYear", value)}
          onChange={(date, dateString) =>
            onChange(
              "startYear",
              dateString ? moment(dateString, "YYYY") : null
            )
          }
        />
      </div>
      <div className="filter-item">
        <RangePicker
          picker="year"
          className="filter-input"
          // value={filters.yearRange}
          onChange={(date, value) => onChange("yearRange", value)}
          value={
            filters.yearRange.length === 2
              ? [
                  moment(filters.yearRange[0], "YYYY"),
                  moment(filters.yearRange[1], "YYYY"),
                ]
              : []
          }
          disabledDate={disabledEndDate}
        />
      </div>
      <div className="filter-item">
        <Button
          type="primary"
          className="btn btn-primary"
          onClick={handleFilters}
        >
          Filter
        </Button>
      </div>
      <div className="filter-item" onClick={onClear}>
        <Button type="default">Clear</Button>
      </div>
    </Fragment>
  );
};

export default FilterPortfolio;
