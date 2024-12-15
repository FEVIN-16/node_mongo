const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if roles are present on the request
        if (!Array.isArray(req.roles)) {
            return res.sendStatus(401); // Unauthorized: Missing roles
        }

        const rolesArray = [...allowedRoles];
        console.log("Roles Array:", rolesArray);
        console.log("req.roles:", req.roles);

        // Check if at least one role matches
        const hasAccess = req.roles.some(role => rolesArray.includes(role));
        if (!hasAccess) {
            return res.sendStatus(403); // Forbidden: Insufficient roles
        }

        next(); // User is authorized
    };
};

module.exports = verifyRoles;
