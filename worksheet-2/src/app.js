const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const employeeSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    skills: {
        type: [String]
    },
    status: {
        type: String,
        required: true
    }
});

const Employee = mongoose.model("Employee", employeeSchema);

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connected to MongoDB");

        await Employee.deleteMany({});

        await Employee.insertMany([
            {
                employeeId: "E101",
                name: "Arun",
                department: "IT",
                designation: "Software Engineer",
                salary: 60000,
                experience: 3,
                skills: ["Java", "MongoDB"],
                status: "Active"
            },
            {
                employeeId: "E102",
                name: "Priya",
                department: "HR",
                designation: "HR Executive",
                salary: 45000,
                experience: 2,
                skills: ["Recruitment", "Communication"],
                status: "Active"
            },
            {
                employeeId: "E103",
                name: "Karthik",
                department: "IT",
                designation: "Senior Developer",
                salary: 85000,
                experience: 6,
                skills: ["Node.js", "MongoDB", "AWS"],
                status: "Active"
            },
            {
                employeeId: "E104",
                name: "Divya",
                department: "Finance",
                designation: "Accountant",
                salary: 50000,
                experience: 4,
                skills: ["Excel", "Accounting"],
                status: "Active"
            }
        ]);

        console.log("1. Four employees inserted successfully");

        const departmentEmployees = await Employee.find({
            department: "IT",
            experience: { $gt: 2 }
        });

        console.log("\n2. IT employees with experience greater than 2:");
        console.log(departmentEmployees);

        const employee = await Employee.findOne({
            employeeId: "E101"
        });

        console.log("\n3. Employee with employeeId E101:");
        console.log(employee);

        const selectedEmployees = await Employee.find({})
            .select("name designation salary department -_id");

        console.log("\n4. Name, Designation, Salary and Department:");
        console.log(selectedEmployees);

        await Employee.updateOne(
            { employeeId: "E101" },
            {
                $set: {
                    designation: "Senior Software Engineer",
                    salary: 70000
                }
            }
        );

        console.log("\n5. E101 designation and salary updated");

        await Employee.updateMany(
            { department: "IT" },
            {
                $inc: {
                    salary: 5000
                }
            }
        );

        console.log("\n6. IT employee salaries increased by 5000");

        const salaryRange = await Employee.find({
            salary: {
                $gte: 50000,
                $lte: 80000
            }
        });

        console.log("\n7. Employees with salary between 50000 and 80000:");
        console.log(salaryRange);

        await Employee.deleteOne({
            employeeId: "E104"
        });

        console.log("\n8. Employee E104 deleted");

        const finalEmployees = await Employee.find({})
            .sort({ salary: -1 });

        console.log("\n9. Remaining employees sorted by salary descending:");
        console.log(finalEmployees);

    } catch (error) {
        console.log("Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

main();