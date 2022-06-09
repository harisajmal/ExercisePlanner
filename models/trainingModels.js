const nedb = require('nedb');
class achievements {

    constructor(dbFilePath) {
        if (dbFilePath) {
            this.db = new nedb({ filename: dbFilePath, autoload: true });
            console.log('connected to db', dbFilePath);
        } else {
            this.db = new nedb();
            console.log('db connected in-memory');
        }
    }
    init() {
        this.db.insert({

            exercise: 'Cardio',
            level: 'easy',
            dateset: '12/02/2021',
            name: 'haris'

        })
        console.log('db entry haris inserted');
    }
    getAllEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('getAllEntries promise rejected', err);
                } else {
                    resolve(entries);
                    console.log('getAllEntries promise resolved', entries)
                }
            })
        })
    }
    getHarisEntries() {
        return new Promise((resolve, reject) => {
            this.db.find({ name: 'haris' }, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('getHarisEntries promise rejected', err);
                } else {
                    resolve(entries);
                    console.log('getHarisEntries promise resolved with', entries);
                }
            })
        })
    }
    getEntriesByName(name) {
        return new Promise((resolve, reject) => {
            this.db.find({ name: name }, function(err, entries) {
                if (err) {
                    reject(err);
                    console.log('getEntriesByUser Promise rejected', name, err);
                } else {
                    resolve(entries);
                }
            })
        })
    }
    addEntry(exercise, level, dateset, name) {
        var entry = {
            exercise: exercise,
            level: level,
            dateset: dateset,
            name: name,
            published: new Date().toISOString().split('T')[0]
        }
        console.log('entry created', entry);
        this.db.insert(entry, function(err, doc) {
            if (err) {
                console.log('Error inserting document', level);
            } else {
                console.log('document inserted into the database', doc);
            }
        })
    }
    deleteEntry(id) {
        this.db.remove({ _id: id }, {}, function(err, rem) {
            if (err) {
                console.log('error in deleteEntry ', err);
            } else {
                console.log(rem, 'entries deleted');
            }
        })
    }
    editEntry(id, name) {
        this.db.update({ _id: id }, { $set: { name: name } }, (err, numUpdated) => {
            err ? console.log(`Error updating task: ${id}`) : console.log(`${numUpdated} task updated in database`)
        });
    }
}
module.exports = achievements;