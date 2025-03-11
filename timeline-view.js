// import { app } from "../../../utils/firebase.js";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// import {
//     getSingleEvent
// } from "../../../utils/functions.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyBKwdwIDpg3D91C3dUyHSlAqzl95Hxlnr0",
  authDomain: "wmdd-7e8dd.firebaseapp.com",
  projectId: "wmdd-7e8dd",
  storageBucket: "wmdd-7e8dd.firebasestorage.app",
  messagingSenderId: "930877352949",
  appId: "1:930877352949:web:a2962e99c5a223306fcebc",
  measurementId: "G-ZGHP9KQE0H",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


viewSharedEvent()

function viewSharedEvent() {
    let currentURL = window.location.href;
    console.log(currentURL)
    let searchParameters = new URL(currentURL).searchParams;
    let urlParameters = new URLSearchParams(searchParameters).values();
    let parameterArray = Array.from(urlParameters);
    let eventID = parameterArray[0];
    console.log(eventID);
    getEvents(eventID);
}

async function getSingleEvent (eventId) {
  const db = getFirestore(app);
  const q = doc(db, "timeline_test", eventId)
  try {
        const querySnapshot = await getDoc(q);
        return querySnapshot.data();
  } catch (error) {
    console.log("Issue in retrieving shared event: ", error)
  }
}

async function getEvents(eventID) {
  try {
    console.log("function getEvents =>", eventID);
    const event = await getSingleEvent(eventID);
    console.log(event);
    listEvents(event);
  } catch (error) {
    console.error(error);
  }
};



// LIST Events -> 1) clone front-end event design 2) fill with data 3) append to event container
function listEvents(event) {
  console.log("function listEvents =>")
    console.log('i m here, ', event);
    document.querySelector(`#share-date`).textContent =
    event.event_date;
    document.querySelector(`#share-title`).textContent =
    event.event_title;
    // timeline image supabase
    document.querySelector(`#share-image`).src =
    event.event_image;
    document.querySelector(`#share-description`).textContent =
    event.event_description;
    document.querySelector(`#share-user`).textContent =
    event.event_user;
    document.querySelector(`#share-location`).textContent =
    event.event_location;
    document.querySelector(`#share-tag`).textContent =
    event.event_tag;
    document.querySelector(`#share-category`).textContent =
    event.event_category;
  }

window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/timeline") {
    getEvents();
  }
});