import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add_Post = () => {
  const auth = getAuth();
const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;

        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("Downloaded url = ", url);

        const data = {
          author: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL,
          userId: auth.currentUser.uid,
          imageUrl: url,
          title,
          description,
          time: serverTimestamp(),
        };

        const saveData = await addDoc(collection(db, "post"), data);

        setDescription("")
        setTitle("");
        toast.success("Post added Successfully..", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

         navigate('/')

      } catch (error) {
        console.error("Error uploading..", error.message);
      }
    } else {
      alert("Login First");
    }
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
      <div className="container add_post my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Img
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};

export default Add_Post;
