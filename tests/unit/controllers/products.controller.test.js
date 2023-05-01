const chai = require("chai");
const {expect} = chai
const sinon = require("sinon");
const sinonChai = require('sinon-chai')
const { productListMock, newProductMock } = require("./mocks/products.mocks");
const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");

chai.use(sinonChai)

describe("Testes de unidade do controller products", function () {
  it("Recuperando a lista de produtos e status 200", async function () {
    // Arrange
    const res = {}
    const req = {}
    res.status = sinon.stub().returns(res)
    res.json = sinon.stub().returns()
    sinon.stub(productService, 'findAll').resolves({type: null, message: productListMock})
    // Act
    await productController.findAllProducts(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productListMock);
  });

  it("recuperando um produto pelo id", async function () {
    const res = {};
    const req = {params: {id: 1}};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'findById').resolves({ type: null, message: newProductMock });
    
    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newProductMock);
  });

  it("retornando erro caso o produto não exista", async function () {
    const res = {};
    const req = { params: { id: 20 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, "findById").resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productController.findById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it("inserindo um novo produto", async function () {
    const res = {};
    const req = { body: { name: 'Gersin' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'insert')
      .resolves({ type: null, message: 'Gersin' });

    await productController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith("Gersin");
  });

  it('insere um novo produto com erro no nome', async function () {
    const res = {};
    const req = { body: { name: 'Gersin' } };
    const req2 = { body: { name: "Gersin" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "insert")
      .onCall(0).resolves({ type: "INVALID_VALUE", message: '"name" is required' })
      .onCall(1).resolves({
        type: "UNPROCESSABLE_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

    await productController.insertNewProduct(req, res);
    
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is required',
    });

    await productController.insertNewProduct(req2, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });

  })

  it('insere um novo produto com id invalido', async function () {
     const res = {};
     const req = { params: {id: 0}, body: { name: "Gersin" } };
     res.status = sinon.stub().returns(res);
     res.json = sinon.stub().returns();
     sinon
       .stub(productService, "insert")
       .resolves({ type: 'INVALID_ID', message: "Product not found" });

     await productController.insertNewProduct(req, res);

     expect(res.status).to.have.been.calledWith(404);
     expect(res.json).to.have.been.calledWith({message: "Product not found"});
  })

  it('atualizando um produto', async function () {
    const res = {};
    const req = { body: { name: "Gersin" }, params: {id: 1} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "insert")
      .resolves({ type: null, message: "Gersin" });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: "Gersin" });
  })

  it("atualiza um novo produto com erros", async function () {
    const res = {};
    const req = {params:{id: 1}, body: { nam: "Gersin" } };
    const req2 = { params: { id: 1 }, body: { name: "Gers" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, 'update')
      .onCall(0).resolves({ type: "INVALID_VALUE", message: '"name" is required' })
      .onCall(1)
      .resolves({
        type: "UNPROCESSABLE_VALUE",
        message: '"name" length must be at least 5 characters long',
      });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is required',
    });

    await productController.updateProduct(req2, res);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it("atualiza um produto com id invalido", async function () {
    const res = {};
    const req = { params: { id: 9999 }, body: { name: "Gersin" } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "update")
      .resolves({ type: "INVALID_ID", message: "Product not found" });

    await productController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({
      message: "Product not found",
    });
  });

  it('remove um produto', async function () {
    const res = {}
    const req = { params: { id: 1 } }
    res.sendStatus = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteRow').resolves({ type: null, message: '' })
    await productController.deleteProduct(req, res)
    expect(res.sendStatus).to.have.been.calledWith(204);
  })

  it('tenta remover um produto que não existe', async function () {
    const res = {}
    const req = { params: { id: 9999 } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'deleteRow')
      .resolves({ type: 'INVALID_ID', message: 'Product not found' })
    
    await productController.deleteProduct(req, res)
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({message: 'Product not found'});
  })


  it("busa pelo nome do produto", async function () {
    const res = {};
    const req = { query: { q: 'Escudo' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productService, "searchByQuery")
      .resolves({ type: null, message: '"Escudo do capitão america"' });

    await productController.searchProductQuery(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith('"Escudo do capitão america"');
  });

  afterEach(function () {
    sinon.restore();
  });
});
