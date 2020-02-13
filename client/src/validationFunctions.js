export const checkName = (newName) => {
    if(newName.length > 0){
        return 'Passed'
    } else return 'Failed'
}

export const checkEmail = (email) => {
     if(/\S+@\S+\.\S+/.test(email)){
         return 'Passed'
     } else return 'Failed'
}

export const checkPW = (pw) => {
    const regex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g
    let lengthCheck = false;
    let uppercase = false;
    let lowercase = false;
    let number = false;
    let uniqueChar = false;

    if (pw.length >= 8){
        lengthCheck = true
    }
    for(let i = 0; i < pw.length; i++){
        if(pw[i] === pw[i].toLowerCase()){
            lowercase = true;
        } else if (pw[i] === pw[i].toUpperCase()){
            uppercase = true;
        }
    }
    for(let i = 0; i < pw.length; i++){
        if(isNaN(pw[i]) === false){
            number = true
            break
        }
    }
    if(regex.test(pw)){
        uniqueChar = true;
    }

    if(lengthCheck === true && uppercase === true && lowercase === true && number === true && uniqueChar === true){
        return 'Passed'
    } else return 'Failed'
}

export const checkRepeatingPW = (pw,repeatingPw) => {
    if(pw === repeatingPw){
        return 'Passed'
    } else return 'Failed'
}