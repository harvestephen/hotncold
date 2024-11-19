function SignupModal({onCancel, registerHandler}) {

  

  return (
    <>
      <div className="absolute w-full h-full flex justify-center items-center ">
        <form action="/" className="bg-[#D9D9D9] p-4 rounded-lg drop-shadow-xl relative bottom-20 border-[1px] border-black">
          <p className="text-2xl text-center">Sign Up</p>
          <label htmlFor="username">Username</label>
          <br />
          <input name="username" type="text" className="border-[#00AAA0] border-[1px] rounded-lg px-2"/>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" type="password" className="border-[#00AAA0] border-[1px] rounded-lg px-2"/>
          <br />
          <div className="flex justify-around mt-4">
            <button className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black">Submit</button>
            <button className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black" onClick={onCancel} type="button">Cancel</button>
          </div>
          <p className="text-sm text-center mt-2 ">Don't have an account yet?</p>
          <p className="text-center text-blue-500 hover:underline"><button href="#" className="text-sm " type="button" onClick={registerHandler}>Register</button></p>
        </form>
        
      </div>
    </>
  );
}

export default SignupModal;
