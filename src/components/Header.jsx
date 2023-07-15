import { useState } from "react";
import {
  Iconboard,
  Logodark,
  Logolight,
  Logomobile,
  chevronDown,
  chevronUp,
  vertical,
} from "../assets/img";
import { useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../hooks/useDarkMode";

function Header() {
  const [Dropdown, setDropdown] = useState(false);
  const Boards = useSelector((state) => state.boards);
  const [Theme, setTheme] = useDarkMode();
  const [Color, setColor] = useState(Theme === "light" ? true : false);

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
        </header>

        {/* Dropdown menu */}
        {Dropdown && (
          <div className="py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-black">
            {/* dropdown model */}
            <div
              className="bg-white dark:bg-slate-700 shadow-md shadow-black w-full py-4 rounded-xl "
              onClick={(e) => {
                if (e.target !== e.currentTarget) {
                  return null;
                }
                setDropdown(false);
              }}
            >
              <h3 className="dark:text-gray-300 text-gray-700 font-semibold mx-4 mb-8 ">
                All Boards {Boards?.length}
              </h3>
              <div>
                {Boards.map((board, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-baseline space-x-2 px-5 py-4 ${
                        board.isActive &&
                        "bg-[#635fc7] rounded-r-full text-white mr-8"
                      }`}
                    >
                      <img src={Iconboard} className="h-4 " />
                      <p className="text-lg font-bold">{board.name}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center spacex-2 text-[#635fc7] px-5 py-4">
                <img src={Iconboard} className="h-4" />
                <p className="text-lg- font-bold"> Create new Board</p>
              </div>
              <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-slate-700 flex justify-center items-center rounded-lg">
                <img src={Logolight} />
                <Switch
                  onChange={(checked) => {
                    setTheme(Theme);
                    setColor(checked);
                  }}
                  checked={Color}
                  className={`${
                    Color ? "bg-[#635fc7]" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable Notifications</span>
                  <span
                    className={`${
                      Color ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  ></span>
                </Switch>
                <img src={Logodark} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
