const { query } = require("../util/mysql");

const course = (courseID) => new Promise((resolve, reject) => {
    query("SELECT * FROM `sdumanager`.`courselist` WHERE `courseID` = ?", [courseID])
        .then(
            rows => {
                let { courseID, courseName, teacherName, credit, time, address, capacity, remains } = rows[0];
                resolve({ courseID, courseName, teacherName, credit, time, address, capacity, remains });
            }
        ).catch(err => reject(err));
})

module.exports = course;