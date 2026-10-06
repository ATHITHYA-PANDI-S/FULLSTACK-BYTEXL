require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

// Employee Schema
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

// Employee Model
const Employee = mongoose.model("Employee", employeeSchema);

async function main() {
    try {

        // Connect to MongoDB
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        // Clear previous records
        await Employee.deleteMany({});

        // --------------------------------------------------
        // 1. INSERT 4 EMPLOYEES
        // --------------------------------------------------

        const employees = [
            {
                employeeId: "E101",
                name: "Rahul",
                department: "IT",
                designation: "Software Developer",
                salary: 60000,
                experience: 3,
                skills: ["JavaScript", "Node.js", "MongoDB"],
                status: "Active"
            },
            {
                employeeId: "E102",
                name: "Priya",
                department: "HR",
                designation: "HR Executive",
                salary: 45000,
                experience: 4,
                skills: ["Recruitment", "Communication"],
                status: "Active"
            },
            {
                employeeId: "E103",
                name: "Arjun",
                department: "IT",
                designation: "Senior Developer",
                salary: 85000,
                experience: 7,
                skills: ["Java", "MongoDB", "Spring"],
                status: "Active"
            },
            {
                employeeId: "E104",
                name: "Sneha",
                department: "Finance",
                designation: "Financial Analyst",
                salary: 55000,
                experience: 5,
                skills: ["Excel", "SQL", "Accounting"],
                status: "Active"
            }
        ];

        await Employee.insertMany(employees);

        console.log("\n1. Employees inserted successfully");


        // --------------------------------------------------
        // 2. FIND EMPLOYEES BY DEPARTMENT
        //    WITH EXPERIENCE GREATER THAN GIVEN VALUE
        // --------------------------------------------------

        const department = "IT";
        const minimumExperience = 2;

        const departmentEmployees = await Employee.find({
            department: department,
            experience: {
                $gt: minimumExperience
            }
        });

        console.log(
            "\n2. IT employees with experience greater than 2:"
        );

        console.table(
            departmentEmployees.map(employee => ({
                employeeId: employee.employeeId,
                name: employee.name,
                department: employee.department,
                experience: employee.experience
            }))
        );


        // --------------------------------------------------
        // 3. FIND ONE EMPLOYEE USING employeeId
        // --------------------------------------------------

        const employee = await Employee.findOne({
            employeeId: "E101"
        });

        console.log("\n3. Employee with employeeId E101:");
        console.log(employee);


        // --------------------------------------------------
        // 4. DISPLAY ONLY SELECTED FIELDS
        //    name, designation, salary, department
        // --------------------------------------------------

        const selectedEmployees = await Employee.find(
            {},
            {
                _id: 0,
                name: 1,
                designation: 1,
                salary: 1,
                department: 1
            }
        );

        console.log(
            "\n4. Name, Designation, Salary and Department:"
        );

        console.table(selectedEmployees);


        // --------------------------------------------------
        // 5. UPDATE DESIGNATION AND SALARY
        //    USING employeeId
        // --------------------------------------------------

        const updatedEmployee = await Employee.findOneAndUpdate(
            {
                employeeId: "E101"
            },
            {
                $set: {
                    designation: "Senior Software Developer",
                    salary: 70000
                }
            },
            {
                new: true
            }
        );

        console.log("\n5. Updated employee E101:");
        console.log(updatedEmployee);


        // --------------------------------------------------
        // 6. INCREASE SALARY OF ALL EMPLOYEES
        //    IN A DEPARTMENT BY 10%
        // --------------------------------------------------

        const salaryDepartment = "IT";
        const percentage = 10;

        await Employee.updateMany(
            {
                department: salaryDepartment
            },
            {
                $mul: {
                    salary: 1.10
                }
            }
        );

        console.log(
            `\n6. Salary increased by ${percentage}% for ${salaryDepartment} employees`
        );


        // --------------------------------------------------
        // 7. FIND EMPLOYEES WITHIN SALARY RANGE
        // --------------------------------------------------

        const minSalary = 50000;
        const maxSalary = 90000;

        const salaryRangeEmployees = await Employee.find({
            salary: {
                $gte: minSalary,
                $lte: maxSalary
            }
        });

        console.log(
            `\n7. Employees with salary between ${minSalary} and ${maxSalary}:`
        );

        console.table(
            salaryRangeEmployees.map(employee => ({
                employeeId: employee.employeeId,
                name: employee.name,
                salary: employee.salary,
                department: employee.department
            }))
        );


        // --------------------------------------------------
        // 8. DELETE ONE EMPLOYEE USING employeeId
        // --------------------------------------------------

        const deletedEmployee = await Employee.findOneAndDelete({
            employeeId: "E102"
        });

        console.log("\n8. Deleted employee:");
        console.log(deletedEmployee);


        // --------------------------------------------------
        // 9. DISPLAY REMAINING EMPLOYEES
        //    SORTED BY SALARY DESCENDING
        // --------------------------------------------------

        const remainingEmployees = await Employee.find()
            .sort({
                salary: -1
            });

        console.log(
            "\n9. Remaining employees sorted by salary descending:"
        );

        console.table(
            remainingEmployees.map(employee => ({
                employeeId: employee.employeeId,
                name: employee.name,
                department: employee.department,
                designation: employee.designation,
                salary: employee.salary,
                experience: employee.experience,
                status: employee.status
            }))
        );

    } catch (error) {

        console.log("Error:", error);

    } finally {

        await mongoose.connection.close();

        console.log("\nMongoDB connection closed");
    }
}

main();