import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useContext } from "react";
import { AccountContext } from "@/components/Account-Components/AccountProp";
import { Button } from "@/components/ui/button";
import { useDeleteAccountMutation } from "@/store/accounts/accountsApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteType {
  openModal: boolean;
  onClose: (openModal: boolean) => void;
  accountType: string;
}

const DeleteModal = ({ openModal, onClose, accountType }: DeleteType) => {
  const accountNumber = useContext(AccountContext)!;
  const userId = useSelector(getCurrentUser)!;

  const router = useRouter();

  const [deleteAccount, { isLoading, isSuccess }] = useDeleteAccountMutation();

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      await deleteAccount({ userId, accountType, accountNumber }).unwrap();
      toast("Account deleted sucessfully", {
        description: `Account ${accountNumber} has been sucessfully deleted`,
        duration: 5000,
      });
      onClose(false);
      router.push("/home");
    } catch (error: any) {
      toast("Error deleting the account", {
        description: `${error?.data?.message}` || "Something went wrong",
        duration: 5000,
      });
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          ARE YOU SURE YOU WANT TO DELETE THE ACCOUNT {accountNumber}
        </DialogHeader>

        <Button
          onClick={handleDelete}
          className="bg-red-600 text-white cursor-pointer"
        >
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
        <Button
          onClick={() => onClose(false)}
          disabled={isLoading}
          className="bg-blue-600 cursor-pointer"
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
