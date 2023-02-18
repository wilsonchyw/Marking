export function arrayToObject(array, key = "id") {
    return array.reduce((obj, item) => {
        obj[item[key]] = item;
        return obj;
    }, {});
}
