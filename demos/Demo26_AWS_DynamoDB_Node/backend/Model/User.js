// Create a Model to represent the User Table
// Defining Attributes, Types, and Primary Key Columns (if any)
const UserTable = {
    TableName: 'User',
    KeySchema: [
        { AttributeName: 'id', KeyType: 'S' }
    ],
    AttributeDefinitions: [
        { AttributeName: 'id', AttributeType: 'S' },
        { AttributeName: 'firstName', AttributeType: 'S' },
        { AttributeName: 'lastName', AttributeType: 'S' }, 
        { AttributeName: 'email', AttributeType: 'S' }, 
        { AttributeName: 'password', AttributeType: 'S' }, 
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
};

module.exports = UserTable;