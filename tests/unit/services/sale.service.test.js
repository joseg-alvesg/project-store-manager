const { expect } = require("chai");
const sinon = require("sinon");
const { salesModel } = require("../../../src/models");
const { saleAllResultMock, saleFindByIdMock, saleInsertResolveMock, saleInsertMock, saleInsertMockErr2, saleInsertMockErr1, saleInsertMockErr3, wrongProductIdMock, updatedMock } = require("./mocks/sale.mock");
const { salesService } = require("../../../src/services");
const { validations } = require("../../../src/utils");


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
    sinon
      .stub(validations, 'validateProduct')
      .onCall(0).resolves({ type: "INVALID_ID", message: '"productId" is required' })
      .onCall(1).resolves({ type: "INVALID_QTY", message: '"quantity" is required' })
      .onCall(2).resolves({ type: 'INVALID_LENGTH', message: '"quantity" must be greater than or equal to 1' })
    
    const result = await salesService.insert(saleInsertMockErr1);
    expect(result).to.deep.equal({ type: "INVALID_ID", message: '"productId" is required' });
    sinon.restore();
    
    const result2 = await salesService.insert(saleInsertMockErr2);
    expect(result2).to.deep.equal({ type: "INVALID_QTY", message: '"quantity" is required' });
    sinon.restore();

    const result3 = await salesService.insert(saleInsertMockErr3);
    expect(result3).to.deep.equal({ type: 'INVALID_LENGTH', message: '"quantity" must be greater than or equal to 1' })
  })

  it('deleteRow test', async function () {
    sinon.stub(salesModel, 'deleteRow')
      .onCall(0).resolves([{ affectedRows: 1 }])
      .onCall(1).resolves(0)
    const result = await salesService.deleteRow(1)
    expect(result).to.deep.equal({ type: null, message: "" });

    const result2 = await salesService.deleteRow(9999);
    expect(result2).to.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' } );
  })

  it('testa atualização de uma venda falha', async function () {
    sinon.stub(salesModel, 'update')
      .onCall(0).resolves([undefined, { affectedRows: 1 }])
      .onCall(1).resolves(saleInsertMock)
    const result = await salesService.update(1, wrongProductIdMock)
    expect(result).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' })

    const result2 = await salesService.update(9999, saleInsertMock)
    expect(result2).to.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' })
  })

  it('atualiza uma venda com sucesso', async function () {
    sinon.stub(salesModel, 'update').resolves(saleInsertMock)
    const result = await salesService.update(1, saleInsertMock)
    expect(result.message).to.deep.equal(updatedMock)
  }) 
})