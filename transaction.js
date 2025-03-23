// Not that we cant do transaction in Mongodb Compass be cause it was running in standAlone
// want to change into replica set


// Create a MongoClient instance and connect to your MongoDB server.
const { configure } = require('dotenv')
configure()
const { MongoClient } = require("mongodb");

async function main() {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        // Start a session to use for the transaction.
        const session = client.startSession();
        session.startTransaction();

        // Use the session object to perform multiple operations
        const database = client.db(process.env.DB_NAME);
        const collection1 = database.collection("collection1");
        const collection2 = database.collection("collection2");

        try {
            await collection1.insertOne({ name: "Alice" }, { session });
            await collection2.insertOne({ name: "Bob" }, { session });

            // If all operations succeed, commit the transaction.
            await session.commitTransaction();
            console.log("Transaction committed.");
        } catch (error) {
            // If any operation fails, abort the transaction.
            await session.abortTransaction();
            console.error("Transaction aborted due to an error:", error);
        } finally {

            // End the session after committing or aborting the transaction.
            session.endSession();
        }
    } finally {

        // Close the MongoDB client to clean up resources.
        await client.close();
    }
}

main().catch(console.error);

