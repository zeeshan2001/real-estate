import React from "react";

const MultiDetails = (props) => {
  const { data } = props;
  return (
    <div className="details-container">
      <p className="details-heading">Financial Information</p>
      <div className="details-listing">
        <div className="details-listing-label">Total Number of Units</div>
        <div className="details-listing-value">
          {data.totalUnits?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Average Price/Unit</div>
        <div className="details-listing-value">
          $
          {(data.totalLandPrice / data.totalUnits).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">TDC</div>
        <div className="details-listing-value">
          ${data.totalTDC?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">TDC/Unit</div>
        <div className="details-listing-value">
          $
          {(data.totalTDC / data.totalUnits).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <p className="details-heading mt-20">Fees</p>
      <div className="details-listing">
        <div className="details-listing-label">Development Fees</div>
        <div className="details-listing-value">
          ${data.totalDevFees?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Development Fees/Unit</div>
        <div className="details-listing-value">
          $
          {(data.totalDevFees / data.totalUnits).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Deferred Fee/Unit</div>
        <div className="details-listing-value">
          $
          {(data.totalDefferedFees / data.totalUnits).toLocaleString(
            undefined,
            { maximumFractionDigits: 2 }
          )}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">GC Fees</div>
        <div className="details-listing-value">
          ${data.totalGCFees?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">GC Fees / Unit</div>
        <div className="details-listing-value">
          $
          {(data.totalGCFees / data.totalUnits).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <p className="details-heading mt-20">Debt</p>
      <div className="details-listing">
        <div className="details-listing-label">Hard Debt</div>
        <div className="details-listing-value">
          ${data.totalHardDebt?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">Soft Debt</div>
        <div className="details-listing-value">
          ${data.totalSoftDebt?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">LIHTC Equity</div>
        <div className="details-listing-value">
          ${data.totalLIHTCEquity?.toLocaleString()}
        </div>
      </div>
      <div className="details-listing">
        <div className="details-listing-label">NOI</div>
        <div className="details-listing-value">
          ${data.totalNOI?.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default MultiDetails;
