function validateSignup(creds) {
    const { name,email, password, cpassword } = creds;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) && password.length >= 6 && password===cpassword && name.length>=4) {
      return { status: true };
    } else {
      let error = "";
      if (!emailRegex.test(email)) {
        error = "Invalid email address.";
      } 
      else if (password.length < 6) {
        error = "Password should be at least 6 characters long.";
      }
      else if (password!==cpassword) {
        error = "both password should be same.";
      }
      else  {
        error = "Name should be at least 4 characters long.";
      }


      return { status: false, error };
    }
  }

  export default validateSignup;