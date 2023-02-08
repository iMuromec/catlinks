import { useEffect, useContext } from "react";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { UserContext } from "@components/UserContext";
import UserProfilePage from "@components/UserProfilePage";
import UserInfoSkeleton from "@components/UserInfoSkeleton";

function EditPage() {
  const { user, setUser, loading, unauthorized, loggedOut } =
    useContext(UserContext);

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
    if (unauthorized) {
      signIn();
    }
  }, [loggedOut, user, unauthorized]);

  if (loading || unauthorized || loggedOut) return <UserInfoSkeleton />;

  return <UserProfilePage user={user} setUser={setUser} />;
}

export default EditPage;
