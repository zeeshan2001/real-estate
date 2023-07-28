import { Button, Row, Col, Table } from "antd";
import { useEffect, useState } from "react";
import "./Mastersheet.css";
import clearIcon from "../../assets/icons/ico-clear.svg";
import viewIcon from "../../assets/icons/ico-view.svg";
import editIcon from "../../assets/icons/ico-edit.svg";
import deleteIcon from "../../assets/icons/ico-delete.svg";
import printIcon from "../../assets/icons/ico-print.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties, selectProperties } from "../../redux/actions";
import Loading from "../../ui/Loading/Loading";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import DeleteProperty from "./components/DeleteProperty";
import { openNotification } from "../../utils/ui";

const columns = [
  {
    title: "Date Created",
    dataIndex: "createdAt",
    sorter: true,
    sorter: (a, b) =>
      moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
    render: (text) => <>{text ? moment(text).format("YYYY-MM-DD") : null}</>,
  },
  {
    title: "Last Activity",
    dataIndex: "updatedAt",
    sorter: (a, b) =>
      moment(a.updatedAt).valueOf() - moment(b.updatedAt).valueOf(),
    render: (text) => <>{text ? moment(text).format("YYYY-MM-DD") : null}</>,
  },
  // {
  //   title: "ID",
  //   dataIndex: "key",
  //   sorter: (a, b) => a.key - b.key,
  //   render: (text, record, index) => index + 1,
  // },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: "Address",
    dataIndex: "address",
    sorter: (a, b) => a.address.localeCompare(b.address),
  },
  {
    title: "City",
    dataIndex: "city",
    sorter: (a, b) => a.city.localeCompare(b.city),
  },
  {
    title: "Country",
    dataIndex: "country",
    sorter: (a, b) => a.country.localeCompare(b.country),
  },
  {
    title: "State",
    dataIndex: "state",
    sorter: (a, b) => a.state.localeCompare(b.state),
  },
  {
    title: "Zip Code",
    dataIndex: "zipCode",
    sorter: (a, b) => a.zipCode - b.zipCode,
  },
  {
    title: "Census Track#",
    dataIndex: "censusTrackNumber",
    sorter: (a, b) => a.censusTrackNumber - b.censusTrackNumber,
  },
  {
    title: "Start Year",
    dataIndex: "startYear",
    sorter: (a, b) => a.startYear.localeCompare(b.startYear),
  },
  {
    title: "Contract Date",
    dataIndex: "contractDate",
    sorter: true,
    sorter: (a, b) =>
      moment(a.contractDate).valueOf() - moment(b.contractDate).valueOf(),
    render: (text) => <>{text ? moment(text).format("YYYY-MM-DD") : null}</>,
  },
  {
    title: "LOI Date",
    dataIndex: "loiDate",
    sorter: true,
    sorter: (a, b) => moment(a.loiDate).valueOf() - moment(b.loiDate).valueOf(),
    render: (text) => <>{text ? moment(text).format("YYYY-MM-DD") : null}</>,
  },
  {
    title: "Closing Year",
    dataIndex: "closingYear",
    sorter: (a, b) => a.closingYear.localeCompare(b.closingYear),
  },
  {
    title: "Present Zoning",
    dataIndex: "presentZoning",
    sorter: (a, b) => a.presentZoning.localeCompare(b.presentZoning),
  },
  {
    title: "4% or 9%",
    dataIndex: "percentage",
    sorter: (a, b) => a.percentage.localeCompare(b.percentage),
  },
  {
    title: "QCT DDA",
    dataIndex: "qctDda",
    sorter: (a, b) => a.qctDda.localeCompare(b.qctDda),
  },
  {
    title: "Site Plan Approved",
    dataIndex: "sitePlanApproval",
    sorter: (a, b) => a.sitePlanApproval.localeCompare(b.sitePlanApproval),
  },
  {
    title: "Site Planning Agency",
    dataIndex: "sitePlanningAgency",
    sorter: (a, b) => a.sitePlanningAgency.localeCompare(b.sitePlanningAgency),
  },
  {
    title: "AMI",
    dataIndex: "ami",
    sorter: (a, b) => a.ami - b.ami,
  },
  {
    title: "Land Size (Acres)",
    dataIndex: "landSize",
    sorter: (a, b) => a.landSize - b.landSize,
  },
  {
    title: "Zoning",
    dataIndex: "zoning",
    sorter: (a, b) => a.zoning.localeCompare(b.zoning),
  },
  {
    title: "Fam or SR",
    dataIndex: "famOrSr",
    sorter: (a, b) => a.famOrSr.localeCompare(b.famOrSr),
  },
  {
    title: "Units",
    dataIndex: "units",
    sorter: (a, b) => a.units - b.units,
  },
  {
    title: "Land Price",
    dataIndex: "landPrice",
    sorter: (a, b) => a.landPrice - b.landPrice,
  },
  {
    title: "Land Price/Unit",
    dataIndex: "landPricePerUnit",
    sorter: (a, b) => a.landPricePerUnit - b.landPricePerUnit,
  },
  {
    title: "TDC",
    dataIndex: "tdc",
    sorter: (a, b) => a.tdc - b.tdc,
  },
  {
    title: "TDC/Unit",
    dataIndex: "tdcPerUnit",
    sorter: (a, b) => a.tdcPerUnit - b.tdcPerUnit,
  },
  {
    title: "GC Fees",
    dataIndex: "gcFees",
    sorter: (a, b) => a.gcFees - b.gcFees,
  },
  {
    title: "GC Fees/Unit",
    dataIndex: "gcFeesPerUnit",
    sorter: (a, b) => a.gcFeesPerUnit - b.gcFeesPerUnit,
  },
  {
    title: "Dev Fees",
    dataIndex: "devFees",
    sorter: (a, b) => a.devFees - b.devFees,
  },
  {
    title: "Dev Fees/Unit",
    dataIndex: "devFeesPerUnit",
    sorter: (a, b) => a.devFeesPerUnit - b.devFeesPerUnit,
  },
  {
    title: "Deffered",
    dataIndex: "defferedFees",
    sorter: (a, b) => a.defferedFees - b.defferedFees,
  },
  {
    title: "Deffered Fees/Unit",
    dataIndex: "defferedFeesPerUnit",
    sorter: (a, b) => a.defferedFeesPerUnit - b.defferedFeesPerUnit,
  },
  {
    title: "Total AL Fees",
    dataIndex: "totalAlFees",
    sorter: (a, b) => a.totalAlFees - b.totalAlFees,
  },
  {
    title: "Hard Debt",
    dataIndex: "hardDebt",
    sorter: (a, b) => a.hardDebt - b.hardDebt,
  },
  {
    title: "Soft Debt",
    dataIndex: "softDebt",
    sorter: (a, b) => a.softDebt - b.softDebt,
  },
  {
    title: "LIHTC Equity",
    dataIndex: "lihtcEquity",
    sorter: (a, b) => a.lihtcEquity - b.lihtcEquity,
  },
  {
    title: "TotalSources",
    dataIndex: "totalSources",
    sorter: (a, b) => a.totalSources - b.totalSources,
  },
  {
    title: "NOI",
    dataIndex: "noi",
    sorter: (a, b) => a.noi - b.noi,
  },
];
// const data = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     dateCreated: `03-01-2021`,
//     lastActivity: `03-01-2021`,
//     name: "Woodland Cottage",
//     id: i + 1,
//     status: "Under Contract",
//     address: `London, Park Lane no. ${i}`,
//     city: "Miami",
//     country: "Atlanta",
//     state: "Florida",
//     zipCode: "54000",
//     censusTrackNumber: 1,
//     startYear: "2024",
//     contractDate: "01-08-2023",
//     loiDate: "01-09-2023",
//     closingYear: "2025",
//     presentZoning: "N/A",
//     percentage: "4%",
//     qctDDA: "N/A",
//     sitePlanApproved: "Yes",
//     sitePlanningAgency: "Dubai Holding",
//     ami: "N/A",
//     landSize: 1000,
//     landPricePerUnit: "$50,000",
//     tdc: "1600",
//     tdcPerUnit: "400",
//     gcFees: "$20,000",
//     gcFeesPerUnit: "$5,00",
//     devFees: "$2,000",
//     devFeesPerUnit: "$50",
//     deffered: "1150",
//     defferedFeesPerUnit: "$25",
//     totalAlFees: "$12,50,000",
//     hardDebt: "$30,000",
//     softDebt: "$20,000",
//     lihtcEquity: "N/A",
//     totalSources: "1200",
//     zoning: "N/A",
//     famOrSr: "N/A",
//     units: "1000",
//     landPrice: "5000",
//     noi: "N/A",
//   });
// }
const Mastersheet = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { error, loading, properties } = useSelector((state) => state.property);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      openNotification("warning", "Please select only one row to update", "");
    } else {
      navigate(`/intake-form?mode=edit&id=${selectedRowKeys[0]}`);
    }
  };

  const handleClear = () => {
    setSelectedRowKeys([]);
  };

  const handleView = () => {
    dispatch(selectProperties(selectedRowKeys));
    navigate(`/dashboard`);
  };

  const handlePrint = () => {
    window.print();
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({ id: `${record._id}` }),
  };
  const hasSelected = selectedRowKeys.length > 0;

  useEffect(() => {
    dispatch(fetchProperties());
  }, []);

  const dataSource = properties.map((record) => ({
    ...record,
    key: record._id,
  }));

  return (
    <div className="body-container">
      <Row>
        <Col span={24}>
          <div className="mastersheet-header">
            <div className="mastersheet-heading">Mastersheet</div>
            <div>
              <div className="icon-wrapper">
                <img src={clearIcon} alt="Clear Icon" onClick={handleClear} />
              </div>
              <div className="icon-wrapper" onClick={handleView}>
                <img src={viewIcon} alt="View Icon" />
              </div>
              <div className="icon-wrapper" onClick={handleEdit}>
                <img src={editIcon} alt="Edit Icon" />
              </div>
              {/* <div className="icon-wrapper delete-icon">
                <img src={deleteIcon} alt="Delete Icon" />
              </div> */}
              {user.role === "admin" && (
                <DeleteProperty selectedRowKeys={selectedRowKeys} />
              )}
              <div className="icon-wrapper print-icon" onClick={handlePrint}>
                <img src={printIcon} alt="Print Icon" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Loading loading={loading}>
        <div className="table-container">
          <Table
            rowSelection={rowSelection}
            columns={columns}
            // dataSource={data}
            dataSource={dataSource}
            scroll={{ x: "100%" }}
          />
        </div>
      </Loading>
    </div>
  );
};
export default Mastersheet;
