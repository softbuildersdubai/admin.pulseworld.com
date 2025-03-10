import { useEffect, useState } from "react";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
// REDUX
// import { errorAlert, successAlert } from '../../../utils/alerts';

import { TextField } from "@mui/material";
import { useCustomerActions } from "../../../store/customer/customerActions";
import { useSelector } from "react-redux";
import { selectCustomerSlice } from "../../../store/customer/customerSlice";

const Filters = ({ filters, handleFilterChange, clearFilters, options }) => {
  // STATES
  const [selected, setSelected] = useState([]);
  const [isDropdown, setIsDropdown] = useState(false);

  const { getCountries, getCustomersList } = useCustomerActions();

  const formik = useFormik({
    initialValues: { country: "" },
    onSubmit: async () => {},
  });

  useEffect(() => {
    (async () => {
      await getCountries();
    })();
  }, []);
 
  return (
    <div className="w-full px-6 py-2 sm:pt-8 lg:px-8 text-white max-w-[1700px] mx-auto">
      <div className="mx-auto text-start flex gap-4 items-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{`Filters`}</h2>
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-3">
        <div className={`grid grid-cols-2 gap-6 rounded-md mt-8`}>
          <TextField
            label={"Search By"}
            variant="outlined"
            className={`w-full`}
            type={"text"}
            name={"search"}
            onChange={handleFilterChange}
            value={filters}
            sx={{
              "& .css-10m55e3-MuiFormLabel-root-MuiInputLabel-root": {
                fontSize: "0.8rem",
              },
              "& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input": {
                fontSize: "0.8rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Search...."
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              // clearFilters();
            }}
            className="text-right text-[14px] cursor-pointer px-4 py-2 mr-4 bg-white text-black"
          >
            Print
          </button>
          <button
            onClick={() => {
              // clearFilters();
            }}
            className="text-right text-[14px] cursor-pointer px-4 py-2 mr-4 bg-white text-black"
          >
            Export
          </button>
          <div
            onClick={() => {
              // clearFilters();
            }}
            className="text-right text-[14px] cursor-pointer pr-6 mr-10 relative"
          >
            <button
              onClick={() => setIsDropdown(!isDropdown)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Manage Column
            </button>
            {isDropdown && (
              <div
                id="dropdownDefaultCheckbox"
                className="w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-[44px] left-0 z-50"
              >
                <ul
                  className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownCheckboxButton"
                >
                  <li>
                    {options?.map((itm) => {
                      return (
                        <div className="flex items-center border-b border-gray-200 rounded-t-lg dark:border-gray-600 px-2 py-2">
                          <input
                            id="checkbox-item-1"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="checkbox-item-1"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {itm?.label}
                          </label>
                        </div>
                      );
                    })}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
