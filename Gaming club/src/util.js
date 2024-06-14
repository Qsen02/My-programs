function errorParser(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            let error = new Error("Input erorr");
            error.errors = Object.fromEntries(Object.values(err.errors).map(el => [el.path, el.message]));
            return error;
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