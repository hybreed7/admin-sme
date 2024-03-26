import React from 'react'
import { AdminHeaderNav } from '../AdminHeaderNav'
import chart1 from '../../smeImgs/chart1.svg';
import chart2 from '../../smeImgs/chart2.svg';
import chart3 from '../../smeImgs/chart3.svg';
import SubIcon1 from '../../smeImgs/SubIcon1.svg';
import SubIcon2 from '../../smeImgs/SubIcon2.svg';
import SubIcon3 from '../../smeImgs/SubIcon3.svg';
import SubIcon4 from '../../smeImgs/SubIcon4.svg';
import classes from '../../Admin/AdminHome/AdminHome.module.css'

export default function AdminHome() {
  return (
    <div style={{ marginTop: '10rem', }}>
        <AdminHeaderNav/>
        <div className={classes.adminbody}>
            <h3 className={classes.label}>Analytics</h3>  
            <div className={classes.homecontents}>
                <div className={classes.gridBoxs}>
                    <img src={chart1} alt='chart'/>
                </div>
                <div className={`${classes.gridBoxs} ${classes.gridSubgrid}`}>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon1} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon2} alt='Icon'className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon3} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>25,057</h1>
                    </div>
                    <div className={classes.subGridDetails}>
                        <div className={classes.iconCont}>
                            <img src={SubIcon4} alt='Icon' className={classes.img}/>
                        </div>
                        <small>Total number of Registrations</small>
                        <h1>25,057</h1>
                    </div>
                </div>
                <div className={classes.gridBoxs}>
                    <img src={chart2} alt='chart'/>
                </div>
                <div className={classes.gridBoxs}>
                    <img src={chart3} alt='chart'/>
                </div>
            </div>
        </div>
      
    </div>
  )
}
