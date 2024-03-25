import React from "react";
import classes from "./PurchaseOrder.module.css"

function PurchaseOrder() {

    return (

        <div className={classes.maincontr}>
            <div className={classes.topt}>
                <h1 className={classes.Headr} >PURCHASE ORDER</h1>
                <div className={classes.companydetails}>
                    <h3>COMPANY NAME</h3>
                    <p className={classes.companyslogan}>[company slogan]</p>
                    <p className={classes.address}>[street address here]</p>
                    <p className={classes.address}>[city, state, zip code]</p>
                    <p className={classes.phonetxt}><span className={classes.phone}>Phone:</span> (111)222 3333</p>
                    <p className={classes.mailtxt}><span className={classes.mail}>Email:</span> email@company.com</p>

                </div>
            </div>

            <div>
                <div className={classes.tablemain}>
                    <tr >
                        <th className={classes.th}>TO</th>
                        <th className={classes.th}>SHIP TO</th>
                        <th className={classes.th}>P.O NUMBER</th>
                    </tr>
                    <tr>
                        <td className={classes.purchasername}>[PURCHASER NAME]</td>
                        <td className={classes.purchasername}>[RECIPIENT NAME]</td>
                        <td className={classes.purchasername}>[P.O number]</td>
                    </tr>
                    <tr>
                        <td>[Company Name]</td>
                        <td>[Company Name]</td>
                        <td className={classes.ponumb}>[The P.O. number must appear on all related correspondence, shipping papers, and invoices]</td>
                    </tr>
                    <tr>
                        <td>[street address here]</td>
                        <td>[street address here]</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>[city, state, zip code]</td>
                        <td>[city, state, zip code]</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><span className={classes.phone}>Phone:</span> (111)222 3333</td>
                        <td><span className={classes.phone}>Phone:</span> (111)222 3333</td>
                        <td></td>
                    </tr>
                    <tr className={classes.lastone}>
                        <td><span className={classes.mail}>Email:</span> email@company.com</td>
                        <td><span className={classes.mail}>Email:</span> email@company.com</td>
                        <td></td>
                    </tr>
                </div>
            </div>
            <div>
                <div className={classes.tabletwo}>
                    <tr>
                        <th className={classes.th}>P.O. Date</th>
                        <th className={classes.th}>Requisitioner</th>
                        <th className={classes.th}>Shipped Via</th>
                        <th className={classes.th}>F.O.B Point</th>
                        <th className={classes.th}>Terms</th>
                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>

                </div>
            </div>
            <div>
                <div className={classes.tablethree}>
                    <tr>
                        <th className={classes.th}>Qty</th>
                        <th className={classes.th}>Unit</th>
                        <th className={classes.th}>Description</th>
                        <th className={classes.th}>Unit Price</th>
                        <th className={classes.th}>Total</th>
                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tr>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td ></td>
                        <td></td>

                    </tr>
                    <tfoot>
                        <tr>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footrspecial}>Sub Total</td>
                            <td className={classes.footr}></td>
                        </tr>
                        <tr>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footrspecial}>Sales Tax</td>
                            <td className={classes.footr}></td>
                        </tr>
                        <tr>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footrspecial}>Shipping & Handling</td>
                            <td className={classes.footr}></td>
                        </tr>
                        <tr>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footrspecial}>Other</td>
                            <td className={classes.footr}></td>
                        </tr>
                        <tr>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footr}></td>
                            <td className={classes.footrspecial}>Total</td>
                            <td className={classes.footr}></td>
                        </tr>
                    </tfoot>

                </div>
            </div>

            <div className={classes.instruction}>
                <div className={classes.ps}>
                    <div >
                        <p>•  Please send two copies of your invoice</p>
                        <p>•  Enter this order in accordance with the prices, terms, delivery method, and specifications listed above</p>
                        <p>•  Please notify us immediately if you are unable to ship as specified.</p>
                        <p>•  Send all correspondence to:</p>
                    </div>
                    <div className={classes.recvr}>
                        <p>[Your name]</p>
                        <p>[Street Address]</p>
                        <p>[City, ST ZIP Code]</p>
                        <p>[Phone Number]</p>
                        <p>[Fax Number]</p>
                    </div>
                </div>
            </div>
            <div className={classes.signaturedate}>
                <div className={classes.auth}>
                    <p>Authorized by [YourName]</p>
                </div>
                <div className={classes.date}>
                    <p>Pick the Date</p>
                </div>
            </div>

        </div>

    );
}

export default PurchaseOrder;