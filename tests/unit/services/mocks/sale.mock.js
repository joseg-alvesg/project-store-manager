const saleAllResultMock = [
  {
    id: 1,
    date: "2023-04-30T17:32:58.000Z",
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    id: 1,
    date: "2023-04-30T17:32:58.000Z",
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    id: 2,
    date: "2023-04-30T17:32:58.000Z",
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const saleFindByIdMock = [
  {
    date: "2023-04-30T17:32:58.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-04-30T17:32:58.000Z",
    productId: 2,
    quantity: 10,
  },
];

const saleInsertResolveMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 3000
    },
    {
      "productId": 2,
      "quantity": 5000
    }
  ]
}

const saleInsertMock = [
  {
    productId: 1,
    quantity: 3000,
  },
  {
    productId: 2,
    quantity: 5000,
  },
];

module.exports = {
  saleAllResultMock,
  saleFindByIdMock,
  saleInsertResolveMock,
  saleInsertMock,
}