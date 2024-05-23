import otp from 'otp-generator'

const generateOTP = () => {
  const OTP = otp.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false
  });

  return OTP;
};

export default generateOTP