const forgotPasswordTemplateController=({name, otp})=>{
    return `
    <div>
    <p> Dear ${name}, </p>
    <p>Here is your OTP for resetting your password</p>
    <h3>${otp}</h3>
 <br>
 <p>This otp is valid only for 1 hr. Don't share it with anybody</p>
 <p>Thanks!</p>
 <p>BlinkIt</p?
    </div>
    
    
    
    `
}

export default forgotPasswordTemplateController