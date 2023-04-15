import Image from "next/image";

interface UserInfoStaticProps {
  userImage?: string;
  name?: string;
  description?: string;
}
const UserInfoStatic = ({
  userImage,
  name,
  description,
}: UserInfoStaticProps) => {
  return (
    <div className="flex flex-col items-center mb-5 max-w-[500px] w-full text-center">
      <>
        {userImage && (
          <Image
            width={128}
            height={128}
            src={userImage}
            className="w-32 h-32 object-cover rounded-full my-2"
            alt={name || "Avatat"}
          />
        )}

        {name && (
          <h1 className="text-xl font-bold text-gray-900 mt-5">{name}</h1>
        )}
        {description && <div className="mt-2 text-gray-700">{description}</div>}
      </>
    </div>
  );
};

export default UserInfoStatic;
