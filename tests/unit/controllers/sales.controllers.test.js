const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesService } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { allSalesMock, saleByIdResultMock, insertCorrectSaleBodyMock, insertResolveMock, insertWrongSaleBodyMock1, insertWrongSaleBodyMock2, insertWrongSaleBodyMock3, updateCorrectSaleBodyMock, updatedMock } = require("./mocks/sales.mocks");


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

  it('Insere uma nova venda com sucesso', async function () {
    const res = {};
    const req = { body: insertCorrectSaleBodyMock };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insert').resolves({type: null, message: insertResolveMock})

    await salesController.insertSale(req, res)
    
    expect(res.status).to.have.been.calledWith(201)
    expect(res.json).to.have.been.calledWith(insertResolveMock)
  })

  it('insere valores errados no insert', async function () {
    const res = {};
    const req = { body: insertWrongSaleBodyMock1 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insert')
      .onCall(0).resolves({ type: 'INVALID_ID', message: '"productId" is required' })
      .onCall(1).resolves({ type: 'INVALID_QTY', message: '"quantity" is required' })
      .onCall(2).resolves({ type: 'INVALID_LENGTH', message: '"quantity" must be greater than or equal to 1' })
      .onCall(3).resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

    await salesController.insertSale(req, res)
    expect(res.status).to.have.been.calledWith(400)
    expect(res.json).to.have.been.calledWith({message: '"productId" is required'});

    await salesController.insertSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({message: '"quantity" is required'});

    await salesController.insertSale(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({message: '"quantity" must be greater than or equal to 1'});

    await salesController.insertSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: "Product not found"});
  })

  it('Remove uma venda com sucesso', async function () {
    const res = {};
    const req = { params: {id: 1} };
    res.sendStatus = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, 'deleteRow')
      .resolves({ type: null, message: '' });

    await salesController.deleteSale(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  })

  it('Remove uma venda com id invalido', async function () {
    const res = {};
    const req = { params: { id: 99999 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, "deleteRow")
      .resolves({ type: 'SALE_NOT_FOUND', message: "Sale not found" });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);  
    expect(res.json).to.have.been.calledWith({message: 'Sale not found'});
  })

  it('Atualiza uma venda com sucesso', async function () {
      const res = {};
    const req = { params: { id: 1 }, body: updateCorrectSaleBodyMock };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'update')
        .resolves({ type: null, message: updatedMock });

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedMock);
  })

  it('testa os erros durante atualização de uma venda', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: updateCorrectSaleBodyMock };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon
      .stub(salesService, "update")
      .onCall(0).resolves({ type: "INVALID_ID", message: '"productId" is required' })
      .onCall(1).resolves({ type: "INVALID_QTY", message: '"quantity" is required' })
      .onCall(2).resolves({
        type: "INVALID_LENGTH",
        message: '"quantity" must be greater than or equal to 1',
      })
      .onCall(3).resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"productId" is required',
    });

    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" is required',
    });

    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"quantity" must be greater than or equal to 1',
    });

    await salesController.updateSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: "Product not found" });
  })
});
