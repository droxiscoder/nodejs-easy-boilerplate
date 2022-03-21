
const getPagination = (page, size) => {
    const limit = size ? +size : undefined;
    const offset = page ? page * limit : undefined;

    return { limit, offset };
};

module.exports = getPagination;