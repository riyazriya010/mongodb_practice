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