import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import EditIcon from "../../../assets/icons/ico-edit.svg";

const SingleDetails = (props) => {
  const { property } = props;
  const navigate = useNavigate();
  const handleEdit = () => {
    if (property?._id) {
      navigate(`/intake-form?mode=edit&id=${property._id}`);
    }
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <div className="details-heading">
          <h3 className="details-heading-text">Details</h3>
        </div>
        <div
          className="notes-icon-wrapper notes-plus-icon"
          onClick={handleEdit}
        >
          <Tooltip placement="topLeft" title={<span>Edit Property</span>}>
            <img src={EditIcon} alt="Edit Icon" />
          </Tooltip>
        </div>
      </div>

      <p className="details-heading">Site Information</p>
      <div className="single-details-listing">
        <div className="details-listing">
          <div className="details-listing-label">Status</div>
          <div className="details-listing-value">{property?.status}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Address</div>
          <div className="details-listing-value">{property?.address}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">City</div>
          <div className="details-listing-value">{property?.city}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Country</div>
          <div className="details-listing-value">{property?.country}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">State</div>
          <div className="details-listing-value">{property?.state}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Zip Code</div>
          <div className="details-listing-value">{property?.zipCode}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Census Tr #</div>
          <div className="details-listing-value">
            {property?.censusTrackNumber}
          </div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Land Size</div>
          <div className="details-listing-value">{property?.landSize}</div>
        </div>
      </div>
      <p className="details-heading mt-20">Financial Information, Fees, Debt</p>
      <div className="single-details-listing">
        <div className="details-listing">
          <div className="details-listing-label"># Unit</div>
          <div className="details-listing-value">{property?.units}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Land Price</div>
          <div className="details-listing-value">${property?.landPrice}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Land Price / Unit</div>
          <div className="details-listing-value">
            ${property?.landPricePerUnit}
          </div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Country</div>
          <div className="details-listing-value">{property?.country}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">State</div>
          <div className="details-listing-value">{property?.state}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">Zip Code</div>
          <div className="details-listing-value">{property?.zipCode}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">TDC</div>
          <div className="details-listing-value">${property?.tdc}</div>
        </div>
        <div className="details-listing">
          <div className="details-listing-label">TDC / Unit</div>
          <div className="details-listing-value">${property?.tdcPerUnit}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(SingleDetails);
