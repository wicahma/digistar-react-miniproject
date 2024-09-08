import {
  CheckIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/24/solid";
import React, { useContext, useState } from "react";
import { deleteCategory, getCategory, updateCategory } from "../api/category";
import { StateContext } from "../context/StateContext";
import { deleteWallet, getWallets, updateWallet } from "../api/wallet";
import Loading from "./Loading";

const MiniCard = ({ name, uuid, type, handleCardClick }) => {
  const { category, setCategory, item, setItem, wallet, setWallet } =
    useContext(StateContext);
  const [localname, setLocalName] = useState(name);
  const [localWallet, setLocalWallet] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState({
    delete: false,
    update: false,
  });

  const handleOnEdit = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    if (isEditing) {
      setIsLoading((p) => ({ ...p, update: true }));
      switch (type) {
        case "category":
          updateCategory({ id: uuid, name: localname }).then((res) => {
            getCategory().then((data) => {
              setCategory(data.data);
              setIsLoading((p) => ({ ...p, update: false }));
            });
          });
          break;
        case "wallet":
          updateWallet({ id: uuid, name: localname }).then((res) => {
            getWallets().then((data) => {
              setWallet(data.data);
              setIsLoading((p) => ({ ...p, update: false }));
            });
          });
          break;
        default:
          alert("Unknown type!");
          break;
      }
    }
  };

  const handleOnDelete = (e) => {
    e.stopPropagation();
    setIsDeleting(!isDeleting);
    if (isDeleting) {
      setIsLoading((p) => ({ ...p, delete: true }));
      switch (type) {
        case "category":
          deleteCategory(uuid).then((res) => {
            getCategory().then((data) => {
              setCategory(data.data);
              setIsLoading((p) => ({ ...p, delete: false }));
            });
          });
          break;
        case "wallet":
          deleteWallet(uuid).then((res) => {
            getWallets().then((data) => {
              setWallet(data.data);
              setIsLoading((p) => ({ ...p, delete: false }));
            });
          });
          break;
        default:
          alert("Unknown type!");
          break;
      }
    }
  };
  return (
    <div className="bg-slate-800 relative w-full rounded-lg text-gray-400 text-xl overflow-hidden">
      <div
        className={`flex justify-between h-10 ${
          type === "category" && isEditing ? "border-b border-slate-700" : null
        }`}
      >
        <input
          type="text"
          value={localname}
          onChange={(e) => setLocalName(e.target.value)}
          disabled={!isEditing}
          className={`bg-transparent w-full p-3 text-xl font-medium text-ellipsis ${
            isEditing ? "text-gray-400" : "text-gray-300"
          }`}
        />
        <button
          onClick={handleCardClick}
          disabled={isDeleting || isEditing}
          className={`bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent hover:bg-gray-600 hover:text-gray-100 transition-all`}
        >
          <EyeIcon />
        </button>
        <button
          onClick={handleOnEdit}
          disabled={isDeleting}
          className={`bg-transparent h-full text-slate-300 ${
            isLoading.update ? "p-2" : "p-3"
          } aspect-square disabled:text-slate-700 disabled:bg-transparent ${
            isEditing ? "hover:bg-green-600" : "hover:bg-orange-400"
          } hover:text-red-100 transition-all`}
        >
          {isLoading.update ? (
            <Loading />
          ) : isEditing ? (
            <CheckIcon />
          ) : (
            <PencilIcon />
          )}
        </button>

        {isDeleting ? (
          <div className="h-full flex items-center bg-slate-600 ps-3">
            <p className="break-keep text-nowrap text-xs me-3 font-medium">
              Are you sure?
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleting(false);
              }}
              disabled={isEditing}
              className={`bg-transparent h-full text-slate-300 p-3 aspect-square hover:bg-green-700 disabled:hover:bg-transparent disabled:text-slate-700 hover:text-red-100 transition-all`}
            >
              <XMarkIcon />
            </button>
            <button
              onClick={handleOnDelete}
              disabled={isEditing}
              className={`bg-transparent p-3 h-full text-slate-300 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all`}
            >
              <TrashIcon />
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={handleOnDelete}
              disabled={isEditing}
              className={`${
                isLoading.delete ? "p-2" : "p-3"
              } bg-transparent h-full text-slate-300 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all`}
            >
              {isLoading.delete ? <Loading /> : <TrashIcon />}
            </button>
          </>
        )}
      </div>
      {type === "category" && isEditing ? (
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

export default MiniCard;
