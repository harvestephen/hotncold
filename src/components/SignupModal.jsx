function SignupModal() {
  return (
    <>
      <div className="absolute z-10 w-full h-full flex justify-center items-center">
        <form action="" className="bg-[#D9D9D9] p-4 rounded-lg drop-shadow-xl relative bottom-36">
          <p className="text-2xl text-center">Sign Up</p>
          <label for="username">Username</label>
          <br />
          <input name="username" type="text" className="border-[#00AAA0] border-[1px] rounded-lg focus:outline-0 px-2"/>
          <br />
          <label for="password">Password</label>
          <br />
          <input name="password" type="password" className="border-[#00AAA0] border-[1px] rounded-lg px-2"/>
          <br />
          <div className="flex justify-around mt-4">
            <button className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black">Submit</button>
            <button className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black">Cancel</button>
          </div>
          <p className="text-sm text-center mt-2 ">Don't have an account yet?</p>
          <p className="text-center text-blue-500 hover:underline"><a href="#" className="text-sm ">Register</a></p>
        </form>
      </div>
    </>
  );
}

export default SignupModal;
