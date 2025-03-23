# MongoDB Aggregation Queries Reference

### 🟢 Find All Documents
```js
db.users.aggregate([])


```

### 🟢 Group All Documents
```js
// 🛠 Group users by gender
db.users.aggregate([
  { $group: { _id: "$gender", count: { $sum: 1 } } }
]);
🔍 Expected Output:
[
  { "_id": "male", "count": 5 },
  { "_id": "female", "count": 3 }
]
```

### 🟢 Capped Collection
```js

// creating capped collection
db.createCollection("student", { capped: true, size: 1000, max: 4 })

// converting normal collection to capped collection
db.runCommand({ convertToCapped: "student", size:1000 })


// create capped collection with all options
db.createCollection("students", {
  capped: true, // ✅ Enables a capped collection
  size: 1048576, // (1MB) ✅ Maximum size in bytes
  max: 5000, // ✅ Maximum number of documents
  
  storageEngine: { wiredTiger: { configString: "block_compressor=zlib" } }, // ✅ WiredTiger settings

  validator: { // ✅ Schema validation rules
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "age"],
      properties: {
        name: {
          bsonType: "string",
          description: "Must be a string and is required"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          description: "Must be an integer >= 18"
        }
      }
    }
  },

  validationLevel: "strict", // ✅ Applies validation rules strictly
  validationAction: "error", // ✅ Rejects invalid documents (use "warn" to log instead)

  indexOptionDefaults: { // ✅ Default settings for indexes
    storageEngine: { wiredTiger: {} }
  },

  viewOn: "existing_collection", // ✅ Creates a view on an existing collection
  pipeline: [ // ✅ Transforms documents in the view
    { $match: { age: { $gte: 18 } } },
    { $project: { name: 1, age: 1, _id: 0 } }
  ],

  collation: { // ✅ Sets collation for sorting (case-insensitive)
    locale: "en",
    strength: 2
  },

  writeConcern: { // ✅ Ensures write safety
    w: "majority",
    j: true
  }
});

```