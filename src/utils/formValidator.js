const hasOwnProperty = (obj, key) =>
  Object.prototype.hasOwnProperty.call(obj, key);
export { hasOwnProperty };

const isValidated = (obj) => {
  let result;
  const array = Object.keys(obj);
  for (let i = 0; i < array.length; i += 1) {
    const item = obj[array[i]];
    if (!item) {
      result = false;
    }
  }
  if (typeof result === 'undefined') {
    result = true;
  }
  return result;
};
export { isValidated };

const setField = (obj, validation, formMessage) => {
  const fieldName = Object.keys(obj)[0];
  if (obj[fieldName]) {
    if (obj[fieldName].hasError) {
      validation[fieldName] = false;
      formMessage[fieldName] = obj[fieldName].message;
    } else {
      validation[fieldName] = true;
      formMessage[fieldName] = '';
    }
  }
  return { validation, formMessage };
};
export { setField };

const syntax = (key, value) => {
  const response = {};
  switch (key) {
    case 'email': {
      const invalidType = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      if (!invalidType) {
        response.hasError = true;
        response.message = `Please enter a valid ${key}`;
      }
      break;
    }
    default:
      break;
  }
  return response;
};

const required = (fieldName, value) => {
  const response = {};
  if (value.length === 0) {
    response.hasError = true;
    response.message = `${fieldName} is Required. Please fill this field`;
  } else {
    response.hasError = false;
    response.message = '';
  }
  return response;
};

const length = (fieldName, value, valueLength) => {
  const response = {};
  const { min, max } = valueLength;
  if (value.length < min) {
    response.hasError = true;
    response.message = `The ${fieldName} must be at least ${min} characters`;
  } else if (value.length > max) {
    response.hasError = true;
    response.message = `The ${fieldName} can be up to ${max} characters`;
  } else {
    response.hasError = false;
    response.message = '';
  }
  return response;
};

export default (obj) => {
  const fieldsArray = [];
  const resultObj = {};
  let fieldName;
  let res;
  fieldsArray.push(...Object.getOwnPropertyNames(obj));
  for (let i = 0; i < fieldsArray.length; i += 1) {
    const fieldObj = obj[fieldsArray[i]];
    fieldName = fieldsArray[i];
    const isRequired = hasOwnProperty(fieldObj, 'isRequired');
    if (isRequired) {
      res = required(fieldName, fieldObj.value);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
    const isLength = hasOwnProperty(fieldObj, 'length');
    if (isLength) {
      res = length(fieldName, fieldObj.value, fieldObj.length);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
    const isSyntax = hasOwnProperty(fieldObj, 'syntax');
    if (isSyntax) {
      res = syntax(fieldName, fieldObj.value);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
  }
  resultObj[fieldName] = true;
  return resultObj;
};
