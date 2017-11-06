module.exports = {
    port: process.env.PORT || 2000,
    db_url: (process.env.NODE_ENV === 'development') ? 'mongodb://127.0.0.1:27017/dbmsniket' : 'mongodb://admin:admin@ds249325.mlab.com:49325/cms',
    saltRounds: 10
    //db_url: ''    //TODO: Enter production url here
}