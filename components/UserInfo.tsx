import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ImageUpload from "@components/ImageUpload";
import SaveMessage from "@components/SaveMessage";
import { SaveIcon, EditIcon, ExternalLinkIcon } from "@components/Icons";

const UserInfo = ({ user, setUser = null, editing = false }) => {
  const firstUpdate = useRef(true);
  const [urlEdit, setUrlEdit] = useState(false);
  const [inputError, setInputError] = useState("");
  const [inputSuccess, setInputSuccess] = useState("");
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [name, setName] = useState(Boolean(user.name));
  const [description, setDescription] = useState(Boolean(user.description));
  const [savedUrl, setSavedUrl] = useState(user.url);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    handleUsernameChange();
  }, [user.url]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUsernameChange = () => {
    const username = user.url.trim();
    if (savedUrl === username) return;

    const regexThreeChar = /^.{3,}$/;
    const regexAllowedChar = /^[a-zA-Z0-9_-]+$/;

    if (!username) {
      setInputError("Пожалуйста, укажите хоть что-то");
    } else if (!regexAllowedChar.test(username)) {
      console.log(username);
      setInputError(
        "Ссылка может содержать только латинские буквы, числа, знаки (_) и (-)"
      );
    } else if (!regexThreeChar.test(username)) {
      setInputError("Ссылка должна быть от 3 знаков");
    } else {
      validateUrl(username);
      setInputError("");
    }
  };

  const handleSaveUserInfo = async () => {
    const res = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      setShowSaveMessage(true);
      setSavedUrl(user.url);
    }
  };

  const handleSaveIcon = () => {
    if (!inputError) {
      handleSaveUserInfo();
      setUrlEdit(!urlEdit);
      setInputSuccess("");
    }
  };

  const handleEditIcon = () => {
    setUrlEdit(!urlEdit);
  };

  const validateUrl = async (username) => {
    const res = await fetch(`/api/user/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: username }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status) {
        setInputSuccess(data.message);
      } else {
        setInputError(data.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mb-5 max-w-[500px] w-full text-center">
      {editing ? (
        <>
          <ImageUpload
            user={user}
            setUser={setUser}
            setShowSaveMessage={setShowSaveMessage}
          />

          <div className="w-full mt-5 py-2 flex items-center flex-row">
            <div className="text-left bg-transparent w-[150px] py-2 text-gray-900 ">
              https://catlinks.ru/
            </div>
            <input
              type="text"
              name="url"
              value={user.url}
              onChange={handleChange}
              className={`border 
              ${inputSuccess && !inputError && "border-green-500"}
              ${!urlEdit && "disabled:bg-slate-50 disabled:text-slate-500"} ${
                inputError && "border-red-500"
              } 
               w-full outline-none text-gray-900 bg-white p-2 shadow-sm rounded-lg`}
              disabled={!urlEdit}
            />

            {urlEdit ? (
              <div
                className={`w-8 pl-2  ${
                  inputError ? "fill-gray-300" : "cursor-pointer"
                }`}
                onClick={handleSaveIcon}
              >
                <SaveIcon />
              </div>
            ) : (
              <div className="w-8 pl-2 cursor-pointer" onClick={handleEditIcon}>
                <EditIcon />
              </div>
            )}
          </div>

          {inputError && (
            <div className="text-red-500 text-sm">{inputError}</div>
          )}
          <a
            className="text-right self-end underline text-sm flex flex-row gap-1"
            target="_blank"
            href={`/${user.url}`}
          >
            <div>Открыть страницу</div>
            <div className="w-2 flex flex-row">
              <ExternalLinkIcon />
            </div>
          </a>

          {name ? (
            <div className="w-full mt-1 py-2">
              <label
                htmlFor="name"
                className="text-left block text-xs text-gray-900"
              >
                Имя
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full text-xl block font-bold text-gray-900 mt-1 text-center bg-white p-2 rounded-lg shadow-md"
                onBlur={handleSaveUserInfo}
              />
            </div>
          ) : (
            <div
              onClick={() => setName(true)}
              className="w-full mt-1 py-2 underline decoration-dashed cursor-pointer"
            >
              Добавить имя
            </div>
          )}
          {description ? (
            <div className="w-full mt-1 py-2">
              <label
                htmlFor="description"
                className="text-left block text-xs text-gray-900"
              >
                Описание
              </label>
              <textarea
                name="description"
                value={user.description}
                onChange={handleChange}
                rows={3}
                onBlur={handleSaveUserInfo}
                className="mt-1 text-gray-700 w-full text-center bg-white p-2 rounded-lg shadow-md "
              />
            </div>
          ) : (
            <div
              onClick={() => setDescription(true)}
              className="w-full mt-1 py-2 underline decoration-dashed cursor-pointer"
            >
              Добавить описание
            </div>
          )}
        </>
      ) : (
        <>
          {user.image && (
            <Image
              width={128}
              height={128}
              src={user.image}
              className="w-32 h-32 object-cover rounded-full my-2"
              alt={user?.name || "Avatat"}
            />
          )}

          {name && (
            <h1 className="text-xl font-bold text-gray-900 mt-5">
              {user.name}
            </h1>
          )}
          {description && (
            <div className="mt-2 text-gray-700">{user.description}</div>
          )}
        </>
      )}
      {showSaveMessage && (
        <SaveMessage setShowSaveMessage={setShowSaveMessage} />
      )}
    </div>
  );
};

export default UserInfo;
