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
    let errors = [];
    errorInfo?.errorFields?.forEach((errorField) => {
      errorField?.errors?.forEach((error) => {
        errors.push(error);
      });
    });
    openNotification("error", errors.join("\n"), "");
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
          initialValues={{
            _id: form.getFieldValue("_id"),
            name: form.getFieldValue("name"),
            status: form.getFieldValue("status"),
            address: form.getFieldValue("address"),
            city: form.getFieldValue("city"),
            country: form.getFieldValue("country"),
            state: form.getFieldValue("state"),
            zipCode: form.getFieldValue("zipCode"),
            censusTrackNumber: form.getFieldValue("censusTrackNumber"),
            loiDate: form.getFieldValue("loiDate"),
            contractDate: form.getFieldValue("contractDate"),
            famOrSr: form.getFieldValue("famOrSr"),
            landSize: form.getFieldValue("landSize"),
            ami: form.getFieldValue("ami"),
            closingYear: form.getFieldValue("closingYear"),
            startYear: form.getFieldValue("startYear"),
            zoning: form.getFieldValue("zoning"),
            qctDda: form.getFieldValue("qctDda"),
            sitePlanApproval: form.getFieldValue("sitePlanApproval"),
            sitePlanningAgency: form.getFieldValue("sitePlanningAgency"),
            percentage: form.getFieldValue("percentage"),
            presentZoning: form.getFieldValue("presentZoning"),
            units: form.getFieldValue("units"),
            landPrice: form.getFieldValue("landPrice"),
            landPricePerUnit: form.getFieldValue("landPricePerUnit"),
            tdc: form.getFieldValue("tdc"),
            tdcPerUnit: form.getFieldValue("tdcPerUnit"),
            gcFees: form.getFieldValue("gcFees"),
            gcFeesPerUnit: form.getFieldValue("gcFeesPerUnit"),
            devFees: form.getFieldValue("devFees"),
            devFeesPerUnit: form.getFieldValue("devFeesPerUnit"),
            defferedFees: form.getFieldValue("defferedFees"),
            defferedFeesPerUnit: form.getFieldValue("defferedFeesPerUnit"),
            totalAlFees: form.getFieldValue("totalAlFees"),
            hardDebt: form.getFieldValue("hardDebt"),
            softDebt: form.getFieldValue("softDebt"),
            lihtcEquity: form.getFieldValue("lihtcEquity"),
            totalSources: form.getFieldValue("totalSources"),
            noi: form.getFieldValue("noi"),
          }}
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
                  <div className="input-label">Census Track#</div>
                  <Form.Item name="censusTrackNumber">
                    <Input type="number" placeholder="Cencus Track#" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Land Size (Acres)</div>
                  <Form.Item name="landSize">
                    <Input type="number" placeholder="Land Size (Acres)" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">Start Year</div>
                  <Form.Item name="startYear">
                    <Input type="text" placeholder="Start Year" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">AMI</div>
                  <Form.Item name="ami">
                    <Input type="number" placeholder="AMI" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">LOI Date</div>
                  <Form.Item name="loiDate">
                    <DatePicker className="w-100" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Contract Date</div>
                  <Form.Item name="contractDate">
                    <DatePicker className="w-100" format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">Closing Year</div>
                  <Form.Item name="closingYear">
                    <Input type="text" placeholder="Closing Year" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Present Zoning</div>
                  <Form.Item name="presentZoning">
                    <Input type="text" placeholder="Present Zoning" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Zoning</div>
                  <Form.Item name="zoning">
                    <Select
                      placeholder="Select Zone"
                      options={ZONING}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">4% or 9%</div>
                  <Form.Item name="percentage">
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
                  <div className="input-label">QCT DDA</div>
                  <Form.Item name="qctDda">
                    <Select
                      placeholder="Select QCT DDA"
                      options={QCT_DDA}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Fam or Sr</div>
                  <Form.Item name="famOrSr">
                    <Select
                      placeholder="Select Fam or Sr"
                      options={DEAL_RESIDENTIALS}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Site Plan Approved</div>
                  <Form.Item name="sitePlanApproval">
                    <Select
                      placeholder="Select Approved Site Plan"
                      options={SITE_PLAN_APPROVED}
                      className="select-input"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Site Planning Agency</div>
                  <Form.Item name="sitePlanningAgency">
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
                  <div className="input-label">Units</div>
                  <Form.Item name="units">
                    <Input type="Number" placeholder="Units" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Land Price</div>
                  <Form.Item name="landPrice">
                    <Input type="Number" placeholder="Land Price" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Land Price / Unit</div>
                  <Form.Item name="landPricePerUnit">
                    <Input type="Number" placeholder="Land Price / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">TDC / Unit</div>
                  <Form.Item name="tdcPerUnit">
                    <Input type="Number" placeholder="TDC / Unit" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">TDC</div>
                  <Form.Item name="tdc">
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
                  <div className="input-label">GC Fees</div>
                  <Form.Item name="gcFees">
                    <Input type="Number" placeholder="GC Fees" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">GC Fees / Unit</div>
                  <Form.Item name="gcFeesPerUnit">
                    <Input type="Number" placeholder="GC Fees / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Dev Fees</div>
                  <Form.Item name="devFees">
                    <Input type="Number" placeholder="Dev Fees" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Dev Fees / Unit</div>
                  <Form.Item name="devFeesPerUnit">
                    <Input type="Number" placeholder="Dev Fees / Unit" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">Deferred %</div>
                  <Form.Item name="defferedFees">
                    <Input type="Number" placeholder="Defered %" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Deferred Fee / Unit</div>
                  <Form.Item name="defferedFeesPerUnit">
                    <Input type="Number" placeholder="Defered Fees / Unit" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Total AL Fees</div>
                  <Form.Item name="totalAlFees">
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
                  <div className="input-label">Hard Debt</div>
                  <Form.Item name="hardDebt">
                    <Input type="Number" placeholder="Hard Debt" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Soft Debt</div>
                  <Form.Item name="softDebt">
                    <Input type="Number" placeholder="Soft Debt" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">LIHTC Equity</div>
                  <Form.Item name="lihtcEquity">
                    <Input type="Number" placeholder="LIHTC Equity" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <div className="input-label">Total Sources</div>
                  <Form.Item name="totalSources">
                    <Input type="Number" placeholder="Total Sources" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="mb-10">
                <Col xs={24} md={6}>
                  <div className="input-label">NOI</div>
                  <Form.Item name="noi">
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
