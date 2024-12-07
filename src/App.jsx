import { Titlebar, Topbar, Content, AlertModal } from "./components/Components";
import checkLog from "./scripts/checkLog";
import { useEffect } from "react";

function App() {
  async function log() {
    const data = await checkLog();
    const isLogged = await data.logStatus;
    return isLogged;
  }
  const logStatus = log();

  return (
    <>
      {/**<AlertModal />*/}
      <Topbar isLogged={logStatus} />
      <Titlebar />
      <Content />
    </>
  );
}

export default App;
