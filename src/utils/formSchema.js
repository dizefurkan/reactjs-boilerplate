export default (fieldName, fieldValue) => {
  let schema = {};
  switch (fieldName) {
    case 'username': {
      schema = {
        [fieldName]: {
          isRequired: true,
          length: {
            min: 5,
            max: 40,
          },
          value: fieldValue,
        },
      };
      break;
    }
    case 'email': {
      schema = {
        [fieldName]: {
          isRequired: true,
          length: {
            min: 5,
            max: 40,
          },
          value: fieldValue,
          syntax: true,
        },
      };
      break;
    }
    case 'password': {
      schema = {
        [fieldName]: {
          isRequired: true,
          length: {
            min: 8,
            max: 40,
          },
          value: fieldValue,
        },
      };
      break;
    }
    case 'name': {
      schema = {
        [fieldName]: {
          isRequired: true,
          length: {
            min: 8,
            max: 40,
          },
          value: fieldValue,
        },
      };
      break;
    }
    case 'surname': {
      schema = {
        [fieldName]: {
          isRequired: true,
          length: {
            min: 8,
            max: 40,
          },
          value: fieldValue,
        },
      };
      break;
    }
    default:
      break;
  }
  return schema;
};
