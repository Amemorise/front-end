type StringKey = "name" | "password" | "email";

type ValidationParams = {
    isRequired?: boolean;
    isEmail?: boolean;
    value: string;
    minLength?: number;
};

type ObjectToValidate = {
    [key in StringKey]?: ValidationParams;
};

export type ErrorMessages = {
    [key in StringKey]?: string[];
};

class FormValidator {
    /**
     * Validate Login
     * @param str
     * @returns boolean
     */
    static validEmail(str: string) {
        let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return regex.test(str);
    }

    /**
     * Minimum length of string
     * @param str
     * @param length
     * @returns
     */
    static minLength(str: string, length: number) {
        let isInvalid = false;

        if (str.length < length) {
            isInvalid = true;
        }

        return isInvalid;
    }
    /**
     * Form Validator
     * @param  obj
     * @returns
     */
    static validator(obj: ObjectToValidate) {
        let keys = Object.entries(obj);
        let tempResults: ErrorMessages[] = [];
        let validations = null;

        keys.map((key) => {
            if (key[1].isRequired) {
                if (key[1].value.length === 0) {
                    tempResults.push({
                        [key[0]]: [`The ${key[0]} is required.`],
                    });
                } else {
                    if (key[1].isEmail) {
                        let isValidEmail = FormValidator.validEmail(key[1].value);

                        if (!isValidEmail) {
                            tempResults.push({
                                [key[0]]: [`The ${key[0]} must be valid email.`],
                            });
                        }
                    }

                    if (key[1].minLength && FormValidator.minLength(key[1].value, key[1].minLength)) {
                        tempResults.push({
                            [key[0]]: [`The ${key[0]} must at least ${key[1].minLength} characters.`],
                        });
                    }
                }
            } else if (key[1].isEmail) {
                let isValidEmail = FormValidator.validEmail(key[1].value);

                if (!isValidEmail) {
                    tempResults.push({
                        [key[0]]: [`The ${key[0]} must be valid email`],
                    });
                }
            } else if (key[1].minLength && FormValidator.minLength(key[1].value, key[1].minLength)) {
                tempResults.push({
                    [key[0]]: [`The ${key[0]} must at least ${key[1].minLength} characters.`],
                });
            }
            return tempResults;
        });
        const results: ErrorMessages = Object.assign({}, ...tempResults.map((result) => result));

        if (Object.keys(results).length > 0) {
            validations = {
                errors: results,
            };
        } else {
            validations = null;
        }

        return validations;
    }
}

export default FormValidator;
