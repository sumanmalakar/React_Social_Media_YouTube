import React, { useEffect, useState } from 'react'
import {collection, addDoc,query,onSnapshot,orderBy} from 'firebase/firestore'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import ShowComments from './ShowComments';
import Loader from "./Loader";


const Comments = ({ postId }) => {
   const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(" ");

   useEffect(() => {
     const commentQuery = query(collection(db, "comments"), orderBy("time", "desc"));

     const fetchData = async () => {
       await onSnapshot(commentQuery, (snapshot) => {
         setComments(
           snapshot.docs.map((doc) => ({
             ...doc.data(),
             id: doc.id,
           }))
         );
        setLoading(false);
       });
     };
 
     fetchData();
     console.log("fetching comments ",comments);
   }, []);
 

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (auth.currentUser && newComment != " ") {
      await addDoc(collection(db, "comments"), {
        postId,
        message: newComment,
        author: auth.currentUser.displayName,
        photoUrl: auth.currentUser.photoURL,
        userId:auth.currentUser.uid,
        time: new Date(),
      });
      setNewComment(" ");
      alert("Comment added");
    } else {
      alert("Login first");
    }
  };
  const filteredComment = comments.filter((comment)=>comment.postId == postId)
  return (
    <>
      <div className="container text-center my-5">
        <form onSubmit={handleAddComment}>
          <div className="mb-3 comments">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              className="form-control mx-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              //   placeholder="Add a Comment..."
              required
            />

            <button type="submit" className="btn btn-primary">
              Add Comment
            </button>
          </div>
        </form>
        <h3>Total Comments :- {filteredComment.length}</h3>
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredComment.map((comment) => (
              <ShowComments key={comment.userId} comment={comment} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Comments