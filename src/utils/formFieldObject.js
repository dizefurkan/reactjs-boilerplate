export default (fieldName, fieldValue) => {
  let formObject = {};
  switch (fieldName) {
    case 'username': {
      formObject = {
        username: {
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
      formObject = {
        email: {
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
      formObject = {
        password: {
          isRequired: true,
          length: {
            min: 6,
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
  return formObject;
};
