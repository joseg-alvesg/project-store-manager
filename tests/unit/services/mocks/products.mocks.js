const allResultMock = {
  type: null,
    message: [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ],
};

const idResultMock = {
  "message": {
    "id": 1,
    "name": "Martelo de Thor"
  },
    "type": [null]
}

const nameInsertMock = { name: 'Gersin' }

const namePlusIdMock = {id: 1, ...nameInsertMock}

module.exports = {
  allResultMock,
  idResultMock,
  nameInsertMock,
  namePlusIdMock,
}