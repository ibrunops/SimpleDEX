import React from 'react';

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function TokenInput({ value, onChange, placeholder }: TokenInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow valid number inputs
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-full p-2 border rounded"
    />
  );
}