import React from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";

const NoteForm = ({
  isOpen,
  formData,
  onChangeHandler,
  onSubmitHandler,
  closeForm,
  selectedNote,
}) => {
  const fadeInUpAnimation = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full px-2 md:px-8 w-full md:w-[70%] z-10"
      initial="hidden"
      animate="show"
      exit="exit"
      variants={fadeInUpAnimation}
    >
      <div className="w-full md:w-[65vw] h-auto">
        {/* Form Header */}
        <div className="bg-[#333333] w-full h-10 rounded-t-lg flex gap-1 py-4 px-3 items-center">
          <div
            onClick={closeForm}
            className="w-4 h-4 bg-[#fd5754] rounded-full cursor-pointer"
          >
            <RxCross2 className="opacity-0 text-gray-700 transition-opacity duration-300 ease-in-out hover:opacity-100" />
          </div>
          <div
            onClick={closeForm}
            className="w-4 h-4 bg-[#febb40] rounded-full cursor-pointer"
          >
            <FiMinus className="opacity-0 text-gray-700 transition-opacity duration-300 ease-in-out hover:opacity-100" />
          </div>
          <div
            onClick={closeForm}
            className="w-4 h-4 bg-[#33c848] rounded-full cursor-pointer"
          >
            <MdArrowOutward className="opacity-0 text-gray-700 transition-opacity duration-300 ease-in-out hover:opacity-100" />
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="border-2 border-[#333333] rounded-b-lg bg-black md:p-4 flex flex-col"
        >
          <div className="flex md:p-0 p-4 flex-col md:flex-row items-center justify-between md:gap-4 gap-6">
            <input
              type="text"
              name="title"
              placeholder="Title..."
              value={formData.title}
              onChange={onChangeHandler}
              className="w-full md:w-[70%] text-xl tracking-widest py-2 px-3 border-b bg-black border-[#333333] shadow-sm focus:outline-none text-center text-white"
              required
            />
            <button
              type="submit"
              className="bg-[#feed53] hover:bg-[#e6d647] shadow-2xl px-6 py-2 rounded-full w-full md:w-[25vw]"
            >
              {selectedNote !== null ? "Update Note" : "Create Note"}
            </button>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={onChangeHandler}
            className="w-full p-2 min-h-[45vh] md:min-h-[60vh] max-h-[60vh] bg-[#0f0f0f] border-t border-[#333333] focus:outline-none rounded-xl text-white mt-4"
            required
          />
        </form>
      </div>
    </motion.div>
  );
};

export default NoteForm;
