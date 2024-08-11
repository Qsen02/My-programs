function errorParser(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            const error = new Error("input error");
            error.errors = Object.fromEntries(Object.values(err.errors).map(el => [el.path, el.message]));
            return error;
        }
    } else if (Array.isArray(err)) {
        const error = new Error("input error");
        error.errors = Object.fromEntries(err.map(el => [el.path, el.msg]));
        return error;
    }
    return err;
}

module.exports = {
    errorParser
}