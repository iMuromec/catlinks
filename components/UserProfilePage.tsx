import { useState } from "react";
import Head from "next/head";
import LinkEditor from "@components/LinkEditor";
import UserInfo from "@components/UserInfo";
import AddNewLink from "@components/AddNewLink";

export default function UserProfilePage({ user, setUser }) {
  const [links, setLinks] = useState(user.links);
  const title = user.name
    ? `${user.name} | Профиль в Cat Links`
    : "Профиль в Cat Links";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col items-center max-w-[800px] px-3 mx-auto">
        <UserInfo user={user} setUser={setUser} editing={true} />
        <AddNewLink links={links} setLinks={setLinks} />
        <div className="mt-5 w-full">
          {links.map((link) => (
            <LinkEditor
              key={link.id}
              link={link}
              links={links}
              setLinks={setLinks}
            />
          ))}
        </div>
      </div>
    </>
  );
}
