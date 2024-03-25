import React from 'react';

const TableToPrint = React.forwardRef(({ customerLedgers, formatDate }, ref) => (
    <div ref={ref}>
      <h3 className="print-only" style={{ textAlign: 'center', marginTop: '50px',  }}>MY PERSONAL LEDGER</h3>
        <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">
            <thead>
                <tr style={{ textAlign: "center" }}>
                    <th>Created At</th>
                    <th>Description</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {customerLedgers.map((item, index) => (
                    <tr key={index}>
                        <td>{formatDate(item.created_at)}</td>
                        <td>{item.description}</td>
                        <td style={{ textAlign: "right" }}>{parseFloat(item.debit).toLocaleString('en-US', {
                            minimumIntegerDigits: 1,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</td>
                        <td style={{ textAlign: "right" }}>{parseFloat(item.credit).toLocaleString('en-US', {
                            minimumIntegerDigits: 1,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</td>
                        <td style={{ textAlign: "right" }}>{parseFloat(item.balance).toLocaleString('en-US', {
                            minimumIntegerDigits: 1,
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
));

export default TableToPrint;
