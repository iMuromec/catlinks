import Head from "next/head";
import useSWR from "swr";

import LinkEditor from "@/components/LinkEditor";
import UserInfo from "@/components/UserInfo";
import AddNewLink from "@/components/AddNewLink";
import UserInfoSkeleton from "@/components/UserInfoSkeleton";

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

function EditPage() {
  const { data: links, isLoading, mutate } = useSWR("/api/links", fetcher);

  if (isLoading) return <UserInfoSkeleton />;

  return (
    <>
      <Head>
        <title>Профиль</title>
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
