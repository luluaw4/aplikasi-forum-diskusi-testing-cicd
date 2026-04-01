import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';

const meta = {
  title: 'Forum/CategoryFilter',
  component: CategoryFilter,
  tags: ['autodocs'],
};

export default meta;

function StatefulCategoryFilter(args) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div style={{ width: '700px' }}>
      <CategoryFilter
        {...args}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}

export const Default = {
  render: (args) => (
    <StatefulCategoryFilter
      {...args}
      categories={['redux', 'testing', 'react']}
    />
  ),
};
