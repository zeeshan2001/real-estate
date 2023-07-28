import React from "react";

const MultiDetails = (props) => {
  const { data } = props;
  return (
    <div className="details-container">
      <p className="details-heading">Financial Information</p>
      <div className="details-listing">
        <div className="details-listing-label">Total Number of Units</div>
        <div className="details-listing-value">{data.totalUnits}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Average Price/Unit</div>
        <div className="details-listing-value">${data.avgPricePerUnit}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">TDC</div>
        <div className="details-listing-value">${data.totalTDC}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">TDC/Unit</div>
        <div className="details-listing-value">${data.avgTDCPerUnit}</div>
      </div>
      <p className="details-heading mt-20">Fees</p>
      <div className="details-listing">
        <div className="details-listing-label">Development Fees</div>
        <div className="details-listing-value">${data.totalDevFees}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Development Fees/Unit</div>
        <div className="details-listing-value">${data.avgDevFeesPerUnit}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Deffered Fee/Unit</div>
        <div className="details-listing-value">
          ${data.avgDefferedFeesPerUnit}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">GC Fees</div>
        <div className="details-listing-value">${data.totalGCFees}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">GC Fees / Unit</div>
        <div className="details-listing-value">${data.avgGCFeesPerUnit}</div>
      </div>

      <p className="details-heading mt-20">Debt</p>
      <div className="details-listing">
        <div className="details-listing-label">Hard Debt</div>
        <div className="details-listing-value">${data.totalHardDebt}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Soft Debt</div>
        <div className="details-listing-value">${data.totalSoftDebt}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">LIHTC Equity</div>
        <div className="details-listing-value">${data.totalLIHTCEquity}</div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">NOI</div>
        <div className="details-listing-value">${data.totalNOI}</div>
      </div>
    </div>
  );
};

export default MultiDetails;
