import React from "react";
import { useState, useEffect } from "react";
import { SignupModal, RegisterModal } from "./Components";
import $ from "jquery";

export default function Topbar() {

  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState();

  //Set login to true
  async function setLogIn() {
    fetch("/api/log", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({logStatus: true}),
    })
    .then((res) =>{
      if (!res.ok) {console.log("Fetch Error...")} 
    });
  }

  //set login to false
  async function setLogOut() {
    fetch("/api/log", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({logStatus: false}),
    })
    .then((res) =>{
      if (!res.ok) {console.log("Fetch Error...")} 
      setIsLogged(false);
      window.location.reload();
    });
  }

  function signUpCancelHandler() {
    $("#sign-up").fadeOut(300);
  }

  function handlerSignUp() {
    $("#sign-up").fadeIn(300);
    $("#register").fadeOut(300);
  }

  function registerCancelHandler() {
    $("#register").fadeOut(300);
  }

  function handlerRegister() {
    $("#sign-up").fadeOut(300);
    $("#register").fadeIn(300);
  }

  //function to check if logged in
  async function checkLog() {
    const response = await fetch("/api/is-log");
    if (response.ok) {
      return response.json();
    }
  }

  //function to get current usename
  async function getUsername() {
    const response = await fetch('/api/get-currentUser')
    if (response.ok) {
      return response.json();
    }
  }
  
  useEffect(() => {
    checkLog()
    .then((result) => {
      if (result.logStatus === true) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    })
    .catch((err) => {
      console.log(err)
    })

    getUsername()
    .then((result) => {
      setUsername(result.user.name);
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <>
      <div className="hidden" id="sign-up">
        <SignupModal
          onCancel={signUpCancelHandler}
          registerHandler={handlerRegister}
        />
      </div>
      <div className="hidden" id="register">
        <RegisterModal
          onCancel={registerCancelHandler}
          onSignUp={handlerSignUp}

        />
      </div>

      <div className="flex justify-end">
        {isLogged ? 
        <div>
          <span className="p-4 text-white capitalize">{username}</span>
          <button className="p-4 text-white" id="sign-up" onClick={setLogOut}>
            Sign Out
          </button> 
        </div>
        : 
        <button className="p-4 text-white" id="sign-up" onClick={handlerSignUp}>
          Sign Up
        </button>}
        
      </div>
    </>
  );
}
