import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
import Account from './settings/Account'
import Personalization from './settings/Personalization'
import Aboutchatuser from './settings/Aboutchatuser'
import Preferences from './settings/Preferences'
import { CSSTransition } from 'react-transition-group'
import Themes from './settings/Themes'
import {ContextApp} from '../ContextAPI'
import {useHistory} from 'react-router-dom'
import Contextmenu from './Contextmenu'
import Hoverablebutton from './Hoverablebutton'
import Actions from './settings/Actions'
import Support from './settings/Support'

function Usersettings (props) {
  const id =db.collection('users').doc().id
  const [keyword, setKeyword]=useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')
  const history = useHistory()
  const {settings, type, link, linklabel, BrowserHistory}=props
  const [themebool, setThemebool]=useState(false)
  const [emojibool, setEmojibool]=useState(false)
  const [miniview, setMiniview]=useState(false)
  const {darkmode, notifi, setNotifi, notificont, setNotificont}=useContext(ContextApp)
  const user = firebase.auth().currentUser

  const [themecolor, setThemecolor]=useState('')
  const [themeimg, setThemeimg]=useState('')
  const [emojitype, setEmojitype]=useState('')
  const [darkmode1, setDarkmode]=useState(false)
  const [notifibool, setNotifibool]=useState(true)
  const [widemode, setWidemode]=useState(false)
  const [chatcolor, setChatcolor]=useState('')
  const [contextmenu, setContextmenu]=useState(false)
  const [contextstyle, setContextstyle]=useState({
    top: 0,
    left: 0,
  })
  const themes = [
    {img:'https://wallpaperaccess.com/full/1288078.jpg', type: 'background'},
    {img:'https://www.setaswall.com/wp-content/uploads/2019/08/Whatsapp-Wallpaper-072.jpg',type: 'background'},
    {img:'http://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', type: 'background'},
    {img:'https://i.imgur.com/05HfuHW.jpg',type: 'background'},
    {img:'https://i.imgur.com/Frdc6vv.jpg',type: 'background'},
    {img:'https://i.imgur.com/3St6WoQ.jpg',type: 'background'},
    {img: 'https://i.imgur.com/R4TMmVd.jpg', type: 'background'},
    {img: 'https://i.imgur.com/8UIUZae.jpg', type: 'background'},
    {img:'https://i.imgur.com/yfwxwo1.jpg' , type: 'gradient'},
    {img:'https://i.imgur.com/HTQ2T1O.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/z0zjGrS.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/NXUqzHa.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/bT0t5lL.jpg' , type: 'gradient'},
    {img: 'https://i.imgur.com/TE4sKjU.jpg', type: 'gradient'},
    {img: 'https://i.imgur.com/4hzNTTq.png', type: 'default'},  
]
const emojis= [
  '😀', '😃' ,'😄', '😁', '😆' ,'😅' ,
     '🥺', '😢', '😭' ,'😤' ,'😠', '😡' ,
     '🤬' ,'🤯','😳', '🥵', '🥶', 
     '😱', '😨','😰', '😥', '😓' ,'🤗' ,
     '🤔', '🤭', '🤫' ,'🤥' ,'😶', '😐',
     '😑', '😬', '🙄' ,'😯', '😦', '😧',
      '😑', '😬', '🙄' ,'😯', '😦', '😧',
       '😮', '😲' ,'🥱' ,'😴', '🤤',
        '😪' ,'😵', '🤐', "🥴",
        '😬' ,'🙄', '😯' ,'😦' ,
        '😧', '😮' ,'😲', '🥱' ,
        '😴' ,'🤤' ,'😪', '😵',
         '🤐', '🥴', '🤢 ','🤮' ,
         '🤧', '😷', "🤒", "🤕", '🤑', 
         "🤠", '😈', "👿"
] 
  function selectEmoji(el){
    setEmojitype(el)
    setNotifi(true)
  setNotificont({
    emoji: el,
    msg: 'Emoji selected!'
  })
  db.collection('conversations').doc(props.diag.convoinfo.convoid).update({
    customizedconvo : {
     theme: themeimg,
     emoji: el,
    }
   })
  setTimeout(()=>{
    setNotifi(false)
  },3500)
  setEmojibool(false)
  }
function selectTheme(el){
  setThemeimg(el)
  setNotifi(true)
  setNotificont({
    emoji: 'fal fa-check-circle',
    msg: 'Theme selected!'
  })
  
    db.collection('conversations').doc(props.diag.convoinfo.convoid).update({
     customizedconvo : {
      theme: el,
      emoji: emojitype,
     }
    })
  
  setTimeout(()=>{
    setNotifi(false)
  },3500)
  setThemebool(false)
}
  let emojisrow = emojis &&emojis.map(emoji=>{
      return <div  style={{cursor: 'pointer'}} className="emojidiv"  onClick={()=>selectEmoji(emoji)}>
          <span role='img' aria-label='emoji'>{emoji}</span>
      </div>
  })

    let themesrow = themes && themes.map(theme=>{
        if(pattern.test(theme.type.toLowerCase())){
          return <div  className="theme bs flex">
          <div className="img"> <img src={theme.img} alt=''/></div>
           <div className="select flexrow">
           <p>Select this theme:</p>
           <i className='fal fa-check-circle'  onClick={()=>{selectTheme(theme.img)}} style={{color: themecolor}}></i>
           </div>
       </div>
        }
    })

  function updateProfile(){
    const updateObj ={
      darkmode: darkmode1,
      widemode,
      color: chatcolor,
      themecolor
    }
    db.collection('users').doc(user.uid).update({
      customization :  updateObj  
    }).then(()=>{
      setNotifi(true)
      setNotificont({
        emoji: 'fal fa-check-circle',
        msg: 'Profile has been updated!'
      })
    })
    setTimeout(()=>{
      setNotifi(false)
    },3500)
  }

  function contextMenu(e){
    let customcontext = document.querySelector('.contextmenu')
    const bounding = customcontext.getBoundingClientRect();
      e.preventDefault() 
      setContextmenu(true)
      customcontext.style.top= `${e.pageY-customcontext.clientHeight}px`
      customcontext.style.left= `${e.pageX-customcontext.clientWidth}px`

    }
    useEffect(()=>{
      if(type==='chatsettings'){
        db.collection('conversations').doc(props.diag.convoinfo.convoid).onSnapshot(snap=>{
            const convo = snap.data()
            if(user.uid===props.diag.convoinfo.creatorid) {
              setNotifibool(convo.notifications1)
            }else {
              setNotifibool(convo.notifications2)
            }
        })
      }

    },[])
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const user = snap.data()
      setDarkmode(user.customization.darkmode)
      setWidemode(user.customization.widemode)
      setChatcolor(user.customization.color)
      setThemecolor(user.customization.themecolor)
    })
  },[])

    return (
   <>
    <div onContextMenu={(e)=>contextMenu(e)} className={darkmode?"settingsgrid flex darkmode":'settingsgrid flex'}>
        <div className="links  flex">
            <div className="section1 flex">
              <h2>Settings</h2>
            <NavLink onClick={()=>setNotifi(false)} activeStyle={{color: themecolor}} activeClassName='bs' exact to={'/'+link.link0}>{linklabel.link0}</NavLink>
            <NavLink onClick={()=>setNotifi(false)} activeStyle={{color: themecolor}} activeClassName='bs'  to={`/${type}/${link.link1}`}>{linklabel.link1}</NavLink>
            </div>
            <hr/>
            <div className="section2 flex">
            <NavLink onClick={()=>setNotifi(false)} activeStyle={{color: themecolor}} activeClassName='bs'  to={`/${type}/${link.link2}`}>{linklabel.link2}</NavLink>
            <NavLink onClick={()=>setNotifi(false)}activeStyle={{color: themecolor}} activeClassName='bs' to={`/${type}/${link.link3}`}>{linklabel.link3}</NavLink>
              {type==='settings'?'':<hr/>}
             {type==='settings'?'':  <Link  to={'/chat/'+props.diag.convoinfo.convoid} style={{marginTop:'5px'}}>Return to Chat</Link>}
            </div>
        </div>
        <div className="paths bs">
          <Switch>
          <Route exact path={`/${link.link0}`}>
            {type==='settings'?<Account  notifi={notifi} notificont={notificont} setNotifi={setNotifi} setNotificont={setNotificont}/>:<Themes setEmojitype={setEmojitype} emojitype={emojitype} setEmojibool={setEmojibool} themeimg={themeimg} setThemeimg={setThemeimg} themebool={themebool} setThemebool={setThemebool} chatuser={props.chatuser} notifi={notifi} notificont={notificont} setNotifi={setNotifi} setNotificont={setNotificont} convoid={props.diag.convoinfo.convoid} creatorid={props.diag.convoinfo.creatorid} miniview={miniview} setMiniview={setMiniview}/>}
          </Route>
          <Route  path={`/${type}/${link.link1}`}>
             {type==='settings'? <Preferences />:<Actions notifibool={notifibool} setNotifibool={setNotifibool} convoid={props.diag.convoinfo.convoid} creatorid={props.diag.convoinfo.creatorid}/>}
          </Route>
          <Route  path={`/${type}/${link.link2}`}>
            {type==='settings'?<Personalization function1={updateProfile} input1={darkmode1} input3={chatcolor} input4={themecolor} input2={widemode} setInput1={setDarkmode} setInput4={setThemecolor} setThemecolor={setThemecolor} setInput3={setChatcolor} setInput2={setWidemode}/>:''}
          </Route>
          <Route path={`/${type}/${link.link3}`}>
              {type==='settings'?<Support />:<Aboutchatuser chatuser={props.chatuser}/>}
          </Route>

          </Switch>
        
        </div>
       <CSSTransition in={notifi} timeout={300} classNames='displayerror' unmountOnExit>
       <div className="errormsg bs" >
       <span role='img' aria-label='emoji'>{emojitype}</span> <p>{notificont.msg}</p>
        <i className="far fa-times" style={{color: themecolor}} onClick={()=>setNotifi(false)}></i>    
        </div>
       </CSSTransition>
        <CSSTransition in={themebool} timeout={300} classNames={"themesdisplay"} unmountOnExit>
          <>
        <div className="screen" onClick={()=>setThemebool(false)}></div> 
          
        <div className='themes bs flex'>
          
      
          <div className="filterBtn flex">
            <h2 style={{textAlign: 'center'}}>Filter: </h2>
              <div className="flexrow center">
                <Hoverablebutton  state={keyword} setState={setKeyword} type='' text='All'/>
                <Hoverablebutton  state={keyword} setState={setKeyword} type='background' text='Images'/>
                <Hoverablebutton  state={keyword} setState={setKeyword} type='gradient' text='Gradients'/>
                <Hoverablebutton  state={keyword} setState={setKeyword} type='default' text='Default'/>
              </div>
            </div>
        
          <div className="flex">  
         <p className='themestitle'>Themes: </p>
         {themesrow}
          </div>
          </div>
          </>
        </CSSTransition>
        <CSSTransition in={emojibool} timeout={300} classNames={"emojidisplay"} unmountOnExit>
          <>
          <div className="screen" onClick={()=>setEmojibool(false)} onContextMenu={()=>setContextmenu(false)}></div> 
          
        <div className='emojiwindow bs flexrow'>
            <div className="emojistitle">
              <h2>Select Emoji</h2>
              <div className="flexrow flexwrap">
              {emojisrow}
              </div>
            </div>
          </div>
          </>
        </CSSTransition>
        <CSSTransition in={miniview} timeout={300} classNames={'miniviewdisplay'} unmountOnExit>
            <div className="miniviewdisplay bs" >
              <img src={themeimg} alt=""/>
            </div>
        </CSSTransition>
      
          <Contextmenu emojitype={emojitype} setEmojibool={setEmojibool} emojibool={emojibool} themebool={themebool} setThemebool={setThemebool} contextstyle={contextstyle} type={'settings'} contextmenu={contextmenu} setContextmenu={setContextmenu}/>
    </div>
  </>
  )
}
export default Usersettings