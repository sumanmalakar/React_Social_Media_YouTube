import React from 'react'

const ConverDateTime = ({seconds, nanoseconds, text}) => {
    const time = seconds*1000 + nanoseconds/1e6;
    const date = new Date(time)

    // convert to IST
    date.setUTCHours(date.getUTCHours()+5);
    date.setUTCMinutes(date.getUTCMinutes()+30);

    const formatedDate = date.toLocaleString("en-In",{
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        seconds:"numeric",
        timeZoneName:"short"
    })
  return (
    <><h6>{text}{" "}{formatedDate}</h6></>
  )
}

export default ConverDateTime