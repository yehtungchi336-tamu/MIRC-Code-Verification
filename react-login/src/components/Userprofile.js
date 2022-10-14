
import React, {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'
import { db } from '../Fire'
import { CSSTransition } from 'react-transition-group'
import { ContextApp } from '../ContextAPI'
function Userprofile (props) {
  const link = <a href='google.com'>asd</a>
  const {themecolor}=useContext(ContextApp)
  const user = firebase.auth().currentUser
  const {chatuser}=props
  const {convoid, creatorid, recipientid} = props.diag.convoinfo
  const [recipname, setRecipname]=useState('')
  const [recipimg, setRecipimg]=useState('')
  const [recipcity, setRecipcity]=useState('')
  const [recipcountry, setRecipcountry]=useState('')
  const [recipjob, setRecipjob]=useState('')
  const [recipnumber, setRecipnumber]=useState('')
  const [recipemail, setRecipemail]=useState('')
  const [recipwebsite, setRecipwebsite]=useState('')
  const [extend, setExtend]=useState(false)
  const [active, setActive]=useState(false)
  const [loading, setLoading]=useState(true)

  useEffect(()=>{
    db.collection('users').doc(chatuser).onSnapshot(snap=>{
        const user = snap.data()
        setRecipname(user.userinfo.name)
        setRecipimg(user.userinfo.cover)
        setRecipcity(user.userinfo.city)
        setRecipcountry(user.userinfo.country)
        setRecipjob(user.userinfo.job)
        setRecipnumber(user.userinfo.phone)
        setRecipemail(user.userinfo.email)
        setRecipwebsite(user.userinfo.website)
        setActive(user.online)
        setLoading(false)

    })
  },[recipientid, chatuser])
  return (
   <>
    <div className="profilepic profilepiccol br-l">
        <div className='relative'>
        {loading?<div className={'loader blue reloader'}><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>:[<img src={recipimg} alt=""/>, <div className="notifi" style={{backgroundColor:active?'rgb(44, 255, 44)':'#FF3D3D'}}></div>]}
          
        </div>
        <div>
          <p>{recipname.length>17?recipname.slice(0, 17)+'...':recipname}</p>
          <small>Job: {recipjob===''?'Not provided':recipjob}</small>
        </div>
        <i className="fal fa-cog" style={{color: themecolor}}></i>
    </div> 
    <div className="personalinfo br-l flex">
     <div className='flexrow'><p>Personal info</p>
      <i className={extend?`fal fa-chevron-up rotate`:'fal fa-chevron-up'} onClick={()=>setExtend(!extend)}></i>
      </div>
      <CSSTransition in={extend} classNames='extended' timeout={0} unmountOnExit>
        <div className='extendoff'>
        <hr />
         <div className='flex'>
           <div className="flexrow flexinfo"><p>Phone #</p> <p>{recipnumber===''?'N/A':recipnumber}</p></div>
           <div className="flexrow flexinfo"><p>Email</p><p>{recipemail}</p></div>
           <div className="flexrow flexinfo"><p>Country</p><p>{recipcountry===''?'N/A':recipcountry}</p></div>
           <div className="flexrow flexinfo"><p>City</p><p>{recipcity===''?'N/A':recipcity}</p></div>
         </div>
        </div>
      </CSSTransition>
    </div>
    <div className="mutualcontacts br-l pdng flexrow">
    <i class="fal fa-users"></i>
      <p>Mutual Contacts</p>
      <i class="fal fa-ellipsis-h-alt"></i>
      </div>
      <div className="br-l pdng flexrow">
        {recipwebsite.toLocaleLowerCase()==='https://'?<i class="fal fa-external-link"></i>:
          <a href={recipwebsite}><i class="fal fa-external-link"></i></a>}
          <p>View Site</p>
         
      </div>
    </>
  )
}
export default Userprofile