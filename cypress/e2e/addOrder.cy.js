describe('Add Order', () => {
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

    cy.intercept('POST', '/api/v1/orders', {
      statusCode: 201,
      body: {
        id: 3,
        name: 'Test Order',
        ingredients: ['beans', 'lettuce']
      }
    }).as('postOrder');

    cy.visit('http://localhost:3000/');
    cy.wait('@getOrders');
  });

  it('should add a new order to the DOM', () => {
    cy.get('input[name="name"]').type('Test Order');
    cy.get('button[name="beans"]').click();
    cy.get('button[name="lettuce"]').click();
    cy.get('button[type="submit"]').click();

    cy.wait('@postOrder');
    cy.get('.order').should('have.length', 3);
    cy.get('.order').last().contains('Test Order');
    cy.get('.order').last().contains('beans');
    cy.get('.order').last().contains('lettuce');
  });
});