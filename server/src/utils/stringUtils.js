const lowerCharSet = 'abcdedfghijklmnopqrst';
const upperCharSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialCharSet = '!@#$%&*';
const numberCharSet = '0123456789';
const allCharSet = lowerCharSet + upperCharSet + specialCharSet + numberCharSet;

export const generateNewPassword = () => {
  let passwordResult = '';

  for (let i = 0; i < process.env.MIN_UPPER; i++) {
    const rand = Math.floor(Math.random() * upperCharSet.length);
    passwordResult = passwordResult.concat(upperCharSet.charAt(rand));
  }

  for (let i = 0; i < process.env.MIN_SPECIAL; i++) {
    const rand = Math.floor(Math.random() * specialCharSet.length);
    passwordResult = passwordResult.concat(specialCharSet.charAt(rand));
  }

  for (let i = 0; i < process.env.MIN_NUMBER; i++) {
    const rand = Math.floor(Math.random() * numberCharSet.length);
    passwordResult = passwordResult.concat(numberCharSet.charAt(rand));
  }

  const remainLength =
    process.env.PASS_LENGTH -
    process.env.MIN_NUMBER -
    process.env.MIN_SPECIAL -
    process.env.MIN_UPPER;
  for (let i = 0; i < remainLength; i++) {
    const rand = Math.floor(Math.random() * allCharSet.length);
    passwordResult = passwordResult.concat(allCharSet.charAt(rand));
  }
  return passwordResult;
};

export const generateOtp = () => {
  let otpValue = "";
  const otpLength = 6;
  for(let i = 0; i < otpLength; i++){
    const rand = Math.floor(Math.random()*numberCharSet.length);
    otpValue = otpValue.concat(numberCharSet.charAt(rand));
  }
  return otpValue;
}
