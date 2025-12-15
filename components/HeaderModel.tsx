"use client";
import { useGetUsersQuery, selectUserById } from "@/store/user/userApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState } from "@/store/store";

interface HeaderType {
  open: boolean;
  onClose: (open: boolean) => void;
}

const HeaderModel = ({ open, onClose }: HeaderType) => {
  const { isLoading, isError } = useGetUsersQuery();
  const user = useSelector(getCurrentUser)!;

  const userData = useSelector((state: RootState) =>
    selectUserById(state, user)
  );

  if (!userData) return "";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>About your account</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label>
            First Name:
            <input
              value={userData.firstName}
              readOnly
              className="border p-1 rounded w-full"
            />
          </label>

          <label>
            Last Name:
            <input
              value={userData.lastName}
              readOnly
              className="border p-1 rounded w-full"
            />
          </label>

          <label>
            Email:
            <input
              value={userData.email}
              readOnly
              className="border p-1 rounded w-full"
            />
          </label>

          <label>
            Username:
            <input
              value={userData.userName}
              readOnly
              className="border p-1 rounded w-full"
            />
          </label>

          <p>Created At: {new Date(userData.createdAt).toLocaleString()}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HeaderModel;
