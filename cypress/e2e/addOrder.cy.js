describe('Add Order', () => {
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
    
        cy.intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 201,
          body: {
            id: 3,
            name: 'Test Order',
            ingredients: ['beans', 'lettuce']
          }
        }).as('postOrder');
    
        cy.visit('http://localhost:3000/');
        cy.wait('@getOrders');

  