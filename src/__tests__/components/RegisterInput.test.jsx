/**
 * Skenario pengujian komponen RegisterInput:
 * - RegisterInput harus memanggil callback onRegister dengan name, email, dan password yang diisikan pengguna.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RegisterInput from '../../components/RegisterInput';

describe('RegisterInput component', () => {
  it('harus memanggil callback onRegister dengan name, email, dan password yang diisikan pengguna', async () => {
    const onRegister = vi.fn();
    const user = userEvent.setup();

    render(<RegisterInput onRegister={onRegister} />);

    await user.type(screen.getByLabelText(/nama/i), 'Lulu');
    await user.type(screen.getByLabelText(/email/i), 'lulu@mail.com');
    await user.type(screen.getByLabelText(/password/i), 'rahasia123');
    await user.click(screen.getByRole('button', { name: /register/i }));

    expect(onRegister).toHaveBeenCalledWith({
      name: 'Lulu',
      email: 'lulu@mail.com',
      password: 'rahasia123',
    });
  });
});
