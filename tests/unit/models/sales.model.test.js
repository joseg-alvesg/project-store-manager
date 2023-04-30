const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connections");
const { allResultMock } = require("../services/mocks/sale.mock");
const { salesModel } = require("../../../src/models");


describe('Testa sales Model', function () {
  it.only('retorna todos os componetes da tabela', async function () {
    sinon.stub(connection, 'execute').resolves([allResultMock])

    const result = await salesModel.findAll();

    expect(result).to.deep.equal(allResultMock)
  })
})