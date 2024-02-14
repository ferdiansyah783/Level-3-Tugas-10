"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import ModalComponent from "@/components/ModalComponent";

type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
};

export default function Home() {
  const [data, setData] = useState<ProductType[]>([]);
  const [dataEdit, setDataEdit] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/products");

        if (response.status == 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [loading]);

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price") as string;
    const amount = formData.get("amount") as string;

    try {
      const resopnse = await axios.post("/api/products", {
        name,
        description,
        price: parseInt(price),
        amount: parseInt(amount),
      });

      if (resopnse.status == 200) {
        setLoading(!loading);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setDataUpdate = (id: number) => {
    const detailProduct = data.find((product) => product.id == id);
    if (detailProduct) {
      setDataEdit(detailProduct);
    }
  };

  const editData = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price") as string;
    const amount = formData.get("amount") as string;

    try {
      const resopnse = await axios.put("/api/products", {
        id: dataEdit?.id,
        name,
        description,
        price: parseInt(price),
        amount: parseInt(amount),
      });

      if (resopnse.status == 200) {
        setLoading(!loading);
        setDataEdit(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id: number) => {
    try {
      const response = await axios.delete(`/api/products`, {
        data: {
          id,
        },
      });

      if (response.status == 200) {
        setLoading(!loading);
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex justify-center gap-10 p-5">
      <div className="flex-1">
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NO</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>DESCRIPTON</TableColumn>
            <TableColumn>PRICE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.map((product, i) => (
              <TableRow key={product.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.amount}</TableCell>
                <TableCell>
                  <p
                    className="text-blue-500"
                    onClick={() => setDataUpdate(product.id)}
                  >
                    edit
                  </p>
                  <p className="text-red-500" onClick={() => deleteData(product.id)}>delete</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex-1">
        <form onSubmit={onSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Product Information
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Product name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      id="first-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="description"
                      id="last-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="price"
                      id="last-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="amount"
                      id="last-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      <ModalComponent
        data={dataEdit}
        onSubmit={editData}
        onClose={() => setDataEdit(null)}
      />
    </div>
  );
}
