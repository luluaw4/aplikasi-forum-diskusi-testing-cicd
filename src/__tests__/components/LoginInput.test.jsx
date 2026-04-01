import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import LoginInput from '../../components/LoginInput';

describe('LoginInput component', () => {
  it('harus memanggil callback onLogin dengan email dan password yang diisikan pengguna', async () => {
    const onLogin = vi.fn();
    const user = userEvent.setup();

    render(<LoginInput onLogin={onLogin} />);

    await user.type(screen.getByLabelText(/email/i), 'lulu@mail.com');
    await user.type(screen.getByLabelText(/password/i), 'rahasia123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(onLogin).toHaveBeenCalledWith({
      email: 'lulu@mail.com',
      password: 'rahasia123',
    });
  });
});
