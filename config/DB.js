module.exports = {
    // This configuration is only relevant for localhosted test builds, development builds will use a remote mongoDB
    // that is defined by environment variables passed in at run-time.
    // TEST_DB: 'mongodb://localhost:27017/qmethod' // Local DB
    TEST_DB: 'mongodb+srv://admin8:atlas_cits3200d_2343@cits3200d-7ii0f.mongodb.net/v2test1?retryWrites=true'  // Remote DB (New Collection)
};
