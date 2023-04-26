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


// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const productMock = {
  name: "Pablo"
};

// Vamos utilizar esse objeto como mock da função createPassenger que ainda vamos implementar.
const newProductMock = { id: 1, ...productMock };

// Esse é o array que utilizamos no teste da função findAll, reaproveitando o objeto newPassengerMock
const productListMock = [newProductMock];

module.exports = {
  allResultMock,
  idResultMock,
  productMock,
  newProductMock,
  productListMock,
};