import React, { useState } from 'react';
import Select from 'react-select';

function CategorySelector({ categories, onSelect }) {
  const [path, setPath] = useState([]);

  const handleSelect = (option, level) => {
    const newPath = path.slice(0, level).concat(option);
    setPath(newPath);
    onSelect(newPath);
    // Fetch subcategories if needed (assumes similar API endpoint)
  };

  const options = categories.map(cat => ({
    value: cat.href,
    label: cat.title,
    href: cat.href
  }));

  return (
    <div>
      {path.map((item, index) => (
        <Select
          key={index}
          options={options}
          value={{ value: item.href, label: item.title }}
          onChange={(option) => handleSelect(option, index)}
          placeholder={`Select level ${index + 1}`}
          className="category-select"
        />
      ))}
      <Select
        options={options}
        onChange={(option) => handleSelect(option, path.length)}
        placeholder="Select category"
      />
    </div>
  );
}

export default CategorySelector;