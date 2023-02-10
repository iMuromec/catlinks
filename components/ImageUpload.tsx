import { useState } from "react";
import Image from "next/image";

const ImageUpload = ({ user, setUser, setShowSaveMessage }) => {
  const [previewUrl, setPreviewUrl] = useState(user.image);

  const handleChange = async (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);

    // get signedUrl
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ name: file.name, type: file.type }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const signedUrl = await res.json();

    // upload file from client
    const storageRes = await fetch(signedUrl.url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Access-Control-Request-Method": "PUT",
      },
      body: file,
    });

    if (storageRes.ok) {
      setShowSaveMessage(true);
    }
  };

  const handleDelete = async () => {
    setPreviewUrl("");

    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
      });
      if (res.ok) {
        setShowSaveMessage(true);
        setUser({
          ...user,
          image: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <label
        htmlFor="file"
        className="w-32 h-32 rounded-full flex-row items-center my-2 justify-center mx-auto flex bg-gray-200 hover:bg-gray-300"
      >
        {previewUrl ? (
          <Image
            width={128}
            height={128}
            src={previewUrl}
            className="w-32 h-32 object-cover rounded-full"
            alt="preview"
          />
        ) : (
          "Добавить фото"
        )}
      </label>
      <div className="flex flex-row gap-1">
        <label
          htmlFor="file"
          className="underline decoration-dashed cursor-pointer"
        >
          Изменить
        </label>
        /
        <div
          onClick={handleDelete}
          className="underline decoration-dashed text-gray-500 cursor-pointer "
        >
          Удалить
        </div>
      </div>
      <input type="file" id="file" className="hidden" onChange={handleChange} />
    </form>
  );
};

export default ImageUpload;
