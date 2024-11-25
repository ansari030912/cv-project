import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePersonalInfo } from "../redux/personalInfoSlice";

const PersonalInfoCard = () => {
  const personalInfo = useSelector((state) => state.personalInfo);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(updatePersonalInfo({ [id]: value }));
  };

  return (
    <form>
      <h2 className="font-bold text-3xl text-blue-500">Personal Detail</h2>
      <br />
      <div>
        <label
          htmlFor="jobTitle"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Your job title"
          value={personalInfo.jobTitle}
          maxLength={150} // Limit to 150 characters
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John"
            value={personalInfo.firstName}
            maxLength={15} // Limit to 15 characters
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Doe"
            value={personalInfo.lastName}
            maxLength={15} // Limit to 15 characters
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your city"
            value={personalInfo.city}
            maxLength={14} // Limit to 14 characters
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Your country"
            value={personalInfo.country}
            maxLength={14} // Limit to 14 characters
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="123-456-7890"
            value={personalInfo.phone}
            maxLength={15} // Limit to 15 characters
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@example.com"
            value={personalInfo.email}
            maxLength={25} // Limit to 25 characters
            onChange={handleInputChange}
          />
        </div>
      </div>
    </form>
  );
};

export default PersonalInfoCard;
