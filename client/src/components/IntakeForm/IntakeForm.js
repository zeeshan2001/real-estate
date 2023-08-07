import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Divider,
  DatePicker,
  Form,
  Button,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import "./IntakeForm.css";
import printIcon from "../../assets/icons/ico-print.svg";
import {
  DEAL_STATUSES,
  STATES,
  ZONING,
  DEAL_PERCENTAGES,
  DEAL_RESIDENTIALS,
  QCT_DDA,
  SITE_PLAN_APPROVED,
} from "../../constants/common";
import {
  addProperty,
  fetchProperty,
  updateProperty,
} from "../../redux/actions";
import Loading from "../../ui/Loading/Loading";
import { openNotification } from "../../utils/ui";
import { useNavigate, useSearchParams } from "react-router-dom";

const DEFAULT_FORM_VALUES = {
  name: "Test Name",
  status: "Following Site",
  address: "123 L1",
  city: "Dublin",
  country: "Bladen",
  state: "Florida",
  zipCode: 54000,
  censusTrackNumber: 1,
  loiDate: moment("11-11-2023"),
  contractDate: moment("10-05-2024"),
  famOrSr: "Family",
  landSize: 1000,
  ami: 150,
  closingYear: "2026",
  startYear: "2024",
  zoning: "Zoning in Place",
  qctDda: "Yes",
  sitePlanApproval: "Yes",
  sitePlanningAgency: "Test Agency",
  percentage: "4%",
  presentZoning: "Test Zoning",
  units: 50,
  landPrice: 500000,
  landPricePerUnit: 10000,
  tdc: 50000,
  tdcPerUnit: 1000,
  gcFees: 100000,
  gcFeesPerUnit: 2000,
  devFees: 200000,
  devFeesPerUnit: 4000,
  defferedFees: 50000,
  defferedFeesPerUnit: 1000,
  totalAlFees: 10000000,
  hardDebt: 25000,
  softDebt: 20000,
  lihtcEquity: 30000,
  totalSources: 5000,
  noi: 2000,
};

const IntakeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, lastAddedProperty, error, properties, fetchedProperty } =
    useSelector((state) => state.property);
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get("id");
  const mode = searchParams.get("mode");

  const onFinish = (values) => {
    if (propertyId && mode && mode === "edit") {
      dispatch(
        updateProperty(propertyId, values, () => {
          openNotification("success", "Property Updated Successfully!", "");
          navigate("/mastersheet");
        })
      );
    } else {
      dispatch(
        addProperty(values, (data) => {
          openNotification("success", "Property Created Successfully!", "");
          navigate("/mastersheet");
          form.resetFields();
        })
      );
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (!error) return;
    openNotification("error", "Error", error);
  }, [error]);

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchProperty(propertyId));
    }
  }, [propertyId]);

  useEffect(() => {
    if (fetchedProperty) {
      const property = { ...fetchedProperty };
      property["loiDate"] = moment(property["loiDate"]);
      property["contractDate"] = moment(property["contractDate"]);
      form.setFieldsValue(property);
    }
  }, [form, fetchedProperty]);

  useEffect(() => {
    if (mode !== "edit") {
      form.resetFields();
    }
  }, [mode]);

  return (
    <div className="body-container">
      <Loading loading={loading}>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
          // initialValues={DEFAULT_FORM_VALUES}
        >
          <Row>
            <Col span={24}>
              <div className="intake-form-header">
                <div className="intake-form-heading">Intake Form</div>
                <div className="icon-wrapper print-icon" onClick={handlePrint}>
                  <img src={printIcon} alt="Print Icon" />
                </div>
              </div>
            </Col>
          </Row>
          <div className="intake-form-container">
            <div className="general-info">
              <Row>
                <Col span={24}>
                  <div className="input-label">
                    <span className="star-error">*</span>Property Name
                  </div>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Name is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Property Name" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row>
              <Col span={24}>
                <div className="info-heading">Site Information</div>
              </Col>
            </Row>
            <div className="info-content">
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Status
                  </div>
                  <Form.Item
                    name="status"
                    rules={[
                      {
                        required: true,
                        message: "Status is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Status"
                      options={DEAL_STATUSES}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Address</div>
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Address is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Address" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>City
                  </div>
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "City is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="City" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>County
                  </div>
                  <Form.Item
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Country is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Country" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>State
                  </div>
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "State is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select State"
                      options={STATES}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Zip Code
                  </div>
                  <Form.Item
                    name="zipCode"
                    rules={[
                      {
                        required: true,
                        message: "Zip Code is required",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Zip Code" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Cencus Track#
                  </div>
                  <Form.Item
                    name="censusTrackNumber"
                    rules={[
                      {
                        required: true,
                        message: "Census Track# is required",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Cencus Track#" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Land Size (Acres)
                  </div>
                  <Form.Item
                    name="landSize"
                    rules={[
                      {
                        required: true,
                        message: "Land Size is required",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="Land Size (Acres)" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Start Year
                  </div>
                  <Form.Item
                    name="startYear"
                    rules={[
                      {
                        required: true,
                        message: "Start Year is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Start Year" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>AMI
                  </div>
                  <Form.Item
                    name="ami"
                    rules={[
                      {
                        required: true,
                        message: "Ami is required",
                      },
                    ]}
                  >
                    <Input type="number" placeholder="AMI" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>LOI Date
                  </div>
                  <Form.Item
                    name="loiDate"
                    rules={[
                      {
                        required: true,
                        message: "LOI Date is required",
                      },
                    ]}
                  >
                    <DatePicker className="w-100" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Contract Date
                  </div>
                  <Form.Item
                    name="contractDate"
                    rules={[
                      {
                        required: true,
                        message: "Contract Date is required",
                      },
                    ]}
                  >
                    <DatePicker className="w-100" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Closing Year
                  </div>
                  <Form.Item
                    name="closingYear"
                    rules={[
                      {
                        required: true,
                        message: "Closing Year is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Closing Year" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Present Zoning
                  </div>
                  <Form.Item
                    name="presentZoning"
                    rules={[
                      {
                        required: true,
                        message: "Present Zoning is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Present Zoning" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Zoning
                  </div>
                  <Form.Item
                    name="zoning"
                    rules={[
                      {
                        required: true,
                        message: "Zoning is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Zone"
                      options={ZONING}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>4% or 9%
                  </div>
                  <Form.Item
                    name="percentage"
                    rules={[
                      {
                        required: true,
                        message: "Percentage is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Percentage"
                      options={DEAL_PERCENTAGES}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>QCT DDA
                  </div>
                  <Form.Item
                    name="qctDda"
                    rules={[
                      {
                        required: true,
                        message: "QCT DDA is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select QCT DDA"
                      options={QCT_DDA}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Fam or Sr
                  </div>
                  <Form.Item
                    name="famOrSr"
                    rules={[
                      {
                        required: true,
                        message: "Fam or Sr is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Fam or Sr"
                      options={DEAL_RESIDENTIALS}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Site Plan Approved
                  </div>
                  <Form.Item
                    name="sitePlanApproval"
                    rules={[
                      {
                        required: true,
                        message: "Site Plan Approval is required",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Approved Site Plan"
                      options={SITE_PLAN_APPROVED}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Site Planning Agency
                  </div>
                  <Form.Item
                    name="sitePlanningAgency"
                    rules={[
                      {
                        required: true,
                        message: "Site Planning Agency is required",
                      },
                    ]}
                  >
                    <Input type="text" placeholder="Site Planning Agency" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Row className="mt-20">
              <Col span={24}>
                <div className="info-heading">Financial Information</div>
              </Col>
            </Row>
            <div className="info-content">
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Units
                  </div>
                  <Form.Item
                    name="units"
                    rules={[
                      {
                        required: true,
                        message: "Units field is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Units" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span> Land Price
                  </div>
                  <Form.Item
                    name="landPrice"
                    rules={[
                      {
                        required: true,
                        message: "Land Price is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Land Price" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Land Price / Unit
                  </div>
                  <Form.Item
                    name="landPricePerUnit"
                    rules={[
                      {
                        required: true,
                        message: "Land Price / Unit is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Land Price / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>TDC / Unit
                  </div>
                  <Form.Item
                    name="tdcPerUnit"
                    rules={[
                      {
                        required: true,
                        message: "TDC / Unit is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="TDC / Unit" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>TDC
                  </div>
                  <Form.Item
                    name="tdc"
                    rules={[
                      {
                        required: true,
                        message: "TDC is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="TDC" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Row className="mt-20">
              <Col span={24}>
                <div className="info-heading">Fees</div>
              </Col>
            </Row>
            <div className="info-content">
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>GC Fees
                  </div>
                  <Form.Item
                    name="gcFees"
                    rules={[
                      {
                        required: true,
                        message: "GC Fees is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="GC Fees" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span> GC Fees / Unit
                  </div>
                  <Form.Item
                    name="gcFeesPerUnit"
                    rules={[
                      {
                        required: true,
                        message: "GC Fees / Unit is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="GC Fees / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Dev Fees
                  </div>
                  <Form.Item
                    name="devFees"
                    rules={[
                      {
                        required: true,
                        message: "Dev Fees is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Dev Fees" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Dev Fees / Unit
                  </div>
                  <Form.Item
                    name="devFeesPerUnit"
                    rules={[
                      {
                        required: true,
                        message: "Dev Fees / Unit is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Dev Fees / Unit" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Deffered %
                  </div>
                  <Form.Item
                    name="defferedFees"
                    rules={[
                      {
                        required: true,
                        message: "Deffered Fees is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Defered %" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Deffered Fee / Unit
                  </div>
                  <Form.Item
                    name="defferedFeesPerUnit"
                    rules={[
                      {
                        required: true,
                        message: "Defered Fees / Unit is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Defered Fees / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Total AL Fees
                  </div>
                  <Form.Item
                    name="totalAlFees"
                    rules={[
                      {
                        required: true,
                        message: "Total AL Fees is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Total AL Fees" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <Row className="mt-20">
              <Col span={24}>
                <div className="info-heading">Debt</div>
              </Col>
            </Row>
            <div className="info-content">
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Hard Debt
                  </div>
                  <Form.Item
                    name="hardDebt"
                    rules={[
                      {
                        required: true,
                        message: "Hard Debt is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Hard Debt" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span> Soft Debt
                  </div>
                  <Form.Item
                    name="softDebt"
                    rules={[
                      {
                        required: true,
                        message: "Soft Debt is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Soft Debt" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>LIHTC Equity
                  </div>
                  <Form.Item
                    name="lihtcEquity"
                    rules={[
                      {
                        required: true,
                        message: "LIHTC Equity is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="LIHTC Equity" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>Total Sources
                  </div>
                  <Form.Item
                    name="totalSources"
                    rules={[
                      {
                        required: true,
                        message: "Total Sources is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="Total Sources" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">
                    <span className="star-error">*</span>NOI
                  </div>
                  <Form.Item
                    name="noi"
                    rules={[
                      {
                        required: true,
                        message: "NOI is required",
                      },
                    ]}
                  >
                    <Input type="Number" placeholder="NOI" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Divider />
            <Row>
              <Col span={24}>
                <div className="intake-buttons-container">
                  <div>
                    <button
                      className="intake-close-btn mr-10"
                      onClick={() => form.resetFields()}
                    >
                      Reset
                    </button>
                    <Button htmlType="submit" type="primary">
                      {mode && mode === "edit" ? "Update" : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </Loading>
    </div>
  );
};

export default IntakeForm;
