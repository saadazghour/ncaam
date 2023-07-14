"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Select = ({ allTeams, teamId }) => {
  const router = useRouter();

  const handleChangeTeam = (e) => {
    const teamId = e.target.value;
    router.push(`/${teamId}`);
  };

  return (
    <div className="mb-6 border border-gray-300 rounded-md dark:border-gray-700 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">

      <select
        className="w-full px-2 py-3 font-semibold text-gray-800 bg-white border-r-8 rounded-md dark:bg-black dark:text-gray-200 border-r-transparent bg-none"
        defaultValue={teamId}
        onChange={handleChangeTeam}
      >
        {allTeams.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
