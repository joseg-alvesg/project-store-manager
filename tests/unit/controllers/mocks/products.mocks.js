const allResultMock = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
]

const idResultMock = {
  "message": {
    "id": 1,
    "name": "Martelo de Thor"
  },
    "type": [null]
}

const productMock = {
  name: "Pablo"
};

const newProductMock = { id: 1, ...productMock };

const productListMock = [newProductMock];

module.exports = {
  allResultMock,
  idResultMock,
  productMock,
  newProductMock,
  productListMock,
};