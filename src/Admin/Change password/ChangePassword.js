import React from 'react'
import classes from './ChnagePassword.module.css'
import { AdminHeaderNav } from '../AdminHeaderNav'
import { InfoFooter } from '../../InfoFooter'

const CrteCompny = () => {
    return (
        <div className="fixed">
       
       <div className="wrapper">
        {/* <!-- Sidebar  --> */}
        
        
        {/* <!-- Page Content  --> */}
        <div className="content-wrapper">
            <div className="main-content">
   
            <AdminHeaderNav />
                <div className={classes.headed}>
                    <div>
                        <p className={classes.ptag}>Change Password</p>
                        <div className={classes.sndptg}>
                            <p className={classes.adcmptag}>Change Password </p>
                            <div className={classes.thehr}><hr className={classes.goated}></hr> <hr className={classes.goat}></hr></div>
                        </div>
                    </div>
                </div>
                <div className={classes.compform}>
                    <div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Current Password</label>
                            <input className={classes.inputcmpname} placeholder='Enter your current password' type='password' ></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Create New Password</label>
                            <input className={classes.inputcmpname} placeholder='Enter New Password' type='password'></input>
                        </div>
                        <div className={classes.cmpname}>
                            <label className={classes.inptptg}>Confirm New Password</label>
                            <input className={classes.inputcmpname} placeholder='Confirm New Password' type='password' ></input>
                        </div>
                        
                        <button className={classes.addcmpnybtn}>Change Password</button>
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