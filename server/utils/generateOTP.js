const generateOTP=()=>{
    return Math.floor(Math.random()*900000)+100000
    //generates a 6 digit OTP between 10000 to 999999
}

export default generateOTP