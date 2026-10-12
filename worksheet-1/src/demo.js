const { MongoClient } = require("mongodb");

const uri =
    "mongodb://user_44zxcyvmd:p44zxcyvmd@db01.dbhost.dev:5050/db_44zxcyvmd";

const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db("db_44zxcyvmd");
        const products = db.collection("products");

        await products.insertMany([
            {
                productId: 101,
                productName: "Laptop",
                category: "Electronics",
                price: 55000,
                quantity: 10,
                supplier: "Dell"
            },
            {
                productId: 102,
                productName: "Mouse",
                category: "Electronics",
                price: 800,
                quantity: 25,
                supplier: "Logitech"
            },
            {
                productId: 103,
                productName: "Keyboard",
                category: "Electronics",
                price: 1500,
                quantity: 20,
                supplier: "HP"
            },
            {
                productId: 104,
                productName: "Chair",
                category: "Furniture",
                price: 4500,
                quantity: 15,
                supplier: "IKEA"
            },
            {
                productId: 105,
                productName: "Table",
                category: "Furniture",
                price: 7000,
                quantity: 8,
                supplier: "WoodCraft"
            }
        ]);

        console.log("\n1. Five products inserted successfully");

        console.log("\n2. Electronics Products:");

        const electronics = await products
            .find({ category: "Electronics" })
            .toArray();

        console.log(electronics);

        console.log("\n3. Find one product:");

        const product = await products.findOne({
            productId: 101
        });

        console.log(product);

        console.log("\n4. Product Name, Price and Quantity:");

        const selectedProducts = await products
            .find({})
            .project({
                _id: 0,
                productName: 1,
                price: 1,
                quantity: 1
            })
            .toArray();

        console.log(selectedProducts);

        await products.updateOne(
            { productId: 101 },
            {
                $set: {
                    price: 60000,
                    quantity: 12
                }
            }
        );

        console.log("\n5. Price and quantity updated");

        await products.updateOne(
            { productId: 102 },
            {
                $set: {
                    productName: "Wireless Mouse",
                    supplier: "Logitech India"
                }
            }
        );

        console.log("\n6. Product updated using productId");

        await products.deleteOne({
            productId: 105
        });

        console.log("\n7. Product with productId 105 deleted");

        console.log("\n8. Final Product Records:");

        const finalProducts = await products
            .find({})
            .toArray();

        console.log(finalProducts);

    } catch (error) {
        console.log("Error:", error);

    } finally {
        await client.close();
    }
}

main();