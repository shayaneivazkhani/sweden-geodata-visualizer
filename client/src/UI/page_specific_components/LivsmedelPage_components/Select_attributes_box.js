import React, { useState, useEffect } from 'react';

/*
const SelectAttributesBox = () => {
  const [data, setData] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({
    area: '',
    main_group: '',
    sub_group: '',
    sub_sub_group: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/list/goods');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAttributeSelect = (attribute, value) => {
    setSelectedAttributes({
      ...selectedAttributes,
      [attribute]: value
    });
  };

  return (
    <div>
      <h1>Select Attributes</h1>
      {data && (
        <>
          <SelectionComponent
            label="Area"
            options={Array.from(new Set(data.map(item => item.area)))}
            selectedValue={selectedAttributes.area}
            onSelect={value => handleAttributeSelect('area', value)}
          />
          <SelectionComponent
            label="Main Group"
            options={Array.from(new Set(data.map(item => item.main_group)))}
            selectedValue={selectedAttributes.main_group}
            onSelect={value => handleAttributeSelect('main_group', value)}
          />
          <SelectionComponent
            label="Sub Group"
            options={Array.from(new Set(data.map(item => item.sub_group)))}
            selectedValue={selectedAttributes.sub_group}
            onSelect={value => handleAttributeSelect('sub_group', value)}
          />
          <SelectionComponent
            label="Sub Sub Group"
            options={Array.from(new Set(data.map(item => item.sub_sub_group)))}
            selectedValue={selectedAttributes.sub_sub_group}
            onSelect={value => handleAttributeSelect('sub_sub_group', value)}
          />
        </>
      )}
    </div>
  );
};

const SelectionComponent = ({ label, options, selectedValue, onSelect }) => (
  <div>
    <label>{label}:</label>
    <select value={selectedValue} onChange={e => onSelect(e.target.value)}>
      <option value="">Select {label}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectAttributesBox;
*/