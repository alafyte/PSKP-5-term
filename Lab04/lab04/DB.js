const EventEmitter = require('events');


class DB extends EventEmitter {
    db_data = [
        {id: 1, name: 'Иванов И.И.', bday: '12-08-2003'},
        {id: 2, name: 'Петров И.С.', bday: '13-11-2003'},
        {id: 3, name: 'Сидоров М.Ф.', bday: '22-09-2003'},
        {id: 4, name: 'Васильев В.В.', bday: '27-01-2003'},
    ]

    async select() {
        return new Promise((resolve, reject) => {
            resolve(this.db_data);
        });
    };

    async insert(person) {
        return new Promise((resolve, reject) => {
            let personIndex = this.db_data.findIndex(el => el.id == person.id);
            if (personIndex === -1) {
                this.db_data.push(person);
                resolve(person);
            } else {
                reject(createError("Найден человек с id " + person.id));
            }
        })
    };

    async update(person) {
        return new Promise((resolve, reject) => {
            let personIndex = this.db_data.findIndex(el => el.id == person.id);
            if (personIndex !== -1) {
                this.db_data[personIndex] = person;
                resolve(person);
            } else {
                reject(createError("Нет человека с id " + person.id));
            }
        });
    };

    async delete(id) {
        return new Promise((resolve, reject) => {
            let personIndex = this.db_data.findIndex(el => el.id == id);
            if (personIndex !== -1) {
                this.db_data.splice(personIndex, 1);
                resolve(id);
            } else {
                reject(createError("Нет человека с id " + id));
            }
        });
    }
}

const createError = (message) => {
    return {
        error: message
    }
}

module.exports.DB = DB;