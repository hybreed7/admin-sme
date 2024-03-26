import React from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { AdminHeaderNav } from '../AdminHeaderNav';
import { InfoFooter } from '../../InfoFooter';
import classes from './ManageUser.module.css';
import favicon from '../../Images/faviconn.png';

function ManageUserUi({
  show,
  show1,
  roless,
  handleRoleChange1,
  handleShow,
  handleShow1,
  handleClose,
  handleClose1,
  createUser,
  selectedRole,
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
  handleRoleChange,
  selectedRole1,
  startIndexx,
  endIndexx,
  displayedData,
  handlePrevPage,
  isAdmin,
  handleNextPage,
  handleEyeClick,
  handleTrashClick,
  fullName,
  setFullName,
  address,
  setAddress,
  office_address,
  setOfficeAddress,
  phone,
  permittedHeaders,
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
}) {
  return (
    <div style={{ marginTop: '10rem' }}>
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
                {(isAdmin || permittedHeaders.includes('create-user')) && (
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
                      <Button variant="success" onClick={handleShow} >
                        Add New User
                      </Button>
                    </div>
                  </nav>
)}
                  <div className="col-sm-8 header-title p-0">
                    <div className="media">
                      <div className="header-icon text-success mr-3"><i className=""><img src={favicon} className={classes.favshi} alt="favicon" /></i></div>
                      <div className="media-body">
                        <h1 className="font-weight-bold">Manage Users</h1>
                        <small>Create and update your users...</small>
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




                    <Modal show={show} onHide={handleClose} animation={false}>
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
                            <div style={{ marginTop: 10 }} />
                            <Form.Label>Select Role</Form.Label>
                            <Form.Select
        className="form-control"
        as="select"
        value={selectedRole}
        onChange={handleRoleChange}
      >
        <option value="" disabled>Select Role</option>
        {roless.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
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
                    </Modal>

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
                              <p>Fetching users...</p>
                            ) : (
                              <div className="table-responsive">
                                <table className="table display table-bordered table-striped table-hover bg-white m-0 card-table">

                                  <thead style={{ whiteSpace: 'nowrap' }}>
                                    <tr>
                                      <th>ID</th>
                                      <th>Name</th>
                                      <th>Email</th>
                                      <th>Phone Number</th>
                                      <th>Role</th>
                                      <th>Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody style={{ whiteSpace: 'nowrap' }}>
                                    {displayedData.map((item, index) => (
                                      <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone_no}</td>
                                        <td>
  {item.roles?.map((role, index) => (
    <span key={index}>{role.name}</span>
  ))}
</td>
                                        <td>
                                        {(isAdmin || permittedHeaders.includes('update-user')) && (
                                          <div onClick={() => handleEyeClick(item.id)} className="btn btn-success-soft btn-sm mr-1">
                                            <i className="far fa-eye"></i>
                                          </div>
)}
{(isAdmin || permittedHeaders.includes('delete-user')) && (
                                          <div onClick={() => handleTrashClick(item.id)} className="btn btn-danger-soft btn-sm">
                                            <i className="far fa-trash-alt"></i>
                                          </div>
)}
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

                            <Modal show={show1} onHide={handleClose1} animation={false}>
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
                                    <div style={{ marginTop: 10 }} />
                            <Form.Label>Select Role</Form.Label>
                            <Form.Select
        className="form-control"
        as="select"
        value={selectedRole1}
        onChange={handleRoleChange1}
      >
        <option value="" disabled>Select Role</option>
        {roless.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
                                  </Form.Group>
                                </Form>
                              </Modal.Body>






                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose1}>
                                  Go back
                                </Button>
                                <Button variant="success" onClick={editUser}>
                    {loading ? (
                      <>
                      <Spinner  size='sm' /> 
                      <span style={{ marginLeft: '5px' }}>Updating user, Please wait...</span>
    </>
  ) : (
                "Update User"
                      )}
                    </Button>
                            </Modal.Footer>
                          </Modal>

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

export default ManageUserUi;
