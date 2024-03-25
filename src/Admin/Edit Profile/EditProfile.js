import React from 'react'
import classes from './EditProfile.module.css'
import { InfoFooter } from '../../InfoFooter'
import { AdminHeaderNav } from '../AdminHeaderNav'

const CrteCompny = () => {
    return (
        <div className="fixed">
       
       <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        
        
        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
            <div className="main-content">
   
            <AdminHeaderNav />                <div className={classes.headed}>
                    <div>
                        <p className={classes.ptag}>Edit Profile</p>
                        <div className={classes.sndptg}>
                            <p className={classes.adcmptag}>Edit Profile</p>
                            <div className={classes.thehr}><hr className={classes.goated}></hr> <hr className={classes.goat}></hr></div>
                        </div>
                    </div>
                </div>
                <div className={classes.compform}>
                    <div>
                        <div className={classes.firsties}>
                            <div className={classes.cmpnamedup}>

                                <label className={classes.inptptg}>First Name</label>
                                <input className={classes.inputcmpnamedup} placeholder='Enter first name' type='name' ></input>

                            </div>
                            <div className={classes.cmpnamedup}>

                                <label className={classes.inptptg}>Last Name</label>
                                <input className={classes.inputcmpnamedupf} placeholder='Enter last name' type='name' ></input>

                            </div>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Email Address</label>
                            <input className={classes.inputcmpname} placeholder='Enter your email address' type='email'></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Phone Number</label>
                            <input className={classes.inputcmpname} placeholder='Enter phone number' type='number' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Address</label>
                            <input className={classes.inputcmpname} placeholder='Enter your address' type='address' ></input>
                        </div>
                        <button className={classes.addcmpnybtn}>Save Profile</button>
                    </div>

                </div>


            </div>
            <InfoFooter />

        </div>
        </div>
        </div>
    )
}

export default CrteCompny