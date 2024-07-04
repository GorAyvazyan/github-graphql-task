import React from 'react';
import useStore from '@/store';
import './index.css';

const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        className="search-input"
        placeholder="Search repositories..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </>
  );
};

export default SearchInput;
