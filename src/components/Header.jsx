import { useState } from "react";
import { Logomobile, chevronDown, chevronUp, vertical } from "../assets/img";

import HeaderDropdown from "./HeaderDropdown";
import CreateModel from "../models/CreateModel";

// eslint-disable-next-line react/prop-types
function Header({ setBoardModel, BoardModel }) {
  const [Dropdown, setDropdown] = useState(false);

  return (
    <>
      <div className="p-4 fixed left-0 bg-white dark:bg-slate-700 z-50 right-0">
        <header className="flex justify-between dark:text-white items-center ">
          {/* Left side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={Logomobile} className="h-6 w-6 " />
            <h3 className="hidden  md:inline-block font-bold font-sans  md:text-4xl">
              Heading Text
            </h3>
            <div className="flex items-center">
              <h3 className="truncate max-w-[200px] md:text-2xl text-xl font-bold md:ml-20 font-sans">
                Borad Game
              </h3>
              <img
                src={Dropdown ? chevronUp : chevronDown}
                className="w-3 ml-2 md:hidden"
                onClick={() => setDropdown((oldState) => !oldState)}
              />
            </div>
          </div>
          {/* Right side of Header */}
          <div className="flex space-x-4 items-center md:space-x-4 ">
            <button className="md:block hidden button">Add task</button>
            <button className="button py-1 px-3 md:hidden">+</button>
            <img src={vertical} className="cursor-pointer h-6 " />
          </div>
          {/* Dropdown menu */}
          {Dropdown && (
            <HeaderDropdown
              setBoardModel={setBoardModel}
              setDropdown={setDropdown}
            />
          )}
        </header>

        {/* // Create Model */}
        {BoardModel && <CreateModel setBoardModel={setBoardModel} />}
      </div>
    </>
  );
}

export default Header;
