const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { allSalesMock, saleByIdResultMock } = require("./mocks/sales.mocks");


chai.use(sinonChai);

describe("Testes de unidade do controller sales", function () {
  afterEach(function () {
    sinon.restore()
  })

  it("Recuperando todas as vendas", async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, "findAll")
      .resolves({ type: null, message: allSalesMock });
    await salesController.findAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSalesMock);
  });

  it("Recuperando uma venda pelo id", async function () {
    const res = {};
    const req = {params: {id: 1}};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(salesService, 'findById')
      .resolves({ type: null, message: saleByIdResultMock });
    await salesController.findSaleId(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleByIdResultMock);
  });

  it("Recuperando um id invalido da venda", async function () {
    const res = {};
    const req = { params: { id: 9999 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, "findById")
      .resolves({ type: "SALE_NOT_FOUND", message: 'Sale not found' });
    
    await salesController.findSaleId(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
  });
});
