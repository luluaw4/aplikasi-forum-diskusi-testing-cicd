import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ThreadItem from '../../components/ThreadItem';

const thread = {
  id: 'thread-1',
  title: 'Belajar Redux',
  body: '<p>Materi Redux</p>',
  category: 'redux',
  createdAt: '2025-01-01T10:00:00.000Z',
  totalComments: 3,
  upVotesBy: ['user-2'],
  downVotesBy: [],
  owner: {
    id: 'user-1',
    name: 'Lulu',
    avatar: '',
  },
};

describe('ThreadItem component', () => {
  it('harus menampilkan judul thread, nama owner, dan jumlah komentar', () => {
    render(
      <MemoryRouter>
        <ThreadItem
          thread={thread}
          authUser={null}
          onUpVote={vi.fn()}
          onDownVote={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: /belajar redux/i })).toBeInTheDocument();
    expect(screen.getByText(/lulu/i)).toBeInTheDocument();
    expect(screen.getByText(/3 komentar/i)).toBeInTheDocument();
  });

  it('harus memanggil callback vote ketika tombol up vote dan down vote diklik', async () => {
    const onUpVote = vi.fn();
    const onDownVote = vi.fn();
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ThreadItem
          thread={thread}
          authUser={{ id: 'user-1' }}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: /up vote/i }));
    await user.click(screen.getByRole('button', { name: /down vote/i }));

    expect(onUpVote).toHaveBeenCalledTimes(1);
    expect(onDownVote).toHaveBeenCalledTimes(1);
  });
});
