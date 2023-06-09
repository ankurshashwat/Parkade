"use client";

import Link from "next/link";

const OwnerForm = ({ handleSubmit, handleChange, post, submit }) => {
  const { ownerAddress, hourlyRate, metamask, reservations } = post;

  return (
    <section className="w-full max-w-full flex-start flex-col mb-8">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Owners Form</span>
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
            Owner Address
          </span>
          <textarea
            type="text"
            name="ownerAddress"
            value={ownerAddress}
            onChange={handleChange}
            placeholder="Enter owner address"
            required
            className="form_textarea"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Hourly Rate
          </span>
          <input
            type="number"
            step="0.01"
            name="hourlyRate"
            value={hourlyRate}
            onChange={handleChange}
            placeholder="Enter hourly rate"
            required
            className="form_input"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Owner Metamask Address
          </span>
          <input
            type="text"
            name="metamask"
            value={metamask}
            onChange={handleChange}
            placeholder="Enter owner metamask address"
            required
            className="form_input"
          />
        </label>

        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Reservations
          </span>
          <textarea
            name="reservations"
            value={reservations}
            onChange={handleChange}
            placeholder="Enter existing reservation ids (optional)"
            className="form_textarea"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm underline">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submit}
            className="px-5 py-2 text-sm bg-primary-orange rounded-full text-white"
          >
            {submit ? "Listing..." : "List"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default OwnerForm;
