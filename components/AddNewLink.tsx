import { useState } from "react";

import { Spin } from "./Icons";

export default function AddNewLink({ links, mutate }) {
  const [loading, setLoading] = useState(false);

  const handleAddNewLink = async () => {
    setLoading(true);
    const res = await fetch("/api/links", {
      method: "POST",
    });

    if (res.ok) {
      const newLink = await res.json();
      mutate([newLink, ...links], { revalidate: false });
    }
    setLoading(false);
  };

  return (
    <div className="mt-5 block">
      <button
        name="Добавить ссылку"
        className="bg-blue-500 add-new-link-button hover:bg-blue-700 text-white"
        onClick={handleAddNewLink}
      >
        {loading ? (
          <div className="py-2 px-4 flex justify-center cursor-not-allowed">
            <Spin />
          </div>
        ) : (
          <div className="py-2 px-4 flex justify-center">Добавить ссылку</div>
        )}
      </button>
    </div>
  );
}
