const UserInfoSkeleton = () => {
  return (
    <div className="flex flex-col items-center max-w-[800px] px-3 mx-auto">
      <div className="flex flex-col gap-2 animate-pulse items-center mb-5 max-w-[500px] w-full text-center">
        <div className="w-32 bg-gray-300 h-32 object-cover rounded-full my-2"></div>
        <div className="h-10 w-full outline-none text-gray-900 bg-gray-300 p-2 shadow-sm rounded-lg"></div>
        <div className="h-20 w-full outline-none text-gray-900 bg-gray-300 p-2 shadow-sm rounded-lg"></div>
      </div>
    </div>
  );
};

export default UserInfoSkeleton;
