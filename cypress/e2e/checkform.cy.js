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

  it('should not be able to submit an order without a name', () => {
    cy.get('button[name="beans"]').click();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should not be able to submit an order without a ingredient', () => {
  cy.get('input[name="name"]').type('Test Order');
  cy.get('button[type="submit"]').should('be.disabled');
});

it('should submit the order when both name and ingredient are provided', () => {
  cy.get('input[name="name"]').type('Test Order');
  cy.get('button[name="beans"]').click();
  cy.get('button[type="submit"]').should('not.be.disabled');
});
});