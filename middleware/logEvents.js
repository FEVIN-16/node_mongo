
const fs=require('fs');
const path=require('path');

const LogRequest = (req) => {
    const logFilePath = path.join(__dirname, '../public/logs/log_1.txt');
    const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format

    fs.mkdir(path.join(__dirname, '../public/logs'), { recursive: true }, (err) => {
        if (err) {
            console.error(`Error creating logs directory: ${err.message}`);
            return;
        }

        // Format the log message
        const logMessage = `${currentDateTime} - ${req.method}: ${req.url}\n`;

        // Append the log message to the log file
        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error(`Error writing to log file: ${err.message}`);
                return;
            }
            
        });
    });
};

const logger=(req,res,next)=>{
    LogRequest(req);
    // console.log(`${req.method} ${req.path}`);
    next();
}

module.exports={logger};