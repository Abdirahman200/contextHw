import React from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctxData) => {
         return (<nav className={classes.nav}>
         <ul>
           {console.log(ctxData)}
           {ctxData.isLoggedIn && (
             <li>
               <a href="/">Users</a>
             </li>
           )}
           {ctxData.isLoggedIn && (
             <li>
               <a href="/">Admin</a>
             </li>
           )}
           {ctxData.isLoggedIn && (
             <li>
               <button onClick={props.onLogout}>Logout</button>
             </li>
           )}
         </ul>
       </nav>)
      }}
    </AuthContext.Consumer>
   )
};

export default Navigation;
