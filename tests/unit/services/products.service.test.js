const { expect } = require("chai");
const sinon = require("sinon");
const { allResultMock, idResultMock, nameInsertMock, namePlusIdMock } = require("./mocks/products.mocks");
const { productService } = require("../../../src/services");
const { productModel } = require("../../../src/models");
const { all } = require("../../../src/routes/products.routes");

describe("Testes de unidade do services products", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(productModel, 'findAll').resolves(allResultMock);
    // Act
    const result = await productService.findAll();
    // Assert
    expect(result.message).to.deep.equal(allResultMock);
  });

  it("recuperando um produto pelo id", async function () {
    sinon.stub(productModel, 'findById').resolves(idResultMock);
    const result = await productService.findById(1);
    expect(result.message).to.deep.equal(idResultMock);
  });

  it("retornando erro caso o produto não exista", async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);
    const result = await productService.findById(1);
    expect(result.message).to.deep.equal('Product not found');
  })

  it('testa a adição de um novo produto', async function () {
    sinon.stub(productModel, 'insert').resolves(1)
    const result = await productService.insert(nameInsertMock.name)
    expect(result.message).to.deep.equal(namePlusIdMock)
  })

  afterEach(function () {
    sinon.restore();
  });
});
