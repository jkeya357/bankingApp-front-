import { userDetails } from "@/types/UserInfo";

interface UserInfoProp {
  user: userDetails;
}

const UserInfo = ({ user }: UserInfoProp) => {
  return (
    <div className="flex flex-col space-y-1">
      <h1 className="text-3xl font-bold text-white">
        {user?.firstName} {user?.lastName}
      </h1>
    </div>
  );
};

export default UserInfo;
