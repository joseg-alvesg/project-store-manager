const allResultMock = [
  {
    id: 1,
    date: '2023-04-30T16:21:06.000Z',
    saleId: 1,
    productId: 1,
    quantity: 5
  },
  {
    id: 1,
    date: '2023-04-30T16:21:06.000Z',
    saleId: 1,
    productId: 2,
    quantity: 10
  },
  {
    id: 2,
    date: '2023-04-30T16:21:06.000Z',
    saleId: 2,
    productId: 3,
    quantity: 15
  }
]


const resultByIdMock = [
  {
    date: "2023-04-30T16:21:06.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2023-04-30T16:21:06.000Z",
    productId: 2,
    quantity: 10,
  },
];


module.exports = {
  allResultMock,
  resultByIdMock,
}