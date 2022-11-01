
import React, {useState, useEffect, useRef} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Contextoptions from './Contextoptions'
import {db} from '../../Fire'
import Contextmenu from '../Contextmenu'
import { displayName } from 'react-addons-css-transition-group'
function Threedots (props) {
  const {msg, user, msgs, convoid}= props
  const [visible, setVisible]=useState(false)
  const [emojis, setEmojis]=useState(false)
  const [msgidedit, setMsgidedit]=useState('')
  const allemojis = [
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
    class: 'frown red',
    msg: 'Frown'
  },
  {
    class: 'heart red',
    msg: 'Like'
  }
    ] 
    function sendReaction(opt){
      msgs && msgs.map(msg=>{
          if(msgidedit===msg.msgid){
            let itemindex = msgs.indexOf(msg)
            if(msg.senderid===user.uid){
              msgs[itemindex].reaction1=`fad fa-${opt}`
              db.collection('conversations').doc(convoid).update({
                  messages: msgs
              })
            }else {
              msgs[itemindex].reaction2=`fad fa-${opt}`
              db.collection('conversations').doc(convoid).update({
                  messages: msgs
              })
            }
          }
      })
    }
    const emojisrow = allemojis && allemojis.map(emoji=>{
      return <i  className={'fad fa-'+emoji.class} onClick={()=>{sendReaction(emoji.class); setVisible(false)}}></i>
    })
    const contextoption = useRef()
    const emojiref = useRef()

  // function reactionMsg(msgid){
  //   msgs && msgs.map(msg=>{
  //     if(msgid===msg.msgid){
  //       let itemindex = msgs.indexOf(msg)
  //       msgs[itemindex].reaction=`fad fa-${opt}`
  //       db.collection('conversations').doc(convoid).update({
  //           messages: msgs
  //       })
  //     }
  // })
  // }

  function copyMsg(){
    var r = document.createRange()
    let text = document.querySelector(`#${msgidedit} .msg`)
    if(text){
      r.selectNode(text)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(r)
      document.execCommand('copy')
      window.getSelection().removeAllRanges()
      setVisible(false)
    }
  }
  function deleteMsg(){
    msgs && msgs.map(msg=>{
      if(msgidedit===msg.msgid&&msg.senderid===user.uid){
        let itemindex = msgs.indexOf(msg)
        msgs.splice(itemindex, 1) 
        db.collection('conversations').doc(convoid).update({
            messages: msgs
        })
        setVisible(false)
      }
  })

  }
 
  function msgOptions(msg){

  }
  const threedots = useRef()
  document.addEventListener('click', function(e){
  if(e.target!==threedots.current){
    setVisible(false)
    setEmojis(false)
  }
})
  return (
    <>
      <i ref={threedots}onClick={(e)=>{msgOptions(msg); setMsgidedit(msg.msgid); setVisible(!visible)}} className={msg.senderid === user.uid ?"fal fa-ellipsis-v-alt rightdots":'fal fa-ellipsis-v-alt leftdots'}></i>
      <div onContextMenu={(e)=>e.preventDefault()} onClick={(e)=>e.stopPropagation()} className='flexrow optionsEdit' ref={contextoption} data-id={msg.msgid} style={{display: visible?'flex':'none'}}>
      <div className="emojisdiv">
      <Contextoptions classNames={'laugn'} icon={'fad fa-laugh'} setState={setEmojis} re={emojiref}/>
      <div  onClick={(e)=>e.stopPropagation()} className="emojisrow flexrow bs" style={{display: emojis?'flex':'none',  zIndex: 'var(--high-priority)'}}>
        {emojisrow}
      </div>
      </div>
       <Contextoptions classNames={'copy'} icon={'fad fa-copy'} function1={()=>copyMsg()}/>
       <Contextoptions classNames={'delete'} icon={'fad fa-trash'} function1={()=>deleteMsg()}/>
      </div>
    </>
      )
}
export default Threedots