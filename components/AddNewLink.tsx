export default function AddNewLink({ links, mutate }) {
  const handleAddNewLink = async () => {
    const res = await fetch("/api/links", {
      method: "POST",
    });

    if (res.ok) {
      const newLink = await res.json();
      mutate([newLink, ...links], { revalidate: false });
    }
  };

  return (
    <div className="mt-5 block">
      <button
        name="Добавить ссылку"
        className="bg-blue-500 add-new-link-button hover:bg-blue-700 text-white py-2 px-4"
        onClick={handleAddNewLink}
      >
        Добавить ссылку
      </button>
    </div>
  );
}
