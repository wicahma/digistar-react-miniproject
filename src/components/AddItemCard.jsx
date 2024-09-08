import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { useContext, useState } from "react";
import { StateContext } from "../context/StateContext";
import { addItems, getItems } from "../api/items";
import Loading from "./Loading";

const AddItemCard = ({ closeCallback }) => {
  const { category, wallet } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);

  const [item, setItem] = React.useState({
    title: "",
    amount: "",
    wallet: "",
    category: "",
    flowType: "income",
  });

  const handleCreateItem = async (e) => {
    let isError = false;
    e.stopPropagation();
    e.preventDefault();
    Object.keys(item).map((key) => {
      if (item[key] === "") {
        isError = true;
      }
    });
    if (!isError) {
      setIsLoading(true);
      await addItems(item).then(async (res) => {
        await getItems().then((data) => {
          setItem(data.data);
          closeCallback();
          setIsLoading(false);
        });
      });
    }
  };

  return (
    <div className="rounded-lg relative -z-0 flex gap-3 justify-between items-center bg-slate-700 w-full overflow-hidden h-20  max-h-32">
      <div className="z-10 grow h-full flex flex-col border-r border-slate-600">
        <input
          type="text"
          placeholder="Add item..."
          onChange={(e) => setItem({ ...item, title: e.target.value })}
          className="text-2xl font-medium line-clamp-1 bg-transparent p-1 px-3"
        />
        <div className=" divide-x divide-gray-600 flex border-t border-slate-600 grow">
          <select
            name="flow"
            id="flow"
            value={item.flowType}
            onChange={(e) => setItem({ ...item, flowType: e.target.value })}
            className="bg-transparent px-3 border-r border-slate-600"
          >
            <option value="income">Income</option>
            <option value="outcome">Outcome</option>
          </select>
          <select
            name="category"
            id="category"
            disabled={category.length === 0}
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            className="bg-transparent px-3 border-r border-slate-600 disabled:bg-slate-600 disabled:w-20"
          >
            <option disabled value="">
              Select an option
            </option>
            {category.map((item, i) => (
              <option key={`Category-${i}`} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            name="wallet"
            id="wallet"
            disabled={wallet.length === 0}
            value={item.wallet}
            onChange={(e) => setItem({ ...item, wallet: e.target.value })}
            className="bg-transparent px-3 border-r border-slate-600 disabled:bg-slate-600 disabled:w-20"
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
          <input
            type="text"
            placeholder="Add amount..."
            value={item.amount}
            onChange={(e) => setItem({ ...item, amount: e.target.value })}
            className="line-clamp-1 bg-transparent p-1 px-3 w-full"
          />
        </div>
      </div>
      <div className=" h-full flex justify-end items-center">
        <div className="me-3">
          <h3 className="text-2xl font-medium text-gray-400">
            {/* {currencyFormatter()} */}
          </h3>
        </div>
        <button
          onClick={closeCallback}
          className="bg-transparent h-full text-slate-300 p-5 aspect-square hover:bg-red-400 hover:text-red-100 transition-all"
        >
          <XMarkIcon />
        </button>
        <button
          onClick={handleCreateItem}
          className="bg-transparent h-full text-slate-300 p-5 aspect-square hover:bg-green-700 hover:text-green-100 transition-all"
        >
          {isLoading ? <Loading /> : <CheckIcon />}
        </button>
      </div>
    </div>
  );
};

export default AddItemCard;
