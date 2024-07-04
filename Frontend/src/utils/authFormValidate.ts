
interface UserData {
    username: string;
    email: string;
    password: string;
    phone: string;
    role: string;
}

export const validateCreds = (userData: UserData , forRegister: boolean) => {

    let result = true;
    let message = '';

    if(forRegister) {

        if(userData.username.trim() === '' || userData.password.trim() === '' || userData.phone.trim() === '') {
            result = false;
            message = 'Invalid Entries'
        }
    } else {

        if(userData.email.trim() === '' || userData.password.trim() === '') {
            result = false;
            message = 'Invalid Entries'
        }
    }

    return {
        result,
        message
    }
}


export const validatePassword = (password: string) => {
    const passwordNeeds = {
        minLength: 5,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const isStrong = 
    password.length >= passwordNeeds.minLength &&
    passwordNeeds.hasUpperCase &&
    passwordNeeds.hasLowerCase &&
    passwordNeeds.hasNumber &&
    passwordNeeds.hasSpecialChar;

    return isStrong;
}