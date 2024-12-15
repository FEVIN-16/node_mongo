const data={
    employees:require('../model/employees.json'),
    setEmployees:function(data){this.employees=data}
};



const getAllEmployees=(req,res)=>{
    res.json(data.employees);
}

const createNewEmployee=(req,res)=>{
    const newEmployee={
        id:data.employees[data.employees.length-1].id +1,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    }
    if(!newEmployee.firstName || !newEmployee.lastName){
        res.status(400).json({"error":"First Name and Last Name is required...!"});
    }
    data.setEmployees([...data.employees,newEmployee]);
    res.status(200).json(data.employees);
}

const updateEmployee = (req, res) => {
    // Find the employee by ID
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    
    if (!employee) {
        // Return an error if the employee is not found
        return res.status(400).json({ "error": `User id:${req.body.id} not available...!` });
    }

    // Update employee details
    if (req.body.firstName) {
        employee.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
        employee.lastName = req.body.lastName;
    }

    // Create a sorted updated array
    const updatedArray = data.employees.map(emp =>
        emp.id === parseInt(req.body.id) ? employee : emp
    );

    const sortedArray = updatedArray.sort((a, b) => a.id - b.id);

    // Update the data source
    data.setEmployees(sortedArray);

    // Respond with the updated employees list
    res.json(data.employees);
};


const deleteEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    
    if (!employee) {
        // Return an error if the employee is not found
        return res.status(400).json({ "error": `User id:${req.body.id} not available...!` });
    }

    // Use filter() to exclude the employee with the specified ID
    const updatedArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    
    // Update the data source
    data.setEmployees(updatedArray);

    // Respond with the updated employees list
    res.json(data.employees);
};

const getEmployee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));

    if (!employee) {
        // Return after sending the error response
        return res.status(400).json({ "error": `User id:${req.params.id} not available...!` });
    }

    // Respond with the employee data
    res.json(employee);
};


module.exports={
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}