import React from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // console.log(result.user)
    const user = result.user;

    //check for user
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        timestamp: serverTimestamp(),
      });
    }
    toast.success(`Welcome ${auth.currentUser.displayName}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/profile");
  };
  // console.log(auth)

  const logOut = async () => {
    await auth.signOut();
    // console.log("logout");
      toast.success("LogOut Successfully..", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    navigate("/");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="nav_bar sticky-top">
        <Link to={"/"} className="left">
          {auth.currentUser ? (
            <>
              <img src={auth.currentUser.photoURL} alt="" />
              <h3>{auth.currentUser.displayName}</h3>
            </>
          ) : (
            <h2>Social Media App</h2>
          )}
        </Link>
        <div className="right">
          {!auth.currentUser && (
            <button
              onClick={googleClick}
              className="btn text-success btn-light mx-3"
            >
              <h5>
                <FcGoogle /> Login With Google
              </h5>
            </button>
          )}

          {auth.currentUser && (
            <Link to={"/post"} className="btn btn-warning mx-3">
              Post
            </Link>
          )}
          {auth.currentUser && (
            <Link to={"/profile"} className="btn btn-warning mx-3">
              Profile
            </Link>
          )}

          <Link to={"/users"} className="btn btn-warning mx-3">
            All Users
          </Link>
          {auth.currentUser && (
            <button onClick={logOut} className="btn btn-warning mx-3">
              LogOut
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
