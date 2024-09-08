import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import { StateContext } from "../context/StateContext";
import { addWallet, getWallets } from "../api/wallet";
import { addCategory, getCategory } from "../api/category";
import Loading from "./Loading";

const AddMiniCard = ({ type, closeCallback }) => {
  const { setCategory, setWallet, wallet } = useContext(StateContext);
  const [localname, setLocalName] = React.useState("");
  const [localWallet, setLocalWallet] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddWollet = async () => {
    setIsLoading(true);
    await addWallet({ name: localname }).then((res) => {
      getWallets().then((data) => {
        setWallet(data.data);
        closeCallback();
        setIsLoading(false);
      });
    });
  };
  const handleAddCategory = async () => {
    setIsLoading(true);
    await addCategory({ name: localname, wallet: localWallet }).then((res) => {
      getCategory().then((data) => {
        setCategory(data.data);
        setIsLoading(false);
        closeCallback();
      });
    });
  };

  return (
    <div className="bg-slate-800 relative  w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <div
        className={`flex justify-between h-10 ${
          type === "category" ? "border-b border-slate-700" : null
        } `}
      >
        <input
          type="text"
          value={localname}
          placeholder={
            type === "wallet" ? "Add Wallet name..." : "Add Category name..."
          }
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
          className={`bg-transparent h-full text-slate-300 ${
            isLoading ? "p-2" : "p-3"
          } aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-green-600 hover:text-red-100 transition-all`}
        >
          {isLoading ? <Loading /> : <CheckIcon />}
        </button>
      </div>
      {type === "category" ? (
        <select
          name="wallet"
          id="wallet"
          disabled={wallet.length === 0}
          value={localWallet}
          onChange={(e) => setLocalWallet(e.target.value)}
          className="bg-transparent px-3 w-full disabled:bg-slate-600 disabled:w-20 h-10"
        >
          <option disabled value="">
            Select an option
          </option>
          {wallet.map((item, i) => (
            <option key={i} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      ) : null}
    </div>
  );
};

export default AddMiniCard;
