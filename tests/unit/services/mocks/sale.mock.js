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
  { date: "2023-04-30T17:32:58.000Z", productId: 1, quantity: 5 },
  { date: "2023-04-30T17:32:58.000Z", productId: 2, quantity: 10 },
];

const saleInsertResolveMock = {
  id: 3,
  itemsSold: [
    { productId: 1, quantity: 3000 },
    { productId: 2, quantity: 5000 },
  ],
};

const saleInsertMock = [
  { productId: 1, quantity: 3000 },
  { productId: 2, quantity: 5000 },
];

const saleInsertMockErr1 = [
  { productI: 1, quantity: 3000 },
  { productId: 2, quantity: 5000 },
];

const saleInsertMockErr2 = [
  { productId: 1, quantit: 3000 },
  { productId: 2, quantity: 5000 },
];

const saleInsertMockErr3 = [
  { productId: 1, quantity: 0 },
  { productId: 2, quantity: 0 },
];

const wrongProductIdMock = [
  { productId: 999, quantity: 1 },
  { productId: 2, quantity: 1 },
];


const updatedMock = {
  saleId: 1,
  itemsUpdated: [
  { productId: 1, quantity: 3000 },
  { productId: 2, quantity: 5000 },
]
}
  
  
module.exports = {
  saleAllResultMock,
  saleFindByIdMock,
  saleInsertResolveMock,
  saleInsertMock,
  saleInsertMockErr1,
  saleInsertMockErr2,
  saleInsertMockErr3,
  wrongProductIdMock,
  updatedMock,
};
