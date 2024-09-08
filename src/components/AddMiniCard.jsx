import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { addWallet, getWallets } from "../api/wallet";
import { addCategory, getCategory } from "../api/category";

const AddMiniCard = ({ type, closeCallback }) => {
  const { setCategory, setWallet } = useContext(StateContext);
  const [localname, setLocalName] = React.useState("");

  const handleAddWollet = async () => {
    console.log("Add Wallet", localname);
    await addWallet({ name: localname }).then((res) => {
      getWallets().then((data) => {
        console.log("data in add wallet", data);
        setWallet(data.data);
        closeCallback();
      });
    });
  };
  const handleAddCategory = async () => {
    console.log("Add Category", localname);
    await addCategory({ name: localname }).then((res) => {
      getCategory().then((data) => {
        console.log("data in add category", data);
        setCategory(data.data);
        closeCallback();
      });
    });
  };

  return (
    <div className="bg-slate-800 relative flex h-10 justify-between w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <input
        type="text"
        value={localname}
        placeholder={type === "wallet" ? "Add Wallet..." : "Add Category..."}
        onChange={(e) => setLocalName(e.target.value)}
        className={`bg-transparent w-full p-3 text-xl font-medium text-ellipsis`}
      />
      <button
        onClick={closeCallback}
        className={`bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-red-600 hover:text-red-100 transition-all`}
      >
        <XMarkIcon />
      </button>
      <button
        onClick={type === "wallet" ? handleAddWollet : handleAddCategory}
        disabled={localname.length === 0}
        className={`bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-green-600 hover:text-red-100 transition-all`}
      >
        <CheckIcon />
      </button>
    </div>
  );
};

export default AddMiniCard;
