
function getLastKey(obj) {
    let keys = Object.keys(obj);
    return keys[keys.length - 1];
}

function getLastValue(obj) {
    let lastKey = getLastKey(obj);
    return obj[lastKey];
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function hasKeys(obj, keys) {
    for (let key of keys) {
        if (!obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

export {
    getLastKey,
    getLastValue,
    isEmptyObject,
    hasKeys,
    deepClone,
    distance,
    sleep
};