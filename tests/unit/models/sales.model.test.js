const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connections");
const {
  allResultMock,
  resultByIdMock,
  insertSaleMock,
  simpleInsertMock,
} = require("./mocks/sale.mock");
const { salesModel } = require("../../../src/models");

describe("Testa sales Model", function () {
  afterEach(function () {
    sinon.restore();
  });

  it("retorna todos os componetes da tabela", async function () {
    sinon.stub(connection, "execute").resolves([allResultMock]);

    const result = await salesModel.findAll();

    expect(result).to.deep.equal(allResultMock);
  });

  it("testa a busca pelo id", async function () {
    sinon.stub(connection, "execute").resolves([resultByIdMock]);
    const result = await salesModel.findById(1);
    expect(result).to.deep.equal(resultByIdMock);
  });

  it("insere uma nova venda", async function () {
    sinon.stub(connection, "execute").onCall(0).resolves([{ insertId: 1 }])
      .onCall(1).resolves([insertSaleMock]);
    const result = await salesModel.insertSale();
    expect(result).to.deep.equal(1);

    const result2 = await salesModel.insertProduct(1, [
      { productId: 1, quantity: 3000 },
      { productId: 2, quantity: 5000 },
    ]);

    expect(result2).to.deep.equal([insertSaleMock]);
  });

  it('deleta uma venda pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
    const result = await salesModel.deleteRow(1)
    expect(result).to.equal(1)
  })

  it('atualiza uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }])
    const result = await salesModel.update(1, simpleInsertMock)
    expect(result).to.equal(1)
  })

});
