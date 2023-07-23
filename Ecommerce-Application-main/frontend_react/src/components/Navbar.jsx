import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Navitems } from '../utils';

const Navbar = () => {
  return (
    <section className='bg-gray-700 shadow-xl'>
      <div className='max-w-7xl hidden lg:flex p-3 mx-auto items-center justify-between'>
        {Navitems.map((items, i) => (
          <a href={`/${items.link}`} key={i} className='flex flex-row text-white font-semibold'>
            {items.name} <RiArrowDropDownLine size={26} />
          </a>
        ))}
      </div>
    </section>
  )
}

export default Navbar;