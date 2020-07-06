//VIN number for 1981 to present is standardized for 17 digits
//0-9 and capital letters allowed
const validate = (value) => {
    let errors = {};
    var str = String(value);
    if (!value) {
        errors.vinRequest = 'A VIN number is required';
    } else if (str.length < 17 || str.length > 17 || !/[0-9|A-Z]{17}/.test(str)) {
        errors.vinRequest = 'Incorrect VIN Entry';
    }
    return errors;
}

export default validate;