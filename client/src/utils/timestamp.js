function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

export const formatTimestampToTime = (timestamp)=>{

    const dateObject =  timestamp.toDate()

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes()

    // Format the time as HH:MM:SS
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}`;
    console.log(formattedTime)
    return formattedTime;
}


