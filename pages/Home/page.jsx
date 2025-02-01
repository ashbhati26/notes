import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FiMinus } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import ShinyText from "@/components/ShinyText";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectedNote !== null) {
        // Pass the correct ID in the URL
        await axios.put(`/api?id=${notes[selectedNote]._id}`, formData);
        toast.success("Note updated successfully");
      } else {
        await axios.post("/api", formData);
        toast.success("Note created successfully");
      }

      fetchNotes();
      closeForm();
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  const openUpdateForm = (index) => {
    setSelectedNote(index);
    setFormData(notes[index]);
    setIsOpen(true);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api?id=${id}`);
      toast.success("Note deleted successfully");
      fetchNotes(); // Refresh the sidebar after deleting
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const closeForm = () => {
    setFormData({ title: "", description: "" });
    setIsOpen(false);
    setSelectedNote(null);
  };

  const fadeInUpAnimation = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: 100, transition: { duration: 0.8 } },
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("/api");
      setNotes(res.data);
    } catch (error) {
      toast.error("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="w-full h-screen flex justify-between items-center">
        <div className="flex w-[30%] p-8 h-full">
          <Sidebar
            notes={notes}
            onNoteClick={openUpdateForm}
            onDelete={deleteNote}
          />
        </div>

        <div className="fixed flex flex-col items-center justify-center gap-4 w-[70%] top-0 right-0 h-full">
          <ShinyText
            text="What are you looking for??"
            disabled={false}
            speed={3}
            className="font-krona text-4xl"
          />
        </div>

        <div
          onClick={() => setIsOpen(true)}
          className="fixed z-10 bottom-6 right-6 bg-[#012f6b] hover:bg-[#01116b]  text-white p-4 rounded-full shadow-2xl cursor-pointer"
        >
          <FaPlus size={20} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col items-center justify-center px-8 w-[90%] md:w-[70%] z-10"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={fadeInUpAnimation}
            >
              <div className="w-full md:w-[65vw] h-auto md:h-full">
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

                <form
                  onSubmit={onSubmitHandler}
                  className="border-2 border-[#333333] rounded-b-lg bg-black p-4 flex flex-col"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="title..."
                      value={formData.title}
                      onChange={onChangeHandler}
                      className="w-full md:w-[70%] text-xl tracking-widest py-2 px-3 border-b bg-black border-[#333333] shadow-sm focus:outline-none text-center text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-[#e76f51] hover:bg-[#da6041] shadow-2xl text-white px-6 py-2 rounded-full w-full md:w-auto"
                    >
                      {selectedNote !== null ? "Update Note" : "Create Note"}
                    </button>
                  </div>

                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={onChangeHandler}
                    className="w-full p-2 min-h-[40vh] md:min-h-[60vh] max-h-[60vh] bg-[#0f0f0f] border-t border-[#333333] focus:outline-none rounded-xl text-white mt-4"
                    required
                  />
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;
