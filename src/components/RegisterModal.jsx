function RegisterModal() {
  return ( 
    <>
      <form action="">
        <p>Register</p>
        <label for="username">Username</label>
        <input type="text" name="username"/>
        <label for="password">Password</label>
        <input type="password" name="password"/>
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" name="confirmPassword"/>
        <button>Submit</button>
        <button>Cancel</button>
        <p>Already have an account?</p>
        <a href="/">Sign Up</a>
      </form>
    </>
   );
}

export default RegisterModal;