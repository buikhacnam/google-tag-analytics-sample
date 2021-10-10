import "./styles.css";
import { useEffect } from "react";
import initGA, { changePageTitle } from "./libs/google-tag";
export default function App() {
  useEffect(() => {
    changePageTitle("gtag tracking");
    initGA();
  });
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
