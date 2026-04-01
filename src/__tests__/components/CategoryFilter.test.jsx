import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import CategoryFilter from '../../components/CategoryFilter';

describe('CategoryFilter component', () => {
  it('harus menampilkan chip kategori yang dikirim melalui props', () => {
    render(
      <CategoryFilter
        categories={['redux', 'testing']}
        selectedCategory="all"
        onSelectCategory={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: /semua/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#redux/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#testing/i })).toBeInTheDocument();
  });

  it('harus memanggil callback onSelectCategory ketika chip kategori dipilih', async () => {
    const onSelectCategory = vi.fn();
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categories={['redux', 'testing']}
        selectedCategory="all"
        onSelectCategory={onSelectCategory}
      />,
    );

    await user.click(screen.getByRole('button', { name: /#redux/i }));

    expect(onSelectCategory).toHaveBeenCalledWith('redux');
  });
});
