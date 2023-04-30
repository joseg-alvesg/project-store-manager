const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connections");
const { allResultMock, resultByIdMock } = require("../services/mocks/sale.mock");
const { salesModel } = require("../../../src/models");


describe('Testa sales Model', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('retorna todos os componetes da tabela', async function () {
    sinon.stub(connection, 'execute').resolves([allResultMock])

    const result = await salesModel.findAll();

    expect(result).to.deep.equal(allResultMock)
  })

  it('testa a busca pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([resultByIdMock])
    const result = await salesModel.findById(1)
    expect(result).to.deep.equal(resultByIdMock)
  })
})