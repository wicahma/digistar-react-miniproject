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

const MiniCard = ({ name, uuid, type, handleCardClick }) => {
  const { category, setCategory, item, setItem, wallet, setWallet } =
    useContext(StateContext);
  const [localname, setLocalName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOnEdit = (e) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("Saved", uuid);
      switch (type) {
        case "category":
          updateCategory({ id: uuid, name: localname }).then((res) => {
            getCategory().then((data) => {
              console.log("data in edit category", data);
              setCategory(data.data);
            });
          });
          break;
        case "wallet":
          updateWallet({ id: uuid, name: localname }).then((res) => {
            getWallets().then((data) => {
              console.log("data in edit wahlet", data);
              setWallet(data.data);
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
      console.log("Deleted", uuid);
      switch (type) {
        case "category":
          deleteCategory(uuid).then((res) => {
            getCategory().then((data) => {
              console.log("data in delete catehgory", data);
              setCategory(data.data);
            });
          });
          break;
        case "wallet":
          deleteWallet(uuid).then((res) => {
            getWallets().then((data) => {
              console.log("data in delete wallet", data);
              setWallet(data.data);
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
    <div className="bg-slate-800 relative flex h-10 justify-between w-full rounded-lg text-gray-400 text-xl overflow-hidden">
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
        className={`bg-transparent h-full text-slate-300 p-3 aspect-square disabled:text-slate-700 disabled:bg-transparent ${
          isEditing ? "hover:bg-green-600" : "hover:bg-orange-400"
        } hover:text-red-100 transition-all`}
      >
        {isEditing ? <CheckIcon /> : <PencilIcon />}
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
            className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all"
          >
            <TrashIcon />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleOnDelete}
            disabled={isEditing}
            className="bg-transparent h-full text-slate-300 p-3 aspect-square disabled:hover:bg-transparent disabled:text-slate-700 hover:bg-red-700 hover:text-red-100 transition-all"
          >
            <TrashIcon />
          </button>
        </>
      )}
    </div>
  );
};

export default MiniCard;
