const hasOwnProperty = (field, key) => {
  const result = Object.prototype.hasOwnProperty.call(field, key);
  return result;
};

export { hasOwnProperty };

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
  response.type = fieldName;
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
  let res;
  fieldsArray.push(...Object.getOwnPropertyNames(obj));
  for (let i = 0; i < fieldsArray.length; i += 1) {
    const field = obj[fieldsArray[i]];
    const fieldName = fieldsArray[i];
    const isRequired = hasOwnProperty(field, 'isRequired');
    if (isRequired) {
      res = required(fieldName, field.value);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
    const isLength = hasOwnProperty(field, 'length');
    if (isLength) {
      res = length(fieldName, field.value, field.length);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
    const isSyntax = hasOwnProperty(field, 'syntax');
    if (isSyntax) {
      res = syntax(fieldName, field.value);
      if (res.hasError) {
        resultObj[fieldName] = res;
        return resultObj;
      }
    }
  }
  return resultObj;
};
