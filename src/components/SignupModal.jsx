import $ from "jquery";

function SignupModal({ onCancel, registerHandler }) {
  async function checkUsers(event) {
    event.preventDefault();
    //get form data
    const formData = $("#form-signup").serializeArray();
    let data = new Object();
    data.username = formData[0].value;
    data.password = formData[1].value;
    const getUserHeader = new Headers();
    getUserHeader.append("Content-Type", "application/json");
    const request = new Request("/api/getUsers", {
      headers: getUserHeader,
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
    });
    fetch(request)
    .then((response) => {
      if (response.ok) {
        $('#sign-up').fadeOut(300);
        return response.json();
      }
    })
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <div className="absolute w-full h-full flex justify-center items-center ">
        <form
          id="form-signup"
          className="bg-[#D9D9D9] p-4 rounded-lg drop-shadow-xl relative bottom-20 border-[1px] border-black"
        >
          <p className="text-2xl text-center">Sign Up</p>
          <label htmlFor="username">Username</label>
          <br />
          <input
            name="username"
            type="text"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            name="password"
            type="password"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2"
          />
          <br />
          <div className="flex justify-around mt-4">
            <button
              className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black"
              onClick={checkUsers}
            >
              Submit
            </button>
            <button
              className="bg-[#D55B3E] px-2 rounded-full border-[1px] border-black"
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
          </div>
          <p className="text-sm text-center mt-2 ">
            Don't have an account yet?
          </p>
          <p className="text-center text-blue-500 hover:underline">
            <button
              href="#"
              className="text-sm "
              type="button"
              onClick={registerHandler}
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default SignupModal;
