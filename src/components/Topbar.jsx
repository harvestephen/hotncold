import React from "react";
import { SignupModal, RegisterModal } from "./Components";
import $ from "jquery";

export default function Topbar() {

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
        <button className="p-4 text-white" id="sign-up" onClick={handlerSignUp}>
          Sign Up
        </button>
      </div>
    </>
  );
}
