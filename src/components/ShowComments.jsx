import React from 'react'
import ConverDateTime from './ConverDateTime'
const ShowComments = ({comment}) => {
  return (
    <><div className="container my-5 comment_con">
        <div className="comment_user">
            <img src={comment.photoUrl} alt="" />
            <h3>{comment.author}</h3>
        </div>
        <ConverDateTime seconds={comment.time.seconds} nanoseconds={comment.time.nanoseconds} />
        <h3>{comment.message}</h3>
        <p></p>
        </div></>
  )
}

export default ShowComments