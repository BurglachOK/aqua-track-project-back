const parseContactType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return null;
    const validTypes = ['work', 'home', 'personal'];
    return validTypes.includes(contactType) ? contactType : null;
};

const parseIsFavourite = (isFavourite) => {
    if (isFavourite === undefined || isFavourite === '') return null;
    if (isFavourite === 'true') return true;
    if (isFavourite === 'false') return false;
    return null;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedContactType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
    return {
        type: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};
