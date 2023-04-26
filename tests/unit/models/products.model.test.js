const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../src/models/connections')
const {allResultMock} = require('./mocks/products.mocks');
const { productModel } = require('../../../src/models');

describe("Testes de unidade do model products", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allResultMock])
    // Act
    const result = await productModel.findAll()
    // Assert
    expect(result).to.deep.equal(allResultMock)
  });

  afterEach(function () {
    sinon.restore();
  });
});