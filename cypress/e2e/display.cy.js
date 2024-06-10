describe('Initial Display', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
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
  });

  it('should display the orders on page load', () => {
    cy.wait('@getOrders');
    cy.get('.order').should('have.length', 2);
    cy.get('.order').first().contains('Pat');
    cy.get('.order').last().contains('Alex');
  });
});