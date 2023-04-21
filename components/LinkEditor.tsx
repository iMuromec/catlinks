import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import DeleteConfirm from "@/components/DeleteConfirm";
import SaveMessage from "@/components/SaveMessage";

const LinkEditor = ({ index, link, links, mutate }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [active, setActive] = useState(link.active);

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChangeLink = async (click?: any) => {
    let isActive = active;
    if (click === "active") {
      isActive = !active;
      setActive(isActive);
    }
    const res = await fetch(`/api/links?id=${link.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        url,
        active: isActive,
        position: link.position,
      }),
    });

    if (res.ok) {
      setShowSaveMessage(true);
    }
  };

  const moveItem = async (direction) => {
    const newIndex = index - direction;

    if (newIndex < 0 || newIndex >= links.length) {
      return;
    }

    const updatedLinks = links.filter((_, i) => i !== index);
    updatedLinks.splice(newIndex, 0, link);
    updatedLinks.reverse();

    const newUpdatedLinks = updatedLinks.map((link, index) => ({
      ...link,
      position: index,
    }));
    newUpdatedLinks.reverse();

    mutate(newUpdatedLinks, { revalidate: false });

    const res = await fetch(`/api/links`, {
      method: "PUT",
      body: JSON.stringify(newUpdatedLinks),
    });

    if (res.ok) {
      setShowSaveMessage(true);
    }
  };

  const handleDeleteLink = async () => {
    setShowDeleteConfirm(false);
    mutate([...links.filter((l) => l.id != link.id)], { revalidate: false });

    await fetch(`/api/links?id=${link.id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="flex justify-between w-full items-center py-2 gap-2">
      <div className="flex flex-col gap-3">
        {index !== 0 && (
          <div
            onClick={() => moveItem(1)}
            className="cursor-pointer p-2 border border-transparent hover:border-gray-300 text-gray-600 rounded-md"
          >
            ↑
          </div>
        )}
        {index !== links.length - 1 && (
          <div
            onClick={() => moveItem(-1)}
            className="cursor-pointer p-2 border border-transparent hover:border-gray-300 text-gray-600 rounded-md"
          >
            ↓
          </div>
        )}
      </div>
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
          onBlur={handleChangeLink}
        />
        <input
          type="text"
          className="p-2"
          value={url}
          placeholder="Ссылка"
          onChange={(e) => setUrl(e.target.value)}
          onBlur={handleChangeLink}
        />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={active}
            readOnly
            onClick={() => {
              handleChangeLink("active");
            }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>

        <button
          name="Удалить ссылку"
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
