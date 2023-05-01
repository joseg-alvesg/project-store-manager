const allSalesMock = [
  {
    id: 1,
    date: "2023-05-01T18:45:24.000Z",
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    id: 1,
    date: "2023-05-01T18:45:24.000Z",
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
  {
    id: 2,
    date: "2023-05-01T18:45:24.000Z",
    saleId: 2,
    productId: 3,
    quantity: 15,
  },
];

const saleByIdResultMock = [
  {
    date: "2023-05-01T18:45:24.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-05-01T18:45:24.000Z",
    productId: 2,
    quantity: 10,
  },
];

module.exports = {
  allSalesMock,
  saleByIdResultMock,
}