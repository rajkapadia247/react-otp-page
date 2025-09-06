import { OTPComponent } from "./components/OTPComponent";
import { PeopleDexBranding } from "./components/PeopleDexBranding";
import "./app.css";

function App() {
  return (
    <div className="container">
      <PeopleDexBranding />
      <OTPComponent otpSize={6} />
    </div>
  );
}

export default App;
