function SignupModal() {
  return ( 
  <>
    <form action="">
      <p>Sign Up</p>
      <label for="username">Username</label>
      <input name="username" type="text"/>
      <label for="password">Password</label>
      <input name="password" type="password"/>
      <button>Submit</button>
      <button>Cancel</button>
      <p>Don't have an account yet?</p>
      <a href="/">Register</a>
    </form>
  </> 
);
}

export default Signup;