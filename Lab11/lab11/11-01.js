const http = require('http');
const url = require("url");
const Service = require('./service').Service;
const DB = require('./database').DB;

const database = new DB();
const service = new Service();

http.createServer((req, res) => {
    let pathname = decodeURI(url.parse(req.url).pathname);
    let path = pathname.split('/')[1] + '/' + pathname.split('/')[2];
    let codeParameter = pathname.split('/')[3];
    let additionalParameter = pathname.split('/')[4];

    if (req.method === 'GET' && pathname === '/') {
        service.getIndexFile(req, res);
    } else if (req.method === 'GET') {
        switch (path) {
            case 'api/faculties':
                console.log('GET api/faculties');
                service.getHandler(req, res, database.getFaculties);
                break;
            case 'api/pulpits':
                console.log('GET api/pulpits');
                service.getHandler(req, res, database.getPulpits);
                break;
            case 'api/subjects':
                console.log('GET api/subjects');
                service.getHandler(req, res, database.getSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('GET api/auditoriumstypes');
                service.getHandler(req, res, database.getAuditoriumsTypes);
                break;
            case 'api/auditoriums':
                console.log('GET api/auditoriums');
                service.getHandler(req, res, database.getAuditoriums);
                break;
            case 'api/faculty':
                console.log(`GET api/faculty/${codeParameter}/${additionalParameter}`);
                if (codeParameter === undefined || additionalParameter === undefined || additionalParameter !== "pulpits") {
                    service.errorHandler(res, 400, 'Invalid parameters');
                } else {
                    service.getHandler(req, res, database.getPulpitsByFaculty, codeParameter);
                }
                break;
            case 'api/auditoriumtypes':
                console.log(`GET api/auditoriumtypes/${codeParameter}/${additionalParameter}`);
                if (codeParameter === undefined || additionalParameter === undefined || additionalParameter !== "auditoriums") {
                    service.errorHandler(res, 400, 'Invalid parameters');
                } else {
                    service.getHandler(req, res, database.getAuditoriumsByAuditoriumType, codeParameter);
                }
                break;
            default:
                service.errorHandler(res, 404, 'Not found');
                break;
        }
    } else if (req.method === 'POST') {
        switch (path) {
            case 'api/pulpits':
                console.log('POST api/pulpits');
                service.workWithPulpit(req, res, database.insertPulpits);
                break;
            case 'api/subjects':
                console.log('POST api/subjects');
                service.workWithSubject(req, res, database.insertSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('POST api/auditoriumstypes');
                service.workWithAuditoriumType(req, res, database.insertAuditoriumTypes);
                break;
            case 'api/auditoriums':
                console.log('POST api/auditoriums');
                service.workWithAuditorium(req, res, database.insertAuditoriums);
                break;
            default:
                service.errorHandler(res, 404, 'Not found');
                break;
        }
    } else if (req.method === 'PUT') {
        switch (path) {
            case 'api/faculties':
                console.log('PUT api/faculties');
                service.workWithFaculty(req, res, database.updateFaculties);
                break;
            case 'api/pulpits':
                console.log('PUT api/pulpits');
                service.workWithPulpit(req, res, database.updatePulpits);
                break;
            case 'api/subjects':
                console.log('PUT api/subjects');
                service.workWithSubject(req, res, database.updateSubjects);
                break;
            case 'api/auditoriumstypes':
                console.log('PUT api/auditoriumstypes');
                service.workWithAuditoriumType(req, res, database.updateAuditoriumTypes);
                break;
            case 'api/auditoriums':
                console.log('PUT api/auditoriums');
                service.workWithAuditorium(req, res, database.updateAuditoriums);
                break;
            default:
                service.errorHandler(res, 404, 'Not found');
                break;
        }
    } else if (req.method === 'DELETE') {
        if (codeParameter === undefined || codeParameter === "") {
            service.errorHandler(res, 400, 'Invalid parameters');
        }
        switch (path) {
            case 'api/faculties':
                console.log('DELETE api/faculties');
                service.deleteHandler(req, res, database.deleteFaculty, codeParameter);
                break;
            case 'api/pulpits':
                console.log('DELETE api/pulpits');
                service.deleteHandler(req, res, database.deletePulpit, codeParameter);
                break;
            case 'api/subjects':
                console.log('DELETE api/subjects');
                service.deleteHandler(req, res, database.deleteSubject, codeParameter);
                break;
            case 'api/auditoriumstypes':
                console.log('DELETE api/auditoriumstypes');
                service.deleteHandler(req, res, database.deleteAuditoriumType, codeParameter);
                break;
            case 'api/auditoriums':
                console.log('DELETE api/auditoriums');
                service.deleteHandler(req, res, database.deleteAuditorium, codeParameter);
                break;
            default:
                service.errorHandler(res, 404, 'Not found');
                break;
        }
    } else {
        service.errorHandler(res, 405, 'Incorrect method');
    }
}).listen(3000, () => console.log('Server is running at http://localhost:3000'));

