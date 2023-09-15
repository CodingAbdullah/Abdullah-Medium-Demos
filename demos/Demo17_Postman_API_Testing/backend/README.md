# API Testing with Postman and Node.js

### Overview
This document is short and will provide information for working with each of the different API endpoints.

### API Endpoints

| Method Type   | API Endpoint                        |
| ------------- | ----------------------------------- |
| GET           | <code>/fetch-data</code>            |
| POST          | <code>/insert-data</code>           |
| PUT           | <code>/update-whole-data</code>     |
| PATCH         | <code>/update-partially-data</code> |
| DELETE        | <code>/delete-data</code>           |

<br />

## Working with API Endpoints

### <code>GET /fetch-data</code>

- No Request body for GET request

### <code>POST /insert-data</code>
Request body must follow this format. IDs that already exist inside file will not be re-inserted, no duplicates allowed:

```
{
    data: [
        { userId: number, title: string }, ..., { userId: number, title: string }    
    ]
}
```

### <code> PUT /update-whole-data</code>
Request body must follow this format:
```
{
    data: [
        { userId: number, title: string }, ..., { userId: number, title: string }    
    ]
}
```

### <code> PATCH /update-partially-data</code>
Request body must follow this format. The IDs must match those items whose title must be updated. No ID match, means no update takes place for that item:
```
{
    data: [
        { userId: number, title: string }, ..., { userId: number, title: string }    
    ]
}
```

### <code> DELETE /delete-data</code>
Request body must follow this format:

1. For any number of specific items to be deleted, you can simply pass in IDs like this. No ID match, means no deletion of that particular item:
```
{
    data: [
        { userId: number }, ..., { userId: number }    
    ]
}
```
<br />

2. To delete the whole dataset, you can pass in an empty array for the data key:
```
{
    data: []
}
```