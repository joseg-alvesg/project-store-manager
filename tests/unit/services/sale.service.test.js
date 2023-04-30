const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { saleAllResultMock, saleFindByIdMock, saleInsertResolveMock, saleInsertMock } = require("./mocks/sale.mock");
const { salesService } = require("../../../src/services");


describe('test do service', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('retorna todas as vendas', async function () {
    sinon.stub(salesModel, 'findAll').resolves(saleAllResultMock);
  
    const result = await salesService.findAll();

    expect(result.message).to.deep.equal(saleAllResultMock);
  })

  it('retorna um venda por id', async function () {
    sinon.stub(salesModel, 'findById').resolves(saleFindByIdMock);

    const result = await salesService.findById(1);

    expect(result.message).to.deep.equal(saleFindByIdMock);
  })

  it('insere uma nova venda a tabela', async function () {
    sinon.stub(salesModel, 'insertSale').resolves(3)
    sinon.stub(salesModel, "insertProduct").resolves(saleInsertResolveMock);

    const result = await salesService.insert(saleInsertMock)
    expect(result.message).to.deep.equal(saleInsertResolveMock)
  })

  it('erros no insert', async function () {
    sinon.stub(salesService, "insert").resolves({ type: "INVALID_ID", message: '"productId" is required' });  
    const result = await salesService.insert(saleInsertMock);
  })
})