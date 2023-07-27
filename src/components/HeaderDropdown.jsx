import { useState } from "react";
import { useSelector } from "react-redux";
import useDarkMode from "../hooks/useDarkMode";
import { Iconboard, Icondark, Iconlight } from "../assets/img";
import { Switch } from "@headlessui/react";

// eslint-disable-next-line react/prop-types
function HeaderDropdown({ setDropdown, setBoardModel }) {
  const Boards = useSelector((state) => state.boards);
  const [Theme, setTheme] = useDarkMode();

  const [Color, setColor] = useState(Theme === "light" ? true : false);

  return (
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
        <div
          onClick={() => {
            setBoardModel(true);
            setDropdown(false);
          }}
          className="flex items-center spacex-2 text-[#635fc7] px-5 py-4"
        >
          <img src={Iconboard} className="h-4" />
          <p className="text-lg- font-bold"> Create new Board</p>
        </div>
        <div className="mx-2 p-4 space-x-2 bg-slate-100 dark:bg-slate-700 flex justify-center items-center rounded-lg">
          <img src={Iconlight} />
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
          <img src={Icondark} />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropdown;
