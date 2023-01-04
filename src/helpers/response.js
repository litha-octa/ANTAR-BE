//const { response } = require('express');

const writeResponse = (res, header, status, result) => {
    let response;
    if (header) {
        res.header(header);
    }
    if (result) {
        response = {
            success: true,
            result,
        };
    }

    res.status(status).json(response);
};

const writeError = (res, status, error) => {
    let response;
    if (error) {
        response = {
            error,
        };
    }
    res.status(status).json(response);
};
// const writeError = (res, status, err) => {
//     res.status(status).json(new Error(err));
// };

const writeResponsePaginated = (res, status, result, info) => {
    let response = {};
    if (result) {
        response = {
            ...response,
            success: true,
            result,
        };
    }
    if (info) {
        response = {
            ...response,
            info,
        };
    }
    res.status(status).json(response);
};

module.exports = {
    writeResponse,
    writeError,
    writeResponsePaginated,
};