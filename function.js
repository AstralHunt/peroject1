


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
