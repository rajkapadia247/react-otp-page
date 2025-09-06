import type { FC } from "react";
import LogoIcon from "./LogoIcon";
import "../styles/PeopleDexBranding.css";
export const PeopleDexBranding: FC = () => {
  return (
    <div className="branding">
      <div className="branding--logo">
        <LogoIcon className="branding--logo-icon" />
      </div>
      <div className="branding--name">PeopleDex</div>
    </div>
  );
};
