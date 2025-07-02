import React from "react";
import '../css/Themebutton.css';
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from 'react';
import color from '../assets/icons/color.svg';

export default function Themebutton() {
  const { setTheme } = useTheme();
  const [ColorPopup, setColorPopup] = useState(false);

  const OpenPopup = () => {
    setColorPopup(!ColorPopup);
  }

  const ButtonDetailObject = [
    {
      class : 'redTheme',
      value : 'Red',
    },
    {
      class : 'skyTheme',
      value : 'Sky',
    },
    {
      class : 'purpleTheme',
      value : 'Purple',
    },
    {
      class : 'greenTheme',
      value : 'Green',
    },
  ]

  return (
    <>
      <div className="ButtonSection" title="เปลี่ยนธีมสีของเว็บไซต์">
        <div className="openButton" onClick={OpenPopup}>
          <img src={color} className="imgIcon" />
        </div>
        {ColorPopup && (
          <div className="popupButton" >
            {ButtonDetailObject.map((buttonObject) => (
              <div className={`ButtonChange ${buttonObject.class}`} onClick={() => setTheme(buttonObject.value)} role="button"  key={buttonObject.class}></div>
            ))}
          </div>

        )}

      </div>
    </>
  );
}
