import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./router";
import { onAuthStateChanged } from "firebase/auth";
import {  getMatchingData } from "@/Firebase";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";
import { auth } from "@/Firebase/firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch role from Firestore if user is authenticated
        const users = await getMatchingData("users", "email", "==", user.email);
        const userDoc = users && users.length > 0 ? users[0] : null;
        
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            role: userDoc?.role || "homeowner",
          })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return useRoutes(appRoutes);
}

export default App;
