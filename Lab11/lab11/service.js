const fs = require("fs");

class Service {


    getIndexFile = (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(fs.readFileSync("./index.html"));
    };

    // ============================ GET =====================================
    getHandler = (req, res, databaseFunc, parameter = null) => {
        if (parameter !== null) {
            databaseFunc(parameter)
                .then(records => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(records.recordset, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        } else {
            databaseFunc()
                .then(records => {
                    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                    res.end(JSON.stringify(records.recordset, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        }
    }

    // ============================ POST, PUT =====================================

    workWithPulpit = (req, res, databaseFunc) => {
        let json = '';
        req.on('data', chunk => {
            json += chunk;
        });

        req.on('end', () => {
            json = JSON.parse(json);
            if (req.method === 'POST') {
                if (json.PULPIT === undefined || json.PULPIT_NAME === undefined || json.FACULTY === undefined) {
                    this.errorHandler(res, 422, "Invalid pulpit parameters");
                    return;
                }
                else if (json.PULPIT.trim() === "" || json.PULPIT_NAME.trim() === "" || json.FACULTY.trim() === "") {
                    this.errorHandler(res, 422, "Invalid pulpit parameters");
                    return;
                }
            }
            if (json.PULPIT === undefined || json.PULPIT.trim() === "") {
                this.errorHandler(res, 422, "Invalid pulpit code");
                return;
            }
            databaseFunc(json.PULPIT, json.PULPIT_NAME, json.FACULTY)
                .then(() => {
                    res.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        });
    }
    workWithSubject = (req, res, databaseFunc) => {
        let json = '';
        req.on('data', chunk => {
            json += chunk;
        });

        req.on('end', () => {
            json = JSON.parse(json);
            if (req.method === 'POST') {
                if (json.SUBJECT === undefined || json.SUBJECT_NAME === undefined || json.PULPIT === undefined) {
                    this.errorHandler(res, 422, "Invalid subject parameters");
                    return;
                }
                else if (json.SUBJECT.trim() === "" || json.SUBJECT_NAME.trim() === "" || json.PULPIT.trim() === "") {
                    this.errorHandler(res, 422, "Invalid subject parameters");
                    return;
                }
            }
            if (json.SUBJECT === undefined || json.SUBJECT.trim() === "") {
                this.errorHandler(res, 422, "Invalid subject code");
                return;
            }
            databaseFunc(json.SUBJECT, json.SUBJECT_NAME, json.PULPIT)
                .then(() => {
                    res.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        });
    }
    workWithAuditoriumType = (req, res, databaseFunc) => {
        let json = '';
        req.on('data', chunk => {
            json += chunk;
        });

        req.on('end', () => {
            json = JSON.parse(json);
            if (req.method === 'POST') {
                if (json.AUDITORIUM_TYPE === undefined || json.AUDITORIUM_TYPENAME === undefined) {
                    this.errorHandler(res, 422, "Invalid auditorium type parameters");
                    return;
                }
                else if (json.AUDITORIUM_TYPE.trim() === "" || json.AUDITORIUM_TYPENAME.trim() === "") {
                    this.errorHandler(res, 422, "Invalid auditorium type parameters");
                    return;
                }
            }
            if (json.AUDITORIUM_TYPE === undefined || json.AUDITORIUM_TYPE.trim() === "") {
                this.errorHandler(res, 422, "Invalid auditorium type code");
                return;
            }
            databaseFunc(json.AUDITORIUM_TYPE, json.AUDITORIUM_TYPENAME)
                .then(() => {
                    res.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        });
    }
    workWithAuditorium = (req, res, databaseFunc) => {
        let json = '';
        req.on('data', chunk => {
            json += chunk;
        });

        req.on('end', () => {
            json = JSON.parse(json);
            if (req.method === 'POST') {
                if (json.AUDITORIUM === undefined || json.AUDITORIUM_NAME === undefined
                    || json.AUDITORIUM_CAPACITY === undefined || json.AUDITORIUM_TYPE === undefined) {
                    this.errorHandler(res, 422, "Invalid auditorium parameters");
                    return;
                }
                else if (json.AUDITORIUM.trim() === "" || json.AUDITORIUM_NAME.trim() === ""
                    || !Number(json.AUDITORIUM_CAPACITY) || json.AUDITORIUM_TYPE.trim() === "") {
                    this.errorHandler(res, 422, "Invalid auditorium parameters");
                    return;
                }
            }
            if (json.AUDITORIUM === undefined || json.AUDITORIUM.trim() === "") {
                this.errorHandler(res, 422, "Invalid auditorium code");
                return;
            }
            if (!Number(json.AUDITORIUM_CAPACITY)) {
                this.errorHandler(res, 422, "Invalid auditorium capacity");
                return;
            }
            databaseFunc(json.AUDITORIUM, json.AUDITORIUM_NAME, json.AUDITORIUM_CAPACITY, json.AUDITORIUM_TYPE)
                .then(() => {
                    res.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        });
    }

    workWithFaculty = (req, res, databaseFunc) => {
        let json = '';
        req.on('data', chunk => {
            json += chunk;
        });

        req.on('end', () => {
            json = JSON.parse(json);
            databaseFunc(json.FACULTY, json.FACULTY_NAME)
                .then(() => {
                    res.end(JSON.stringify(json, null, 4));
                })
                .catch(err => {
                    this.errorHandler(res, 422, err.message);
                });
        });
    }

    // ============================ DELETE =====================================

    deleteHandler = (req, res, databaseFunc, param) => {
        databaseFunc(param)
            .then(() => {
                res.end(JSON.stringify({key: param}, null, 4));
            })
            .catch(err => {
                this.errorHandler(res, 422, err.message);
            });
    }

    errorHandler = (res, errorCode, errorMessage) => {
        res.writeHead(errorCode, 'Error while processing the request', {'Content-Type': 'application/json; charset=utf-8'});
        res.end(JSON.stringify({errorCode: errorCode, errorMessage: errorMessage}, null, 4));
    }

}

exports.Service = Service;