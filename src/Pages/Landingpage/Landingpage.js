import React from 'react'
import classes from './Landingpage.module.css';
import heroimg from '../../Images/hero-img.png'
import divider from '../../Images/Divider.png'
import greenicon from '../../Images/cardicon-green.png';
import purpleicon from '../../Images/cardicon-purple.png'
import yellowicon from '../../Images/cardicon-yello.png'
import blueicon from '../../Images/cardicon-blue.png'
import pie from '../../Images/pie.png'
import minicon from '../../Images/min-Icon.png'
import maxicon from '../../Images/max-Icon.png'
import deevider from '../../Images/deevider.png'
import avatar from '../../Images/Avatars.png'
import Navigation from '../Nav/Navigation';
import Footer from '../Footer/Footer';
// import Accordion from 'react-bootstrap/Accordion';
import "../../App.css";
import Accordion from "../AccordionComponent/Accordion";
import { NavLink } from 'react-router-dom';


function Landingpage() {


    return (
        <div className={classes.entdiv}>
            <Navigation />
            <div className={classes.hero}>
                <p className={classes.herop}>Seamless Accounting <br></br><span className={classes.herop2}>software for SMEs</span></p>
                <p className={classes.secherop}>Automate your accounting management system today. Our<br></br> software solutions will help streamline account <br></br>management</p>
              <NavLink to={'/pricing'}>  <button className={classes.herobtn}>Signup</button></NavLink>
                <img src={heroimg} className={classes.heroimg} alt="demo" />

            </div>

            <div className={classes.subhero}>
                <img src={divider} className={classes.divider} alt="divider" />
                <p className={classes.subherop}>Automate Your Accounting System<br></br> And Reap The Rewards</p>
                <p className={classes.subherop1}>Whether you are a small business, a non profit or a more medium size enterprise, we’ll help you find the perfect <br></br>accounting solution. Run multiple companies? We can help with that too by centralizing accounting for all your <br></br>businesses. </p>
                <p className={classes.subherop1}>Our accounting software is designed to make your business life easier. It automates processes like pay-slips and tax <br></br>calculations, so you don’t have to worry about pay-slip errors ever again. Pay your employees the right amount on <br></br>time, every time with an efficient, intuitive accounting solution.</p>
            </div>
            <div className={classes.firstcard}>
                <div className={classes.subheadcard}>
                    <p className={classes.subherop2}>Why smart accounting software makes good<br></br> business sense</p>
                    <p className={classes.subherop4}>Whether you are a small business, a non profit or a more medium size business, we’ll help you find the perfect <br></br>accounting solution. Run multiple companies? We can help with that too by centralizing accounting for all your <br></br>businesses. </p>
                    <div className={classes.subcard}>
                        <div className={classes.upsubcard}>
                            <img src={greenicon} className={classes.greenicon} alt="icon" />

                            <p className={classes.otherp}>Stay on top of compliance</p>
                            <p className={classes.otherp1}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                        <div className={classes.upsubcardp}>
                            <img src={purpleicon} className={classes.purpleicon} alt="icon" />

                            <p className={classes.otherpp}>Stay on top of compliance</p>
                            <p className={classes.otherp1p}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                        <div className={classes.upsubcardy}>
                            <img src={yellowicon} className={classes.yellowicon} alt="icon" />

                            <p className={classes.otherpy}>Stay on top of compliance</p>
                            <p className={classes.otherp1y}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                    </div>
                    <div className={classes.subcard2}>
                        <div className={classes.upsubcardp}>
                            <img src={purpleicon} className={classes.purpleicon} alt="icon" />

                            <p className={classes.otherpp}>Stay on top of compliance</p>
                            <p className={classes.otherp1p}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                        <div className={classes.upsubcardb}>
                            <img src={blueicon} className={classes.blueicon} alt="icon" />

                            <p className={classes.otherpb}>Stay on top of compliance</p>
                            <p className={classes.otherp1b}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                        <div className={classes.upsubcard}>
                            <img src={greenicon} className={classes.greenicon} alt="icon" />

                            <p className={classes.otherp}>Stay on top of compliance</p>
                            <p className={classes.otherp1}>Are you ready to run your business more <br></br>efficiently? There are many reasons to invest in a <br></br>dedicated accounting system.</p>

                        </div>
                    </div>

                </div>

            </div>
            <div className={classes.discContainer}>
                <div className={classes.pcontainer}>
                    <p>Discover the benefits of our <br></br>accounting solutions</p>
                </div>
                <div className={classes.gptag}>
                    <div className={classes.mptag}>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Efficient</p>
                                <p className={classes.otherptag2}>Our accounting software is designed to make your <br></br>
                                    business life easier by minimising admin time.</p>
                            </div>
                        </div>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Affordable</p>
                                <p className={classes.otherptag2}>We offer competitive pricing on our HR and accounting <br></br>
                                    systems. Request a quote today.</p>
                            </div>
                        </div>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Supportive</p>
                                <p className={classes.otherptag2}>Our friendly team is always on hand to help with <br></br>
                                    any questions or issues you may encounter.</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.mptag}>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Accessible</p>
                                <p className={classes.otherptag2}>Give your employees online access to payslips and <br></br>
                                    expense claims.</p>
                            </div>
                        </div>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Compliant</p>
                                <p className={classes.otherptag2}>A cloud-based system means you stay up to speed <br></br>
                                    on the latest wage, salary and pensions legislation.</p>
                            </div>
                        </div>
                        <div className={classes.ptag}>
                            <div className={classes.otherptag}>
                                <p className={classes.otherptag1}>Automated</p>
                                <p className={classes.otherptag2}>With automated and accurate tax calculations,<br></br>
                                    there's no need for in-house tax expertise.</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.mptag}>
                        <img src={pie} className={classes.pie} alt="img" />
                    </div>
                </div>

            </div>
            <img src={divider} className={classes.Divider} alt="divider" />
            <div className={classes.howitwrks}>
                <p className={classes.hwtwks}>How it works</p>
                <p className={classes.hwtwksaut}>Automate your accounting management system today. Our<br></br> software solutions will help streamline accounting <br></br>management</p>
                <NavLink to={'/pricing'}>    <button className={classes.herobtn}>Signup</button></NavLink>
            </div>
            <div className={classes.secondcard}>
                <div className={classes.subheadcard2}>
                    <div className={classes.cardsinnit}>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>1</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Sign up</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>2</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Pricing</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.cardsinnit}>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>3</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Link Accounts</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>4</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Add Employee's Info</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.cardsinnit}>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>5</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Link Accounts</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                        <div className={classes.innercard}>
                            <div>
                                <p className={classes.pinner}>6</p>
                            </div>
                            <div className={classes.fptag}>
                                <p className={classes.psign}>Pricing</p>
                                <p className={classes.pchoose}>Choose the favorite pricing and sign up</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.faqs}>
                <div className={classes.faqshead}>
                    <p className={classes.faqp}>Frequently asked questions</p>
                    <p className={classes.faqp2}>Everything you need to know about the product and billing.</p>
                </div>
                {/* <div className={classes.faqques}>
                    <div className={classes.faqques1}>
                        <div className={classes.somepshi}>
                            <p className={classes.mofop}>Is there a free trial available?</p>
                            <img src={minicon} className={classes.minicon} alt="minicon" />
                        </div>
                        <p className={classes.mofop1}>Yes, you can try us for free for 30days. If you want, we'll provide you with a free, personalized <br></br>30-minute onboarding call to get you up and running as soon as possible.</p>
                    </div>
                </div>
                <img src={deevider} className={classes.deevider} alt="divider" />
                <div className={classes.faqques2}>
                    <div className={classes.somgodshi}>
                        <p className={classes.mofop}>Can i change my plan later?</p>
                        <img src={maxicon} className={classes.maxicon} alt="maxicon" />
                    </div>
                </div>
                <img src={deevider} className={classes.deevider} alt="divider" />
                <div className={classes.faqques2}>
                    <div className={classes.somgodshi}>
                        <p className={classes.mofop}>What is your cancellation policy?</p>
                        <img src={maxicon} className={classes.maxicon} alt="maxicon" />
                    </div>
                </div>
                <img src={deevider} className={classes.deevider} alt="divider" />
                <div className={classes.faqques2}>
                    <div className={classes.somgodshi}>
                        <p className={classes.mofop}>Can other info be added to an invoice?</p>
                        <img src={maxicon} className={classes.maxicon} alt="maxicon" />
                    </div>
                </div>
                <img src={deevider} className={classes.deevider} alt="divider" />
                <div className={classes.faqques2}>
                    <div className={classes.somgodshi}>
                        <p className={classes.mofop}>How does billing work?</p>
                        <img src={maxicon} className={classes.maxicon} alt="maxicon" />
                    </div>
                </div>
                <img src={deevider} className={classes.deevider} alt="divider" />
                <div className={classes.faqques2}>
                    <div className={classes.somgodshi}>
                        <p className={classes.mofop}>How do i change my email?</p>
                        <img src={maxicon} className={classes.maxicon} alt="maxicon" />
                    </div>
                </div> */}
                <Accordion />
                
                <div className={classes.faqsend}>
                    <img src={avatar} className={classes.avatar} alt="avatar" />
                    <p className={classes.faqsendp}>Still have questions?</p>
                    <p className={classes.faqsendp1}>Can't find the answer you're looking for? Please contact our friendly team</p>
                    <button className={classes.faqsendbtn}>Get in touch</button>

                </div>
            </div>
            <div className={classes.footertop}>
                <div className={classes.fkmngdiv}>
                 <p className={classes.fkngp}>Discover the benefits of our<br></br> accounting solutions</p>
                 <NavLink to={'/pricing'}>  <button className={classes.sgnupbbtn}>Sign up</button> </NavLink>
                 </div>
            </div>
            <Footer />
        </div>
    )
}

export default Landingpage