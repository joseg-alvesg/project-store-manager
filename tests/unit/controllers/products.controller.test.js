const chai = require("chai");
const {expect} = chai
const sinon = require("sinon");
const sinonChai = require('sinon-chai')
const { allResultMock, idResultMock, productListMock, newProductMock } = require("./mocks/products.mocks");
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
  
  // it("inserindo um novo produto de maneira errada", async function () {
  //   const res = {};
  //   const req = { body: { name: 'Gersin' } };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();
  //   sinon.stub(productService, "insert")
  //     .resolves({type: "CREATION_ERROR" ,message: "error when insert new product"});

  //   await productController.insertNewProduct(req, res);

  //   const result = await productService.insert('asdasd')
  //   expect(result).to.deep.equal({type: "CREATION_ERROR", message: "error when insert new product"})

  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith({message: "error when insert new product"});
  // });

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

  afterEach(function () {
    sinon.restore();
  });
});
