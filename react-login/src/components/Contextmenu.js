import React, { useContext, useEffect, useRef, useState } from 'react'
import {CSSTransition} from 'react-transition-group'
import { db } from '../Fire'
import firebase from 'firebase'
import { useHistory, useLocation } from 'react-router-dom'
import { ContextApp } from '../ContextAPI'
import Hoverabletexticonflexrow from './Hoverabletexticonflexrow'

function Contextmenu(props){
  const user =firebase.auth().currentUser
  const {themebool, emojibool,type,setUpdatedMsg,copy,convoid,contextmenu, setContextmenu, contextstyle, msgid}=props
  const [events, setEvents]=useState(false)
  const [visible, setVisible]=useState(false)
  const emojis = ['smile','angry','sad-cry','surprise']
  const [msgs, setMsgs]=useState([])
  const contextmenuSelector = useRef()
  const location = useLocation()
  const history = useHistory()
  const {themecolor}=useContext(ContextApp)
  const allemojis = [{
    class: 'surprise yellow',
    msg: 'Surprised'
  },{
    class: 'tired blue',
    msg: 'Tired'
  },
  {
    class: 'smile-wink yellow',
    msg: 'Wink'
  },
  {
    class: 'kiss-beam red',
    msg: 'Love'
  },
  {
    class: 'grin-stars yellow',
    msg: 'Stars'
  },
  {
    class: 'grin-squint-tears yellow',
    msg: 'Laugh'
  },
  {
    class: 'grimace yellow',
    msg: 'Grimace'
  }, 
  {
    class: 'frown red',
    msg: 'Frown'
  },
  {
    class: 'heart red',
    msg: 'Like'
  }
    ] 
 
  function sendReaction(opt){
    let messages = {
    reaction: `fad fa-${opt}`
    }
  msgs && msgs.map(msg=>{
      if(msgid===msg.msgid){
        let itemindex = msgs.indexOf(msg)
        if(msg.senderid===user.uid){
          msgs[itemindex].reaction1=`fad fa-${opt}`
          db.collection('conversations').doc(convoid).update({
              messages: msgs
          })
        }
        else {
          msgs[itemindex].reaction2=`fad fa-${opt}`
          db.collection('conversations').doc(convoid).update({
              messages: msgs
          })
        }
      }
  })
    setContextmenu(false)
  }
  function copyFunc(msgid){
    var r = document.createRange()
    let text = document.querySelector(`#${msgid} .msg`)
    r.selectNode(text)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(r)
    document.execCommand('copy')
    window.getSelection().removeAllRanges()
    setContextmenu(false)
  }

  function deleteFunc(){
    msgs && msgs.map(msg=>{
      if(msgid===msg.msgid&&msg.senderid===user.uid){
        let itemindex = msgs.indexOf(msg)
        msgs.splice(itemindex, 1) 
        db.collection('conversations').doc(convoid).update({
            messages: msgs
        })
      }
  })
    setContextmenu(false)
  }
  function editFunc(){
          let edit = document.querySelector(`#${msgid} p`)
          edit.setAttribute('contentEditable', 'true')

          edit.oninput=(e)=>{
            setUpdatedMsg(e.currentTarget.textContent)
          }

          setContextmenu(false)

    }
  const emojisrow = emojis.map(opt=>{
    return <div onClick={()=>sendReaction(opt)}> <i className={'fad fa-'+(opt==='cry'?'sad-cry':opt)} ></i>  </div>

  })
  const allemojisrow = allemojis.map(emoji=>{
    return <div onClick={()=>sendReaction(emoji.class)}>
        <i className={emoji.class==='heart red'?'fas fa-'+emoji.class:'fad fa-'+emoji.class}></i>
        <p>{emoji.msg}</p>
    </div>
  })
  document.addEventListener('click', function(e){
      const target = e.target
      if(target!==contextmenuSelector.current){
        setContextmenu(false)
      }
  })
  useEffect(()=>{
    if(type==='msg'){
      db.collection('conversations').doc(convoid).onSnapshot(snap=>{
        setMsgs(snap.data().messages)
      })
    }
   
  },[convoid])


  return (
    <>
    {
      type==='msg'?   <div  ref={contextmenuSelector}  onContextMenu={(e)=>e.preventDefault()} className="contextmenu bs" style={{display: contextmenu?'flex':'none', left: contextstyle.left+'px', top: contextstyle.top+'px'}}>
       <div className='emojis'>{emojisrow}</div>
       <div className={'option laugh' } onMouseOver={()=>setVisible(true)} onMouseLeave={()=>setVisible(false)}>
         <i className='fad fa-laugh'></i> <p>Reaction</p>
         <CSSTransition
          in={visible}
          timeout={200}
          classNames="drophover"
          unmountOnExit
          >
        <div className='dropmenu bs'>
        {allemojisrow}
        </div>
        </CSSTransition>
        </div>
    <div className={'option copy'} onClick={()=>copyFunc(msgid)}>
    <i className='fal fa-copy'></i> <p>Copy</p>
   </div>    
   {/* <div className={'option edit'} onClick={()=>editFunc()}>
    <i className='fal fa-edit'></i> <p>Edit</p>
   </div> */}

   <div className={'option delete'} onClick={()=>deleteFunc()}>
    <i className='fal fa-trash'></i> <p>Delete</p>
   </div>
    </div>
    :type==='settings'?
    <div ref={contextmenuSelector}  onContextMenu={(e)=>e.preventDefault()} className="contextmenu bs" style={{display: contextmenu?'flex':'none', left: contextstyle.left+'px', top: contextstyle.top+'px'}}>
        
        {(emojibool ===true ||  themebool===true ||type==='settings')?'':<>
        <Hoverabletexticonflexrow classNames={'option'} functionOne={()=>props.setThemebool(true)} icon={'adjust'} text={'Theme'}/>
        <Hoverabletexticonflexrow classNames={'option'} functionOne={()=>props.setEmojibool(true)} icon={props.emojitype} text={'Emoji'}/>
        </> }
        <Hoverabletexticonflexrow classNames={'option'} functionOne={()=>window.location.reload()} icon={'sync'} text={'Reload'}/>
        <Hoverabletexticonflexrow classNames={'option'} functionOne={()=>history.goForward()} icon={'long-arrow-alt-right'} text={'Forward'}/>
        <Hoverabletexticonflexrow classNames={'option'} functionOne={()=>history.goBack()} icon={'undo'} text={'Previous'}/>
       
    </div>
    :
    ''
    }
    </>
  )
}
export default Contextmenu