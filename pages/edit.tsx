import Head from "next/head";
import useSWR from "swr";
import { signIn, useSession } from "next-auth/react";

import LinkEditor from "@/components/LinkEditor";
import UserInfo from "@/components/UserInfo";
import AddNewLink from "@/components/AddNewLink";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";
import { site } from "@/config/site";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

function EditPage() {
  const { data: links, isLoading, mutate } = useSWR("/api/links", fetcher);
  const { data: session, status } = useSession();

  if (isLoading || status === "loading") {
    return <UserInfoSkeleton />;
  }

  if (!session) {
    return signIn(null, { callbackUrl: "/edit" });
  }

  return (
    <>
      <Head>
        <title>{`Профиль — ${site.name}`}</title>
      </Head>
      <div className="flex flex-col items-center max-w-[800px] px-3 mx-auto">
        <UserInfo editing={true} />
        <AddNewLink links={links} mutate={mutate} />
        <div className="mt-5 w-full">
          {links?.map((link) => (
            <LinkEditor
              key={link.id}
              link={link}
              links={links}
              mutate={mutate}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default EditPage;
