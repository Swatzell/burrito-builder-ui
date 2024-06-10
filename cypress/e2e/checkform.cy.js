describe('Form', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/orders', {
      statusCode: 200,
      body: {
        orders: [
          {
            id: 1,
            name: 'Pat',
            ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
          },
          {
            id: 2,
            name: 'Alex',
            ingredients: ['steak', 'pico de gallo', 'guacamole', 'cilantro', 'sour cream']
          }
        ]
      }
    }).as('getOrders');

    cy.visit('http://localhost:3000/');
    cy.wait('@getOrders');
  });
