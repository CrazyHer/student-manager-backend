const { query } = require("../util/mysql");

const user = (userID) => new Promise((resolve, reject) => {
    query("SELECT * FROM sdumanager.user WHERE `userID` = ?", [userID])
        .then(
            rows => {
                let { name, identity, userID, sex, school, className, tel, degree, profileURL } = rows[0];
                resolve({
                    name,
                    identity,
                    userID,
                    sex,
                    school,
                    className,
                    tel,
                    degree,
                    profileURL
                });
            }
        ).catch(
            err => reject(err)
        );
});

module.exports = user;