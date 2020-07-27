const functions = require('./TodosArray.js');

test('Todos are created with a title', () => {
    let todoOne = functions.Todo("Look for Dress");
    expect(todoOne.getTitle()).toBe("Look for Dress");
});