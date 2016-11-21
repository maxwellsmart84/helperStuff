
// Used for checking if a sub object/nested object has ANY props/keys
export function isEmptyObj(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

export function isEmptyArr(arr) {
  if (exists(arr)) {
    if (arr.length === 0) {
      return true;
    }
    return false;
  }
  return true;
}
// Used for sub-object patching will not work on nested objects(yet)
export function hasPropValues(obj) {
  for (const prop in obj) {
    if (exists(obj[prop])) {
      return true;
    }
  }
  return false;
}

export function checkNestedExists(obj, prop) {
  const propArgs = prop.split('.');
  let object = obj;
  for (let i = 0; i < propArgs.length; i++) {
    const propArg = propArgs[i];
    if (exists(object) && propArg in object) {
      object = object[propArg];
    } else {
      return false;
    }
  }
  return true;
}


export function exists(item) {
  if (typeof item !== 'undefined' && item !== null) {
    return true;
  }
  return false;
}

// Used for cloning "deep" objects (3 or more) this is one of the better methods of doing this see: http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// I am leaving this in here in case we run into problems with SQL booleans somehow converting to strings.
export function sqlBoolean(obj) {
  if (typeof obj === 'string') {
    return !!parseInt(obj, 10);
  }
  return !!obj;
}

//WORK OFF THIS ONE
export function stringToNull(item) {
  const newObj = item;
  for (const prop in newObj) {
    if (typeof newObj[prop] === 'object' && newObj[prop] !== null) {
      stringToNull(newObj[prop]);
    } else if (!Array.isArray(newObj[prop])) {
      Object.keys(newObj).filter((key) => {
        if (typeof newObj[key] === 'string' && newObj[key].length === 0) {
          newObj[key] = null;
        }
      });
    } else {
      newObj[prop].filter((key) => {
        if (typeof newObj[key] === 'string' && newObj[key].length === 0) {
          newObj[key] = null;
        }
      });
    }
  }
  return newObj;
}
