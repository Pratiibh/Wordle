import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./ToggleMode.css";

const ToggleMode = () => {
    const toggleDark = () => {
        document.querySelector("body").setAttribute("data-theme","dark")
        localStorage.setItem("selectedTheme", "dark")
    };

    const toggleLight = () => {
        document.querySelector("body").setAttribute("data-theme","light")
        localStorage.setItem("selectedTheme", "light")
    };

    const selectedTheme = localStorage.getItem("selectedTheme");
    if(selectedTheme === "dark"){
        toggleDark();
    } else if(selectedTheme === "light"){
        toggleLight();
    }

    const toggleTheme = (e) => {
        if (e.target.checked) toggleDark();
        else toggleLight();
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default ToggleMode;
