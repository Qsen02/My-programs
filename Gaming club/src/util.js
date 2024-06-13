function errorParser(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            err.errors = [err.message];
        }
    } else if (Array.isArray(err)) {
        let error = new Error("Input error");
        error.errors = Object.fromEntries(err.map(el => [el.path, el.msg]));
        return error;
    }
    return err;
}

module.exports = {
    errorParser
}