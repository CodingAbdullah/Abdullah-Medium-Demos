// Create a Model to represent the User Table
// Defining Attributes, Types, and Primary Key Columns (if any)
const UserTable = {
    TableName: 'User',
    KeySchema: [
        { AttributeName: 'emailAddress', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'emailAddress', AttributeType: 'S' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
};

module.exports = UserTable;