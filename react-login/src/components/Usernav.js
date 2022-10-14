import React, {useState, useEffect} from 'react'
import firebase from 'firebase'
function Sidebar () {
  const user = firebase.auth().currentUser
  return (
    <>
      <div className="logo ">
            <i class="far fa-comments"></i>
            <p>Messenger</p>
        </div>
        <div className="userinfo bs">
           <div className="search">
               <i class="far fa-search"></i>
               <input type="text" placeholder='Search'/>
           </div>
           <div className="bell">
               <div className="notifi"></div>
               <i class="far fa-bell"></i>
           </div>
           <div className="profilepic">
               <img src="https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg" alt=""/>
                <p>{user.displayName}<i class="far fa-chevron-down"></i></p>
          </div>
        </div>
    </>
  )
}
export default Sidebar