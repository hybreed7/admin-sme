import React from 'react';
import { Button, Modal, Form, Spinner, Badge } from 'react-bootstrap';
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import classes from './Requisition.module.css';
import favicon from '../../Images/faviconn.png';

function RequisitionUi({
  show,
  show1,
  handleShow,
  handleShow1,
  handleClose,
  handleClose1,
  createUser,
  editUser,
  isLoading,
  loading,
  searchTerm,
  setSearchTerm,
  entriesPerPage,
  setEntriesPerPage,
  currentPage,
  setCurrentPage,
  totalEntries,
  totalPages,
  startIndexx,
  endIndexx,
  displayedData,
  handlePrevPage,
  handleNextPage,
  handleEyeClick,
  handleSelectedRequest,
  handleTrashClick,
  fullName,
  setFullName,
  address,
  setAddress,
  office_address,
  setOfficeAddress,
  phone,
  setPhone,
  email,
  setEmail,
  fullName1,
  setFullName1,
  phone1,
  setPhone1,
  email1,
  setEmail1,
  tableData,
  handleCreateView,
  formatDate
}) {
  return (
    <div style={{ marginTop: '8rem' }}>
      <div className="wrapper">
        {/* <!-- Sidebar  --> */}


        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
          <div className="main-content">

            <AdminHeaderNav />
            <div className='newBody'>
              <div className='newWidth'>

                {/* <!--Content Header (Page header)--> */}
                <div className="content-header row align-items-center m-0">

                  <nav aria-label="breadcrumb" className="col-sm-4 order-sm-last mb-3 mb-sm-0 p-0 ">
                    <div
                      style={{
                        marginTop: 20,
                        marginBottom: 20,
                        justifyContent: "flex-end",
                        display: "flex",
                        marginLeft: "auto",
                      }}
                    >
                      <Button variant="success" onClick={handleCreateView} >
                        Create Requisition
                      </Button>
                    </div>

                  </nav>
                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Manage Requisition</h1>
                        <small>Create and update your requisitions...</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!--/.Content Header (Page header)--> */}
                <div className="body-content">
                  <div className="row">

                    <div className="col-lg-12 col-xl-6">
                      <div className="row">

                        <div className="col-md-6 col-lg-6">

                          {/* <!--Feedback--> */}

                        </div>
                        <div className="col-md-6 col-lg-6">

                          {/* <!--Balance indicator--> */}

                        </div>
                        <div className="col-md-6 col-lg-6">

                          {/* <!--Time on site indicator--> */}

                        </div>
                        <div className="col-md-6 col-lg-6">

                          {/* <!--Top Referrals--> */}

                        </div>
                        <div className="col-md-6 col-lg-6">

                          {/* <!--Sessions by device--> */}

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 col-lg-12 col-xl-3 mb-4">
                      <div className="card">


                      </div>
                    </div>




                    {/* <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add user</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form style={{ marginTop: 20 }}>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Full Name"
                              // autoFocus
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Phone Number"
                              // autoFocus
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Email Address"
                              // autoFocus
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>






                      <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                          Go back
                        </Button>
                        <Button variant="success" onClick={createUser}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Creating user, Please wait...</span>
    </>
  ) : (
                "Create User"
                      )}
                    </Button>
                      </Modal.Footer>
                    </Modal> */}

                    <div className="col-lg-12">
                      <div className="card">
                        {/* <div className="card-header">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="fs-17 font-weight-600 mb-0">Users List</h6>
                            </div>

                          </div>
                        </div> */}
                        <div className="card-body">
                          <div className="table-resposive">
                            <div className="d-flex justify-content-between align-items-center" style={{ padding: '20px 0 0 0', marginBottom: 20 }}>
                              <div className={classes.greenbtn} style={{ display: 'flex', }}>
                                <div>
                                  <button>Copy</button>
                                  <button>Excel</button>
                                  <button>PDF</button>
                                  <button className={classes.diffbtn}>Column visibility</button>
                                </div>
                                <div>
                                  <label className="d-flex justify-content-start align-items-center">
                                    Show
                                    <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="custom-select custom-select-sm form-control form-control-sm" value={entriesPerPage}
                                      onChange={(e) => {
                                        setEntriesPerPage(parseInt(e.target.value));
                                        setCurrentPage(1);
                                      }}>
                                      <option value={10}>10</option>
                                      <option value={25}>25</option>
                                      <option value={50}>50</option>
                                      <option value={100}>100</option>
                                    </select>
                                    entries
                                  </label>
                                </div>
                              </div>
                              <div className="text-right modal-effect ">
                                <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="mr-2">Search:</div>
                                    <input
                                      type="search"
                                      value={searchTerm}
                                      className="form-control form-control-sm"
                                      placeholder=""
                                      aria-controls="DataTables_Table_0"
                                      onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        // setCurrentPage(1);
                                      }}
                                    />
                                  </div>

                                </div>
                              </div>
                            </div>


                            {isLoading ? (
                              <p>Fetching requisitions...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                      <th>S/N</th>
                                      <th>Request ID</th>
                                      <th>Department</th>
                                      <th>Status</th>
                                      <th>Approval Status</th>
                                      <th>Request By</th>
                                      
                                      <th>Created At</th>
                                      {/* <th>Phone Number</th> */}
                                      {/* <th>Address</th> */}
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.order_id}</td>
                                        <td>{item.department?.name}</td>
                                        <td><Badge bg={item.is_released === null ? "warning" : "success"}>{item.is_released  === null ? "Pending" : "Released"}</Badge></td>
                                        <td><Badge bg={item.approval_status === "0" ? "warning" : item.approval_status === "1" ? "success" : item.approval_status === "2" ? "danger" : "null"}>{item.approval_status === "0" ? "Pending" : item.approval_status === "1" ? "Approved" : item.approval_status === "2" ? "Disapproved" : "null"}</Badge></td>
                                        <td>{item.user?.name}</td>
                                        <td>{formatDate(item.date)}</td>
                                        {/* <td>{item.phone_no}</td> */}
                                        {/* <td>{item.address}</td> */}
                                        <td>
                                          <div onClick={() => handleSelectedRequest(item.request_id)} className="btn btn-success-soft btn-sm mr-1">
                                            <i className="far fa-eye"></i>
                                          </div>
                                          <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                            <i className="far fa-trash-alt"></i>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                            <div className={classes.endded}>
                              <p>
                                Showing {startIndexx} to {endIndexx} of {totalEntries} entries
                              </p>
                              <div style={{ display: 'flex' }}>
                                <button
                                  style={{ border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginRight: 10, cursor: "pointer" }}
                                  onClick={handlePrevPage}
                                  disabled={currentPage === 1}
                                >
                                  Previous
                                </button>
                                {[...Array(totalPages)].map((_, page) => {
                                  // Show only 5 pages or less if available
                                  if (page < 5 || page === currentPage - 1 || page === totalPages - 1) {
                                    return (
                                      <button
                                        key={page + 1}
                                        style={{
                                          marginLeft: '0.4rem',
                                          marginRight: '0.4rem',
                                          fontSize: '14px',
                                          fontFamily: 'nunito',
                                          fontWeight: 400,
                                          color: page + 1 === currentPage ? '#ffffff' : '#000',
                                          backgroundColor: page + 1 === currentPage ? '#28a745' : 'gainsboro',
                                          height: '2.5rem',
                                          borderRadius: '89px',
                                          padding: '0.5rem',
                                          border: 'none',
                                          width: '40px',
                                          cursor: "pointer"
                                        }}
                                        onClick={() => setCurrentPage(page + 1)}
                                      >
                                        {page + 1}
                                      </button>
                                    );
                                  }
                                  return null;
                                })}
                                <button
                                  style={{ cursor: "pointer", border: 'none', backgroundColor: 'gainsboro', borderRadius: 3, height: '2.5rem', width: '100px', fontWeight: 500, fontSize: 14, padding: '0.5rem', fontFamily: 'nunito', color: '#000', marginLeft: 10 }}
                                  onClick={handleNextPage}
                                  disabled={currentPage === totalPages}
                                >
                                  Next
                                </button>
                              </div>
                            </div>

                            {/* <Modal show={show1} onHide={handleClose1} animation={false}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form style={{ marginTop: 20 }}>
                                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Full Name"
                                      // autoFocus
                                      value={fullName1}
                                      onChange={(e) => setFullName1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Email Address"
                                      // autoFocus
                                      value={email1}
                                      onChange={(e) => setEmail1(e.target.value)}
                                    />
                                    <div style={{ marginTop: 10 }} />
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Phone Number"
                                      // autoFocus
                                      value={phone1}
                                      onChange={(e) => setPhone1(e.target.value)}
                                    />                                    
                                    
                                  </Form.Group>
                                </Form>
                              </Modal.Body>






                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                <Button variant="success" onClick={editUser} >                             {loading ? <Spinner id="loader" animation="border" variant="warning" /> : 'Save Changes'}
                                </Button>
                            </Modal.Footer>
                          </Modal> */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/.body content--> */}
            </div>
            {/* <!--/.main content--> */}
          </div>
        </div>
        <InfoFooter />
        {/* <!--/.footer content--> */}
        <div className="overlay"></div>
      </div>
      {/* <!--/.wrapper--> */}


    </div>
    </div>
  );
}

export default RequisitionUi;
