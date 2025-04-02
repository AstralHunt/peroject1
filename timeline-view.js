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

export const getSingleStory = async (storyId) => {
  const db = getFirestore(app);
  const storyRef = doc(db, "stories", storyId);

  try {
    const docSnap = await getDoc(storyRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("story not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting story:", error);
    return null;
  }
};

export const getUserInfo = async (userId) => {
  const db = getFirestore(app);
  const userDocRef = doc(db, "users", userId);

  try {
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting user data: ", error);
  }
};

export const getSingleMember = async (memberId) => {
  const db = getFirestore(app);
  const memberRef = doc(db, "family_tree", memberId);

  try {
    const memberSnap = await getDoc(memberRef);
    if (memberSnap.exists()) {
      return memberSnap.data();
    } else {
      console.log("member not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting member info:", error);
    return null;
  }
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
    getEvents(eventID);
}
let author;
let singleMember;
let div = document.createElement('div');
div.id = "shared-story-member"
async function getEvents(eventID) {
  try {
    const event = await getSingleStory(eventID);
    author = await getUserInfo(event.author_id);
    if (event.story_tagged_people != undefined) {
      div.textContent = "Members:"
      for (const member of event.story_tagged_people) {
        singleMember =  await getSingleMember(member);   
        const p = document.createElement("p");
        if (singleMember && singleMember.member_name) {
          p.textContent = singleMember.member_name;
          p.style.color = "#3d6767";
          div.appendChild(p);
        }
      }
    }
    

    listEvents(event);
  } catch (error) {
    console.error(error);
  }
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];

  // Get the day
  const day = String(date.getDate()).padStart(2, '0');
  return `${day} ${month} ${year}`;
}

// LIST Events -> 1) clone front-end event design 2) fill with data 3) append to event container
function listEvents(event) {
  console.log("function listEvents =>")
    document.querySelector(`#share-author`).textContent =
    `Author: ${author.firstName}`
    document.querySelector(`#share-date`).textContent =
    formatTimestamp(event.story_date);

    
    document.querySelector(`#share-title`).textContent =
    event.story_title;
    // timeline image supabase
    if (event.story_cover_image){
      const img = createElement('img');
    img.src =
    event.story_cover_image;
    document.getElementById('view-shared').appendChild(img);
    }
    if (event.story_gallery){
        event.story_gallery.forEach(image => {
          const galleryImage = document.createElement("img");
          galleryImage.src = image;
          document.getElementById('view-shared').appendChild(galleryImage);
        });
    }
    document.querySelector(`#share-description`).textContent =
    event.story_description;
    if (event.story_audio){
      let audioElement = document.createElement('audio');
      audioElement.id = 'story-audio'; 
      audioElement.controls = true;      
    audioElement.src = event.story_audio;
    }
    document.getElementById("share-location").textContent = event.story_location.story_address;
    document.getElementById('view-shared').appendChild(div);
  }


window.addEventListener("hashchange", () => {
  if (window.location.hash === "#/story") {
    getEvents();
  }
});
