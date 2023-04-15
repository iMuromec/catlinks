import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import ImageUpload from "@/components/ImageUpload";
import SaveMessage from "@/components/SaveMessage";
import UserInfoStatic from "@/components/UserInfoStatic";
import { SaveIcon, EditIcon, ExternalLinkIcon } from "@/components/Icons";

const UserInfo = ({ editing = false }) => {
  const [urlEdit, setUrlEdit] = useState(false);
  const [openName, setOpenName] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [inputError, setInputError] = useState("");
  const [inputSuccess, setInputSuccess] = useState("");
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const [name, setName] = useState("");
  const [userUrl, setUserUrl] = useState("");
  const [userImage, setUserImage] = useState("");
  const [description, setDescription] = useState("");
  const [initUrl, setInitUrl] = useState("");

  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setUserUrl(session.user.url);
      setInitUrl(session.user.url);
      setUserImage(session.user.image);

      if (session.user?.name) {
        setName(session.user.name);
        setOpenName(true);
      }

      if (session.user?.description) {
        setDescription(session.user?.description);
        setOpenDescription(true);
      }
    }
  }, [session]);

  if (status === "loading") return;

  const handleUserUrlChange = (e) => {
    const link = e.target.value.trim();
    if (initUrl === link) return;

    setUserUrl(link);

    const regexThreeChar = /^.{3,}$/;
    const regexAllowedChar = /^[a-zA-Z0-9_-]+$/;

    if (!link) {
      setInputError("Пожалуйста, укажите хоть что-то");
    } else if (!regexAllowedChar.test(link)) {
      setInputError(
        "Ссылка может содержать только латинские буквы, числа, знаки (_) и (-)"
      );
    } else if (!regexThreeChar.test(link)) {
      setInputError("Ссылка должна быть от 3 знаков");
    } else {
      validateUrl(link);
      setInputError("");
    }
  };

  const handleSaveUserInfo = async () => {
    const res = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, url: userUrl, description }),
    });

    console.log(res);

    if (res.ok) {
      setShowSaveMessage(true);
      setInitUrl(userUrl);
    }
  };

  const handleSaveIcon = () => {
    if (!inputError) {
      handleSaveUserInfo();
      setUrlEdit(!urlEdit);
      setInputSuccess("");
    }
  };

  const validateUrl = async (url: string) => {
    const res = await fetch(`/api/user?userUrl=${url}`);

    if (res.ok) {
      setInputError("К сожалению, cсылка занята");
    } else {
      setInputSuccess("Ссылка свободна");
    }
  };

  return (
    <div className="flex flex-col items-center mb-5 max-w-[500px] w-full text-center">
      {editing ? (
        <>
          <ImageUpload
            userImage={userImage}
            setUserImage={setUserImage}
            setShowSaveMessage={setShowSaveMessage}
          />

          <div className="w-full mt-5 py-2 flex items-center flex-row">
            <div className="text-left bg-transparent w-[150px] py-2 text-gray-900 ">
              https://catlinks.ru/
            </div>
            <input
              type="text"
              name="url"
              value={userUrl}
              onChange={handleUserUrlChange}
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
              <div
                className="w-8 pl-2 cursor-pointer"
                onClick={() => setUrlEdit(!urlEdit)}
              >
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
            href={`/${userUrl}`}
          >
            <div>Открыть страницу</div>
            <div className="w-2 flex flex-row">
              <ExternalLinkIcon />
            </div>
          </a>

          {openName ? (
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
                value={name}
                onChange={(e) => setName(e.target.value.trim())}
                className="w-full text-xl block font-bold text-gray-900 mt-1 text-center bg-white p-2 rounded-lg shadow-md"
                onBlur={handleSaveUserInfo}
              />
            </div>
          ) : (
            <div
              onClick={() => setOpenName(true)}
              className="w-full mt-1 py-2 underline decoration-dashed cursor-pointer"
            >
              Добавить имя
            </div>
          )}
          {openDescription ? (
            <div className="w-full mt-1 py-2">
              <label
                htmlFor="description"
                className="text-left block text-xs text-gray-900"
              >
                Описание
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                onBlur={handleSaveUserInfo}
                className="mt-1 text-gray-700 w-full text-center bg-white p-2 rounded-lg shadow-md "
              />
            </div>
          ) : (
            <div
              onClick={() => setOpenDescription(true)}
              className="w-full mt-1 py-2 underline decoration-dashed cursor-pointer"
            >
              Добавить описание
            </div>
          )}
        </>
      ) : (
        <UserInfoStatic
          name={name}
          userImage={userImage}
          description={description}
        />
      )}
      {showSaveMessage && (
        <SaveMessage setShowSaveMessage={setShowSaveMessage} />
      )}
    </div>
  );
};

export default UserInfo;
