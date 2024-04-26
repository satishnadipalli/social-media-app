export function getUserName(userId,userArray){
    // console.log(userArray);
    const displayUserName = userId == (userArray?.[0]?._id) ? userArray[1]?.username : userArray?.[0]?.username;
    return displayUserName;
}

export function getUserId(userId,userArray){
    // console.log("from the getUserName funtion",userArray,userId);
    const displayUserName = userId == userArray[0]?._id ? userArray[1]?._id : userArray[0]?._id;
    return displayUserName;
}