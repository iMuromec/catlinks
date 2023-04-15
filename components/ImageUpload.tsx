import ImageWithFallback from "@/components/ImageWithFallback";

const ImageUpload = ({ userImage, setUserImage, setShowSaveMessage }) => {
  const handleChange = async (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);

    // get signedUrl
    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ name: file.name, type: file.type }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    // upload file from client
    const storageRes = await fetch(data.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Access-Control-Request-Method": "PUT",
      },
      body: file,
    });

    if (storageRes.ok) {
      setUserImage(previewUrl);
      setShowSaveMessage(true);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
      });
      if (res.ok) {
        setShowSaveMessage(true);
        setUserImage("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form>
      <label
        htmlFor="file"
        className="w-32 h-32 rounded-full cursor-pointer flex-row items-center my-2 justify-center mx-auto flex bg-gray-200 hover:bg-gray-300"
      >
        {userImage ? (
          <ImageWithFallback
            width={128}
            height={128}
            src={userImage}
            className="w-32 h-32 object-cover rounded-full cursor-pointer"
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
