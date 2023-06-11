"use client";

import Link from "next/link";
import RMap from "./RMap";

const RenterForm = ({ handleSubmit, handleChange, post, submit, updateAddress, markers }) => {
  const { startTime, endTime } = post;

  return (
    <section className="w-full max-w-full flex-start flex-col mb-8">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Renters Form</span>
      </h1>
      <p className="desc text-left max-w-md">
        Fill in the form details below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Pick a parking space or select the area on the map
          </span>
          <RMap updateAddress={updateAddress} markers={markers} />
        </label>

        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Start Time
          </span>
          <input
            type="datetime-local"
            name="startTime"
            value={startTime}
            onChange={handleChange}
            required
            className="form_input"
          />
        </label>
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            End Time
          </span>
          <input
            type="datetime-local"
            name="endTime"
            value={endTime}
            onChange={handleChange}
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm underline">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submit}
            className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white hover:bg-primary-orange-dark focus:outline-none focus:bg-primary-orange-dark"
          >
            {submit ? "Renting..." : "Rent"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default RenterForm;
