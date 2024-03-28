import React, { useState, useEffect } from 'react';
// import React from 'react';
import { NavLink } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InfoFooter = () => {
    const currentYear = new Date().getFullYear();

const [bearer, setBearer] = useState('');
const [name, setName] = useState('');
const [currentTime, setCurrentTime] = useState(new Date());
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [mycompanyName, setMyCompanyName] = useState('This Company');
useEffect(() => {
    
    const intervalId = setInterval(() => {
        setCurrentTime(new Date());
    }, 1000);
   
    readData()
  
    return () => clearInterval(intervalId);
}, []); 


const readData = async () => {
    try {
      const value = await AsyncStorage.getItem('userToken');
      const value1 = await AsyncStorage.getItem('userName');
      const value2 = await AsyncStorage.getItem('userEmail');
      const value3 = await AsyncStorage.getItem('userPhone');
      const thiscompanyName = await AsyncStorage.getItem('companyName');
        // console.log(thiscompanyName);
      if (thiscompanyName !== null) {
        setMyCompanyName(thiscompanyName);
      }

      if (value !== null) {
        setBearer(value);
        // setAuthenticated(true);
      }
      if (value1 !== null) {
        setName(value1);
      }
      if (value2 !== null) {
        setEmail(value2);
      }
      if (value3 !== null) {
        setPhone(value3);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };
  
  useEffect(() => {
    readData();
  }, []); 



    return (
        <div>
            <footer className="footer-content">
                <div className="footer-text d-flex align-items-center justify-content-between">
                    <div className="copy">© {currentYear} <NavLink to="https://www.brookessoftware.com/">BPSL</NavLink> </div>
                    {/* <div className="credit">Licensed to: Ogun<NavLink to="#"></NavLink></div> */}
                    <div className="credit"><NavLink to="#">Ogun-SME</NavLink> Admin Portal</div>
                </div>
            </footer>
        </div>
    );
}
