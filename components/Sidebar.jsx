import React from "react";
import SpotlightCard from "./SpotlightCard";
import { MdDeleteOutline } from "react-icons/md";

const Sidebar = (props) => {
  return (
    <div className="w-full h-full bg-[#1b1c1e] rounded-2xl shadow-xl text-gray-300">
      <SpotlightCard className="w-full h-full" spotlightColor="#1b4332">
        <div className="w-full h-full flex flex-col">
          <h2 className="font-krona text-3xl text-center">Your Notes</h2>

          <div className="w-full bg-[#012f6b] h-[1px] mt-5 rounded-full"></div>

          <div className="h-full w-full px-2 mt-2 flex flex-col items-center overflow-auto">
            {props.notes.map((note, index) => (
              <div
                key={note._id}
                className="w-full flex items-center justify-between py-3 px-2 rounded-xl hover:bg-[#c80f2e] ease-in-out duration-400 transition-all cursor-pointer"
                onClick={() => props.onNoteClick(index)}
              >
                <h4 className="text-lg text-white font-semibold">
                  {note.title}{" "}
                </h4>
                <MdDeleteOutline
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the note
                    props.onDelete(note._id);
                  }}
                  className="text-xl hover:scale-125 ease-in-out duration-400 transition-all cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};

export default Sidebar;
