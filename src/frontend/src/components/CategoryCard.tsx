import React from 'react';

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, icon }) => {
  return (
    <div className="w-28 h-28 bg-pink-100 rounded-xl flex flex-col items-center justify-center shadow-sm hover:shadow-md transition">
      <div className="text-2xl">{icon}</div>
      <span className="text-sm font-semibold mt-2">{name}</span>
    </div>
  );
};

export default CategoryCard;
