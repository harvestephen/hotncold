import { Titlebar, Topbar, Content, AlertModal } from "./components/Components";

function App() {
  async function getLog() {
    await fetch("/api/is-log", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => console.log(`Logged Status: ${data.logStatus}`));
  }

  getLog();

  return (
    <>
      {/**<AlertModal />*/}
      <Topbar />
      <Titlebar />
      <Content />
    </>
  );
}

export default App;
