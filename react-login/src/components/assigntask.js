import React, { useState, useEffect, useRef, useContext } from "react";
import firebase from "firebase";
import { db, realtime_db, storage } from "../Fire";
//import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ContextApp } from "../ContextAPI";
import Hoverlink from "./Hoverlink";
import "firebase/auth";

export default Assigntask;

function Assigntask(props) {
  ////
  
  //const ref = firebase.storage().ref();
  const [progrss, setProgrss] = useState(0);
  const [isLoading, setIsLoading] = useState();
  const [file, setFile] = useState();
  const [url, setUrl] = useState();
  //
  const {v4 : uuidv4} = require('uuid')
  // Initialize Firebase Authentication and get a reference to the service
  const auth = firebase.auth();
  //Get current user through authentication
  const user = auth.currentUser;

  const onFileUpload = () => {
      if (!file) return;
      setIsLoading(true);
      //const storageRef = ref(storage, `/files/${file.name}`);
      var storageRef = storage.ref();
      // Upload the file and metadata
      //const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(assistantId);
      var uploadTask = storageRef.child(`/audios/${user.uid}/${assistantId}/${Date() + " _ " +file.name}`).put(file);

      uploadTask.on("state_changed", (snapshot) => {
          var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgrss(progress);
      }, (err) => {
          console.log(err);
          setIsLoading(false);
      },
          () => {
              // Handle successful uploads on complete
              /*
              getDownloadURL(uploadTask.snapshot.ref)
                  .then(url => {
                      setUrl(url);
                      setIsLoading(false);
                  })
              */
              uploadTask.snapshot.ref.getDownloadURL()
                  .then(url => {
                      setUrl(url);
                      setIsLoading(false);
              })
          }
      )
  }
  const onFileChange = e => {
      setFile(e.target.files[0]);
      e.preventDefault();
  }

  const { themecolor } = useContext(ContextApp)
  //const user = firebase.auth().currentUser
  const [roleType, setRoleType] = useState('')
  const [cover, setCover] = useState("")
  const { handleLogout } = props
  const links = ["comment", "notifications", "settings", "adddraft", "logout"]
  const [notifi, setNotifLength]=useState(0)
  const lnks = [
    { icon: "fal fa-comment-alt", txt: "Comment" },
    { icon: "fal fa-bell", txt: "Notifications" },
    { icon: "fal fa-cog", txt: "Settings" },
    { icon: "fal fa-cog", txt: "Adddraft" },
    { icon: "fal fa-sign-out", txt: "Logout" }
  ];
  const id =db.collection('users').doc().id
  const lnksrow =
    lnks &&
    lnks.map((lnk) => {
      return (
        <Hoverlink  icon={lnk.icon} txt={lnk.txt} handleLogout={handleLogout} />
      );
    });

  const [textarea, setTextarea] = useState();
  //const [inputs, setInputs] = useState({})
  const [assistantId, setAssistant] = useState({})
  const handleChange = (event) => {
    setAssistant(event.target.value)
  }

  const handle_textarea_Change = (event) => {
    setTextarea(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(assistantId);
    /*
    var tutorialsRef = realtime_db.ref("/draft");
    tutorialsRef.push({
      username: user.displayName,
      subject: "",//inputs.subject,
      recipient: "",//inputs.recipient,
      cc: "",//inputs.CC,
      bcc: "",//inputs.BCC,
      message: "",//textarea,
      assistant: inputs,
      audiofile: "",
      status: "Pending",
    });
    */
  }

  useEffect(()=>{
    if (user){
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const tmp = snap.data()
      setRoleType(tmp.role)
      //roleType = tmp.role
      console.log("home set role.." + tmp.role)
    })
    }
  },[])

  function determineTime() {
    const d = new Date();
    if (d.getHours() >= 6 && d.getHours() < 12) {
      return "Good Morning,";
    } else if (d.getHours() >= 12 && d.getHours() < 17) {
      return "Good Afternoon,";
    } else if (d.getHours() >= 17 && d.getHours() < 20) {
      return "Good Evening,";
    } else if (d.getHours() >= 20 && d.getHours() <= 23) {
      return "Good Night,";
    } else if (d.getHours() >= 0 && d.getHours() < 6) {
      return "Good Night,";
    }
  }

  function determinetext() {
    if (user) {
        return determineTime() + " " + roleType + " " + user.displayName + " (login type: " + user.providerData[0].providerId + ")"
    }
  }

  return (
    <div className="home">
      <div className="header flex sb">
        {/*<h2 className="marginBottom">{determinetext()}</h2>*/}
        <h2 style={{color: 'black'}}>Assign Task</h2>
      </div>
      
      <div className="flex fe sticky">
        <div className="gridobjects  bs marginBottom">
          <Hoverlink
            icon="fal fa-sign-out"
            txt="Logout"
            classNames="blueback all flexrow sa"
            lnk="/"
            clk={() => props.handleLogout()}
          />
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col align-self-center">
          <form onSubmit={handleSubmit}>
            {}
            <label htmlFor="assistant">Assistant:
            <select placeholder="Please select assistant" name="assistant" onChange={handleChange}>
              <option value="">Please select assistant</option>
              <option value="Jinson">Jinson</option>
              <option value="YaoWen">YaoWen</option>
              <option value="Yaru">Yaru</option>
              <option value="YiChia">YiChia</option>
              <option value="Max">Max</option>
            </select>
            </label>
            Audiofile

            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload!
            </button>
            <div className="break"></div>
            {isLoading && <p>File upload <b>{progrss}%</b></p>}
            {url && <p>File uploaded</p>}
            
          </form>
          </div>
        </div>
      </div>
      <div className="homeside"></div>
    </div>
  );
}



