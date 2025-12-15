import { userDetails } from "@/types/UserInfo";

interface UserInfoProp {
  user: userDetails;
}

const UserInfo = ({ user }: UserInfoProp) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-400 mt-1">
        Joined {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserInfo;
