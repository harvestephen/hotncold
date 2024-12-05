import $ from "jquery";
import { useNavigate } from "react-router-dom";

function RegisterModal({
  onCancel,
  onSignUp,
}) {
  const navigate = useNavigate();

  async function formHandler(event) {
    event.preventDefault();

    await fetch('/api/log', {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        logStatus: true
      }),
      mode: "cors"
    })
    .then(res => {
      if (res.ok){
        console.log("Logged True Success!")
      }
    })
      
    

    const formArray = $("#register-form").serializeArray();

    // Convert serialized array into an object
    const formData = {};
    formArray.forEach(({ name, value }) => {
      formData[name] = value;
    });
    await fetch("/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Responde Ok!");
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        console.log("Success:", data); // Handle success
        console.log("Navigating...");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors
      });
    console.log(JSON.stringify(formData));
  }

  return (
    <>
      <div className="absolute z-10 w-full h-full flex justify-center items-center">
        <form
          id="register-form"
          onSubmit={formHandler}
          className="bg-[#D9D9D9] p-4 rounded-lg drop-shadow-xl relative bottom-20 border-[1px] border-black"
        >
          <p className="text-2xl text-center">Register</p>
          <br />
          <label htmlFor="username">Username</label>
          <br />
          <input
            type="text"
            name="username"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2"
          />
          <br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            className="border-[#00AAA0] border-[1px] rounded-lg px-2"
          />
          <br />
          <div className="flex justify-around mt-4">
            <button className="bg-[#B6CFCF] px-2 rounded-full border-[1px] border-black">
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
          <p className="text-sm text-center mt-2 ">Already have an account?</p>
          <p className="text-center text-blue-500 hover:underline">
            <button className="text-sm" type="button" onClick={onSignUp}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterModal;
