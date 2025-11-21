const verifyEmailTemplate = ({name, url}) => {
    return `
    <p>Hello ${name}!</p>
    <p>Thank you for registrering @Blinkit</p>
    <a href=${url} style="color:white; background-color:blue; padding:10px; border-radius:5px; margin:10px">
    Verify Email</a>
    
    
    `
}

export default verifyEmailTemplate;