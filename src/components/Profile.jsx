import React, { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase.config";
import Post from "./Post";
import { getAuth } from "firebase/auth";


const Profile = () => {
  const auth = getAuth();
  // console.log(auth)

  const [posts, setposts] = useState([]);

  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));

    const fetchData = async () => {
      await onSnapshot(postQuery, (snapshot) => {
        setposts(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    fetchData();
    console.log(posts);
  }, []);
  return (
    <>
      <div className="container text-center my-5">
        <div className="profile_user">
          <img src={auth.currentUser.photoURL} alt="" />
          <h2>{auth.currentUser.displayName}</h2>
          <h2>{auth.currentUser.email}</h2>
          <h3>Last Login :- {auth.currentUser.metadata.creationTime} </h3>
        </div>
      </div>
      {posts.filter((post)=>post.userId == auth.currentUser.uid).map((data) => (
        <Post key={data.id} data={data} />
      ))}
    </>
  );
};

export default Profile;
