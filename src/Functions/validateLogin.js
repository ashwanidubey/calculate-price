function validateLogin(creds) {
    const { email, password } = creds;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) && password.length >= 6) {
      return { status: true };
    } else {
      let error = "";
      if (!emailRegex.test(email)) {
        error = "Invalid email address.";
      } else if (password.length < 6) {
        error = "Password should be at least 6 characters long.";
      }

      return { status: false, error };
    }
  }

  export default validateLogin;