import React, {useState, useEffect} from "react";
import "./styles.css";
import {db, Fire} from './Fire';
import firebase from "firebase";
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Body from './components/Body'
import adddraft from './components/adddraft'
import ContextAppProvider from './ContextAPI'
import { useBeforeunload } from 'react-beforeunload'
import emailjs from 'emailjs-com'

function App() {
  const [update, setUpdate]=useState(0)
  const [user, setUser]=useState('')
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [emailError, setEmailError]=useState('')
  const [passwordError, setPasswordError]=useState('')
  const [hasAccount, setHasAccount]=useState(true)
  const [loginType, setRoleType]=useState('')
  const [lname, setlName]=useState('')
  const [userinfo, setUserinfo]=useState([])
  const [users, setUsers]=useState([])
  const [cover, setCover]=useState('https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg')
  const [forgotpassword, setForgotpassword]=useState(false)
  //const [msgids, setMsgIds] = useState([''])
  const [loading, setLoading]=useState(false)
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }
  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }
  const handleLogin = () => {
    clearErrors()

    if (!loginType)
    {
      window.alert('Please select your login role!')
      return
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      //db.collection('users').doc(user.uid).update({msgids: loginType})
      firebase.auth().currentUser.msgids = loginType
      console.log("login success.." + firebase.auth().currentUser.msgids)
      setLoading(true)
    })
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
          setEmailError(err.message)
          break
        case "auth/user/disabled":
        case "auth/user-not-found":
          setEmailError('Email does not exist')
        break
        case "auth/wrong-password":
          setPasswordError('Incorrect Password')
        break
        default:
      }  
    })
  } 

  const handleSignup = () => {
    console.log('signup')
    clearErrors()
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result) {
      result.user.updateProfile({
        displayName: name
      })

      db.collection('users').doc(result.user.uid).set({
        created: new Date(), 
        msgids,
        uid: result.user.uid,
        online: true,
        userinfo: {
          name,
          cover,
          age: '', 
          phone: '', 
          city: '',
          country: '',
          website: 'https://',
          job: '',
          email,
        },
        customization: {
          color: '#10325c',
          themecolor: '#0f6ce6',
          darkmode: false,
          widemode: false,
        }
    })
    })
    .catch(err => {
        
        switch(err.code) {
        case "auth/email-already-in-use":
          setEmailError(err.message)
          break
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPasswordError(err.message)
        break
        default: 
        setEmailError('Invalid')
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
          //user.updateProfile({
          //  displayName: name,
          //}) 
          db.collection('users').doc(user.uid).set({
              created: new Date(), 
              msgids,
              uid: firebase.auth().currentUser.uid,
              online: true,
              userinfo: {
                name,
                cover,
                age: '', 
                phone: '', 
                city: '',
                country: '',
                website: 'https://',
                job: '',
                email,
              },
              customization: {
                color: '#10325c',
                themecolor: '#0f6ce6',
                darkmode: false,
                widemode: false,
              }
          })
          db.collection('notifications').doc(user.uid).set({
            notifications: 'email'
          })
          //firebase.auth().currentUser.msgids = loginType
          //console.log("email signup success.." + firebase.auth().currentUser.msgids)
      }//if (user)
      else {
        setUser('')
      } 
    }) 
  }

  const handleLogout = () => {
    if(user) {
      //db.collection('users').doc(user.uid).update({online: false})
    }
    console.log("handle logout.." + loginType)
    firebase.auth().signOut()
    window.location.href = '/'
  }
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {   
      if(user) {
        clearInputs()
        setUser(user)
        //db.collection('users').doc(user.uid).update({online: true})
      }
      else {
          setUser('')
          //db.collection('users').doc(user.uid).update({online: false})
      }
    })
  } 
  
  function loginwithGoogle(){
    if (!loginType)
    {
      window.alert('Please select your login role!')
      return
    }

    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser){
            /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      db.collection('users').doc(user.uid).set({
        created: new Date(), 
        msgids: loginType,
        uid: user.uid,
        online: true, 
        userinfo: {
          name: user.displayName,
          cover: user.photoURL,
          age: '', 
          phone: user.phoneNumber, 
          city:'',
          country: '',
          website: 'https://',
          job: '',
          email: user.email
          
        },
        customization: {
          color: '#10325c',
          themecolor: '#0f6ce6',
          darkmode: false,
          widemode: false,
        }
    })
    db.collection('notifications').doc(user.uid).set({
      notifications: 'Google'
    })
      }
      firebase.auth().currentUser.msgids = loginType
      console.log("google login success.." + firebase.auth().currentUser.msgids)
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      setEmailError(error.message)
      setTimeout(()=>{
        setEmailError('')
      },3000)
    });
  }
  function loginwithFacebook(){
    if (!loginType)
    {
      window.alert('Please select your login role!')
      return
    }
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("email");

    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      if(result.additionalUserInfo.isNewUser){
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var usergoogle = result.user;
        // ...
        db.collection('users').doc(usergoogle.uid).set({
          created: new Date(), 
          msgids: loginType,
          uid: usergoogle.uid,
          online: true, 
          userinfo: {
            name: usergoogle.displayName,
            cover: usergoogle.photoURL,
            age: '', 
            phone: usergoogle.phoneNumber, 
            city:'',
            country: '',
            website: 'https://',
            job: '',
            email: usergoogle.email
          },
          customization: {
            color: '#10325c',
            themecolor: '#0f6ce6',
            darkmode: false,
            widemode: false,
          }
      })
      db.collection('notifications').doc(usergoogle.uid).set({
        notifications: 'Facebook'
      })
    }
    firebase.auth().currentUser.msgids = loginType
    console.log("facebook login success.." + firebase.auth().currentUser.msgids)
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
      setEmailError(email)
      setTimeout(()=>{
        setEmailError('')
      },3000)
      console.log(errorCode)
    });
  }
  useBeforeunload(() => {
    if(user) {
      db.collection('users').doc(user.uid).update({online: false})
    }
  }) 

  useEffect(() => { 
    let cnt = false
    authListener()

    window.addEventListener('onbeforeunload', removeActiveStatus) 
    function removeActiveStatus() {
      if(user) {
        //db.collection('users').doc(user.uid).update({online: false})
        firebase.auth().currentUser.msgids = loginType
        console.log("login success 1.." + firebase.auth().currentUser.msgids)
      }
    }
    if(user) {
      //db.collection('users').doc(user.uid).update({online: true})
      firebase.auth().currentUser.msgids = loginType
      console.log("login success 2.." + firebase.auth().currentUser.msgids)
    }

    return() => cnt = true
  },[])  

   return ( 

    <Router >
    <div className="App">
       {user?
        <ContextAppProvider>
        <>
          <Body setLoading={setLoading} handleLogout={handleLogout} />
          <Redirect exact to='/Home'/>
        </>
        </ContextAppProvider>
        :
        <> 
        <Login loginwithFacebook={()=>loginwithFacebook}loginwithGoogle={()=>loginwithGoogle}  setRoleType={setRoleType} loading={loading} name={name} setName={setName} lname={lname} setlName={setlName}email={email} handleSignup={handleSignup} setEmail={setEmail} password= {password} setPassword={setPassword} handleLogin={handleLogin} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>       
        <Redirect to='/'/>
     </>
        }
    </div>  
     </Router>

  );
}

export default App 