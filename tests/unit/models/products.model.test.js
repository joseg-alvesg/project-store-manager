const { expect } = require('chai')
const sinon = require('sinon')
const connection = require('../../../src/models/connections')
const {allResultMock, idResultMock, nameInsertMock} = require('./mocks/products.mocks');
const { productModel } = require('../../../src/models');
const { searchByQuery } = require('../../../src/models/products.model');

describe("Testes de unidade do model products", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([allResultMock])
    // Act
    const result = await productModel.findAll()
    // Assert
    expect(result).to.deep.equal(allResultMock)
  });

  it("recuperando um produto pelo id", async function () {
    sinon.stub(connection, "execute").resolves([[idResultMock]]);
    const result = await productModel.findById(1);
    expect(result).to.deep.equal(idResultMock);
  })

  it('adiciona um novo produto a tabela', async function () {
    const id = 1
    sinon.stub(connection, 'execute').resolves([{insertId: 1}])
    const result = await productModel.insert(nameInsertMock.name)
    expect(result).to.equal(id)
  })

  it('testa atualizar um produto', async function () {
    const id = 1
    product = 'MARRETA'
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await productModel.update(id, product)
    expect(result).to.deep.equal(1)
  })

  it('deleta um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await productModel.deleteRow(1)
    expect(result).to.equal(1)
  })

  it('faz uma busca pelo nome do produco', async function () {
    sinon.stub(connection, 'execute').resolves([searchByQuery])
    const result = await productModel.searchByQuery('martelo')
    expect(result).to.deep.equal(searchByQuery);
  })

  afterEach(function () {
    sinon.restore();
  });
});