import { createId } from "@paralleldrive/cuid2";

export default function AddNewLink({ links, setLinks }) {
  const handleAddNewLink = async () => {
    const newLink = {
      id: createId(),
      title: "",
      url: "",
      active: true,
    };
    setLinks([newLink, ...links]);

    await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLink),
    });
  };

  return (
    <div className="mt-5 block">
      <button
        className="bg-blue-500 add-new-link-button hover:bg-blue-700 text-white py-2 px-4"
        onClick={handleAddNewLink}
      >
        Добавить ссылку
      </button>
    </div>
  );
}
