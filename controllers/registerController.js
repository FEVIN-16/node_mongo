
const userDb = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users = data
    }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {

    console.log("handleuser is triggered...!");
    const { user, pwd } = req.body;
    if (!user || !pwd) {
        return res.status(400).json({ "message": "username and password are required..!" });

    }
    const duplicate = userDb.users.find(person => person.username === user);
    console.log("Duplicated entry", duplicate, ", current user:", user, " Password:", pwd);
    if (duplicate) {
        console.log("duplicate is checked..!");
        return res.sendStatus(409);
    }
    console.log("Not a duplicate..!");
    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const newUser = {
            "username": user,
            "password": hashedPwd,
            "roles": {
                "User": 2001
            },
        };
        userDb.setUsers([...userDb.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(userDb.users)
        );
        console.log(userDb.users);
        return res.status(201).json({ "success": `new user ${newUser} added successfully..!` });
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports = { handleNewUser };