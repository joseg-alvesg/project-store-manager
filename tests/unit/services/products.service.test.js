const { expect } = require("chai");
const sinon = require("sinon");
const { allResultMock, idResultMock, nameInsertMock, namePlusIdMock } = require("./mocks/products.mocks");
const { productService } = require("../../../src/services");
const { productModel } = require("../../../src/models");
const { all } = require("../../../src/routes/products.routes");
const { validations } = require("../../../src/utils");

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

  it("testa a adicionar um novo produto de maneira errada", async function () {
    sinon.stub(productModel, "insert").resolves(1)
    
    const result = await productService.insert({ame:'Gersin'});
    expect(result.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('inset com erro no retorno do model', async function () {
    sinon.stub(productModel, "insert").resolves(0);
    const result2 = await productService.insert("insert return 0");
    expect(result2.message).to.deep.equal("error when insert new product");
  })

  it('Atualizando um produto', async function () {
    const mock = {id: 1, name: 'Gersin'}
    sinon.stub(productModel, 'update').resolves(1)
    const result = await productService.update(1, 'Gersin')
    expect(result.message).to.deep.equal(mock)
  })

  it('testando atualizar um produto com erro no corpo', async function () {
    sinon.stub(productModel, 'update').resolves(1);
    const result = await productService.update(1, { ame: "Gersin" });
    expect(result.message).to.deep.equal('"name" length must be at least 5 characters long')
  })

  it('atualiza um objeto com erro no id retornado do model', async function () {
    sinon.stub(productModel, "update").resolves(0);
    const result = await productService.update(0, "Gersin");
    expect(result.message).to.deep.equal('Product not found')
  })

  it('deleta um produto', async function () {
    sinon.stub(productModel, 'deleteRow').resolves(1)
    const result = await productService.deleteRow(1)
    expect(result).to.deep.equal({type: null, message: ''})
  })

  it('erro ao deletar um produto', async function () {
    sinon.stub(productModel, "deleteRow").resolves(0);
    const result = await productService.deleteRow(9999);
    expect(result.message).to.equal('Product not found');
  })

  it('faz uma busca pela query "q"', async function() {
    sinon.stub(productModel, 'searchByQuery').resolves('Martelo de thor')
    const result = await productService.searchByQuery('Martelo')
    expect(result.message).to.equal("Martelo de thor");
  })

  afterEach(function () {
    sinon.restore();
  });
});
