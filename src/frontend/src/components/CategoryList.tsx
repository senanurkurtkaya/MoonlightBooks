import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../data/categories';

const CategoryList: React.FC = () => {
  return (
    <section className="px-10 my-10">
      <h2 className="text-xl font-bold mb-4">Kategoriler</h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat, index) => (
          <CategoryCard key={index} name={cat.name} icon={cat.icon} />
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
