const trainingDA0 = require('../models/trainingModels');
//running in in-memory mode
const db = new trainingDA0();

exports.landing_page = function(req, res) {
    res.redirect('./index.html');
    db.init();
}

exports.entries_list = function(req, res) {
    db.getAllEntries().then((list) => {
        res.render('entries', {
            'title': 'Training',
            'entries': list
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })

}

exports.about_page = function(req, res) {
    res.redirect('./about.html');
}
exports.new_entry = function(req, res) {
    res.render('newEntry', { 'title': 'Training' });
}

exports.haris_entries = function(req, res) {
    res.send('<h1> Haris\'s Entries, in terminal</h1>');
    db.getEntriesByName('haris').then((entries) => {
        console.log(entries);
    })
}

exports.post_new_entry = function(req, res) {
    console.log("Post new entry", req.body.exercise, req.body.level, req.body.dateset, req.body.name);
    db.addEntry(req.body.exercise, req.body.level, req.body.dateset, req.body.name);
    res.redirect('/training');
}

exports.delete_entry = function(req, res) {
    console.log('id in delete_entry', db.deleteEntry(req.params.id));
    res.send('about');
}
exports.edit_entry = function(req, res) {
    console.log('id in edit_entry', db.updateEntry(req.params.id));
    res.send('about');
}