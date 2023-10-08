
const isValidEmail = (email) => {
    const pattren = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattren.test(email);
}

const isNameValid = (name) => {
    const pattren = /^[A-Za-z ]+$/;
    return pattren.test(name);
}

const isPasswordValid = (password) => {
    const pattren = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
    return pattren.test(password);
}

module.exports = { isValidEmail, isPasswordValid, isNameValid };