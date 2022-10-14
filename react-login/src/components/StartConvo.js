import { db } from "../Fire";
import firebase from "firebase";

export function StartConvo(recipientid, message, convoid, recipientname) {
  const user = firebase.auth().currentUser;
  const date = firebase.firestore.FieldValue.serverTimestamp()
  let convoinfo = {
    convoid,
    creatorid: user.uid,
    creatorname: user.displayName,
    recipientid,
    recipientname,
    typerid: user.uid,
    userref: db.collection("users").doc(recipientid)
    // usertyping: false,
  };
  let customizedconvo = {
    theme: "https://i.imgur.com/4hzNTTq.png",
    emoji: "🤗"
  };
  let nicknames = {
    nickname1: "",
    nickname2: ""
  };
  let messages = {
    message,
    reaction1: "",
    reaction2: "",
    msgdate: firebase.firestore.Timestamp.now(),
    msgid: db.collection("conversations").doc().id,
    read: false,
    senderid: user.uid,
    sendername: user.displayName,
    editing: false
  };
  let notificationobj = {
    notifimsg: message,
    notifidate: firebase.firestore.Timestamp.now(),
    read: false,
    sender: user.displayName,
    id: convoid,
    senderid: user.uid,
    notifiid: db.collection('users').doc().id
  }      
    db.collection('notifications').doc(recipientid).update({
      notifications: firebase.firestore.FieldValue.arrayUnion(notificationobj)
    })
  db.collection("users")
    .doc(user.uid)
    .update({
      msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
      msgpersonids: firebase.firestore.FieldValue.arrayUnion(recipientid)
    });
  db.collection("users")
    .doc(recipientid)
    .update({
      msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
      msgpersonids: firebase.firestore.FieldValue.arrayUnion(user.uid)
    });
  db.collection("conversations")
    .doc(convoid)
    .set({
      lastmsgdate : date,
      convoinfo,
      messages: firebase.firestore.FieldValue.arrayUnion(messages),
      customizedconvo,
      nickname1: '',
      notifications1: true,
      nickname2: '',
      notifications2: true,
    });
}
