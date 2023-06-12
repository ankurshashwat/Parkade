import Link from "next/link";
import Map from "./Maps/OMap";
import RMap from "./Maps/RMap";

const Form = ({
  type,
  handleSubmit,
  handleChange,
  post,
  submit,
  updateAddress,
  markers,
  parkingSpaceAddress,
}) => {
  const { hourlyRate, metamask, reservations, startTime, endTime } = post;

  const renderForm = () => {
    if (type === "owner") {
      return (
        <>
          <h1 className="head_text text-left">
            <span className="yellow_gradient">Owners Form</span>
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
                Select Your Parking Space Location
              </span>
              <Map updateAddress={updateAddress} />
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
                className="form_input font-semibold"
                value={metamask}
                placeholder="Enter owner metamask address"
                required
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
        </>
      );
    } else if (type === "renter") {
      return (
        <>
          <h1 className="head_text text-left">
            <span className="green_gradient">Renters Form</span>
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

            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Latitude
                </span>
                <input
                  type="text"
                  name="lat"
                  value={parkingSpaceAddress.lat}
                  required
                  className="form_input"
                  placeholder="00.000"
                />
              </div>

              <div className="flex flex-col">
                <span className="font-satoshi font-semibold text-base text-gray-700">
                  Longitude
                </span>
                <input
                  type="text"
                  name="lng"
                  value={parkingSpaceAddress.long}
                  required
                  className="form_input"
                  placeholder="00.000"
                />
              </div>
            </div>

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
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <section className="w-full max-w-full flex-start flex-col mb-8">
      {renderForm()}
    </section>
  );
};

export default Form;
