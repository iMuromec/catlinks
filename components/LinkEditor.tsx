import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteConfirm from "@components/DeleteConfirm";
import SaveMessage from "@components/SaveMessage";

const LinkEditor = ({ link, links, setLinks }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [active, setActive] = useState(link.active);

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleArchiveLink = async (e) => {
    setActive(!active);
    const res = await fetch(`/api/links/${link.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: e.target.checked }),
    });

    if (res.ok) {
      setShowSaveMessage(true);
    }
  };

  const handleDeleteLink = async () => {
    setShowDeleteConfirm(false);
    setLinks([...links.filter((l) => l.id != link.id)]);

    await fetch(`/api/links/${link.id}`, {
      method: "DELETE",
    });
  };

  const handleSaveLink = async () => {
    const res = await fetch(`/api/links/${link.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        url,
        active,
      }),
    });

    if (res.ok) {
      setShowSaveMessage(true);
    }
  };

  return (
    <div className="flex justify-between w-full items-center py-2 gap-2">
      <div
        className={`flex flex-col w-full gap-1 bg-white p-2 rounded-lg shadow-md ${
          !active && "archived"
        }`}
      >
        <input
          type="text"
          className="p-2 border-b border-gray-300"
          value={title}
          placeholder="Название"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSaveLink}
        />
        <input
          type="text"
          className="p-2"
          value={url}
          placeholder="Ссылка"
          onChange={(e) => setUrl(e.target.value)}
          onBlur={handleSaveLink}
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={active}
            readOnly
            onClick={handleArchiveLink}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>

        <button
          className=" text-red-400 hover:text-red-800 flex items-end"
          onClick={() => setShowDeleteConfirm(true)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {showSaveMessage && (
        <SaveMessage setShowSaveMessage={setShowSaveMessage} />
      )}
      {showDeleteConfirm && (
        <DeleteConfirm
          setShowDeleteConfirm={setShowDeleteConfirm}
          handleDelete={handleDeleteLink}
        />
      )}
    </div>
  );
};

export default LinkEditor;
