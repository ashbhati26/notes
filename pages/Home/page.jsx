import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Sidebar from "@/components/Sidebar";
import { FaPlus, FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import ShinyText from "@/components/ShinyText";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import NoteForm from "@/components/NoteForm";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((form) => ({ ...form, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (selectedNote !== null) {
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
      fetchNotes();
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const closeForm = () => {
    setFormData({ title: "", description: "" });
    setIsOpen(false);
    setSelectedNote(null);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    gsap.to(sidebarRef.current, {
      x: isSidebarOpen ? 0 : "-100%",
      duration: 1,
      ease: "power2.out",
    });
  }, [isSidebarOpen]);

  return (
    <>
      <ToastContainer theme="dark" />
      <div className="w-full h-screen flex justify-between items-center">
        <div className="md:flex md:w-[30%] md:p-8 h-full">
          <div
            ref={sidebarRef}
            className="fixed z-20 md:relative left-0 top-0 h-full md:w-[25vw] w-full md:rounded-2xl bg-gray-900 text-white"
          >
            <Sidebar
              notes={notes}
              onNoteClick={openUpdateForm}
              onDelete={deleteNote}
            />
          </div>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-20 p-3 bg-[#03045e] text-white rounded-full md:hidden"
        >
          {isSidebarOpen ? <RxCross2 size={24} /> : <FaBars size={24} />}
        </button>

        <div className="fixed flex flex-col items-center justify-center gap-4 md:w-[70%] top-0 right-0 h-full w-full">
          <ShinyText
            text="What are you looking for??"
            disabled={false}
            speed={3}
            className="font-krona md:text-4xl text-2xl text-center"
          />
        </div>

        <div
          onClick={() => setIsOpen(true)}
          className="fixed z-10 bottom-6 right-6 bg-[#feed53] hover:bg-[#e6d647] p-4 rounded-full shadow-2xl cursor-pointer"
        >
          <FaPlus size={20} />
        </div>

        <AnimatePresence>
          {isOpen && (
            <NoteForm
              isOpen={isOpen}
              formData={formData}
              onChangeHandler={onChangeHandler}
              onSubmitHandler={onSubmitHandler}
              closeForm={closeForm}
              selectedNote={selectedNote}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Page;
