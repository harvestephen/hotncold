function RegisterModal({onCancel, onSignUp}) {
  return (
    <>
      <div className="absolute z-10 w-full h-full flex justify-center items-center">
        <form action="" className="bg-[#D9D9D9] p-4 rounded-lg drop-shadow-xl relative bottom-20 border-[1px] border-black">
          <p className="text-2xl text-center">Register</p>
          <br />
          <label htmlFor="username">Username</label>
          <br />
          <input type="text" name="username" className="border-[#00AAA0] border-[1px] rounded-lg px-2" />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" className="border-[#00AAA0] border-[1px] rounded-lg px-2"/>
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input type="password" name="confirmPassword" className="border-[#00AAA0] border-[1px] rounded-lg px-2"/>
          <br />
          <div className="flex justify-around mt-4">
            <button className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black">Submit</button>
            <button className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black" onClick={onCancel} type="button">Cancel</button>
          </div>
          <p className="text-sm text-center mt-2 ">Already have an account?</p>
          <p className="text-center text-blue-500 hover:underline"><button className="text-sm" type="button" onClick={onSignUp}>Sign Up</button></p>
        </form>
        
      </div>
    </>
  );
}

export default RegisterModal;
