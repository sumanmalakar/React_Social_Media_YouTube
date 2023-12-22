import React from "react";
import {deleteDoc,doc} from 'firebase/firestore'
import { db } from "../firebase.config";
import ConverDateTime from "./ConverDateTime";

import { Link, useLocation } from "react-router-dom";
import { FaComment } from "react-icons/fa";

const Post = ({ data }) => {
  console.log(data);
  const location = useLocation();

  const deletPost = async (id)=>{
    alert("You post will deleted forever..!");
    const deleteData = doc(db,"post",id);
    await deleteDoc(deleteData);
  }
  return (
    <>
      <div className="container post_con my-5">
        <div className="post_user">
          <img src={data.photoUrl} alt="" />
          <h3>{data.author}</h3>
        </div>
        <div className="card mb-3 post_card  bg-secondary">
          <div className="row g-0">
            <div className="col-md-4 d-flex justify-content-center align-items-center">
              <img
                src={data.imageUrl}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body text-center text-light">
                <h3 className="card-title">{data.title}</h3>
                <p className="card-text">{data.description}</p>
                <p className="card-text">
                  <ConverDateTime
                    seconds={data.time?.seconds}
                    nanoseconds={data.time?.nanoseconds}
                  />
                </p>
                <Link to={`/post/${data.id}`} className="btn btn-info mx-3">
                  <h6><FaComment style={{color:'white'}} /> {" "}Comments</h6>
                </Link>
                <Link to={`/post/${data.id}`} className="btn btn-warning mx-3">
                  <h6>View More</h6>
                </Link>
                {location.pathname == "/profile" && (
                  <button
                    onClick={() => deletPost(data.id)}
                    className="btn btn-danger"
                  >
                    <h6>Delete</h6>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
