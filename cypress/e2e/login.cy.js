describe('alur login aplikasi', () => {
  it('mengarahkan pengguna ke beranda setelah login berhasil', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          accessToken: 'access-token-testing',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Lulu Testing',
            email: 'lulu@mail.com',
            avatar: '',
          },
        },
      },
    }).as('profileRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          threads: [
            {
              id: 'thread-1',
              title: 'Thread Cypress',
              body: '<p>Body thread</p>',
              category: 'testing',
              createdAt: '2025-01-01T10:00:00.000Z',
              ownerId: 'user-1',
              totalComments: 0,
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    }).as('threadsRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'success',
        data: {
          users: [
            {
              id: 'user-1',
              name: 'Lulu Testing',
              email: 'lulu@mail.com',
              avatar: '',
            },
          ],
        },
      },
    }).as('usersRequest');

    cy.visit('/');
    cy.url().should('include', '/login');

    cy.get('input[type="email"]').type('lulu@mail.com');
    cy.get('input[type="password"]').type('rahasia123');
    cy.contains('button', 'Login').click();

    cy.wait('@loginRequest');
    cy.wait('@profileRequest');
    cy.wait('@threadsRequest');
    cy.wait('@usersRequest');

    cy.url().should('eq', 'http://127.0.0.1:4173/');
    cy.contains('Daftar thread').should('be.visible');
    cy.contains('Thread Cypress').should('be.visible');
  });
});
