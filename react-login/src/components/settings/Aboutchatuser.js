import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import { db } from '../../Fire'
import Infocontainer from './Infocontainer'

function Aboutchatuser (props) {
  let {chatuser}=props
  const [name, setName]=useState('')
  const [age, setAge]=useState('')
  const [city, setCity]=useState('')
  const [country, setCountry]=useState('')
  const [cover, setCover]=useState('')
  const [email, setEmail]=useState('')
  const [job, setJob]=useState('')
  const [phone, setPhone]=useState('')
  const [website, setWebsite]=useState('')
  useEffect(()=>{
    db.collection('users').doc(chatuser).onSnapshot(snap=>{
      let data = snap.data()
      setName(data.userinfo.name)
      setAge(data.userinfo.age)
      setCity(data.userinfo.city)
      setCountry(data.userinfo.country)
      setCover(data.userinfo.cover)
      setEmail(data.userinfo.email)
      setJob(data.userinfo.job)
      setPhone(data.userinfo.phone)
      setWebsite(data.userinfo.website)
    })

  },[])
  return (
   <>
    <div className="flexrow sb">
    <h2 className='capitalize'>About {name}</h2>
    <div className="profilepic">
      <img src={cover} alt="profilepicture"/>
    </div>
    </div>
    <hr/>
    <h3 style={{marginBottom: '10px'}}>Personal Info</h3>

    <Infocontainer variable={age} title={'Age'}/>
    <Infocontainer variable={job} title={'Job'}/>
    <Infocontainer variable={phone} title={'Phone'}/>
    <Infocontainer variable={country} title={'Country'}/>
    <Infocontainer variable={city} title={'City'}/>
    <h3 style={{margin: '10px 0'}}>Other Info</h3>
    <Infocontainer variable={email} title={'Email'}/>
    <div className="flexrow sb" style={{margin: '10px 0'}}>
      <p>Website:</p>
      <p className='light'>{website==='https://'?'N/A':<a href={website} rel='noreferrer' target="_blank"> <i class="fal fa-external-link-alt"></i></a>}</p>
    </div>

  </>
  )
}
export default Aboutchatuser