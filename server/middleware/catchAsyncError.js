module.exports = wrapperFunction => (req, res, next) => {
    Promise.resolve(wrapperFunction(req, res, next)).catch(next);
    
    // wraper the wrapper which is the function that expects req, res, next
    // as parameters and does the actual asynchronous operation and likely to
    // produce error.
}