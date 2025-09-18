import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'

const FilterSection = ({ title, options, selected, onToggle }) => {
  const [show, setShow] = useState(true);

  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center py-2 text-lg font-semibold cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className='!capitalize'>{title}</h3>
        {show ? <FaMinus /> : <FaPlus />}
      </div>

      <ul className={`ml-3 text-gray-700 font-medium ${show ? 'block' : 'hidden'}`}>
        {options.map(option => (
          <li key={option} className="flex gap-2 py-1 items-center">
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span className='!capitalize'>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection