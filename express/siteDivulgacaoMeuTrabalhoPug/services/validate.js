const validate = {

    arrayResponse: [],
    thereIsError: false,

    requestBodyData: function (objectValidate, req) {

        this.arrayResponse = { 
            error: [], 
            status: false, 
            message: 'Preencha os campos obrigatórios!',
            statusColor: 'warning',
            color: 'red',
            isClearFields: false 
        };

        Object.entries(objectValidate).forEach(([fieldName, conditions]) => {
            this.thereIsError = false;
            conditions.forEach(condition => {
                this.isNullOrEmpty(condition, req.body[fieldName], fieldName);
                this.minMaxCharacters(condition, req.body[fieldName], fieldName);
                this.validateEmail(condition, req.body[fieldName], fieldName);
            });
        });
    },



    isNullOrEmpty: function (condition, value, fieldName) {
        if (condition === 'isNullOrEmpty' && !this.thereIsError)
            if (value == '' || value == null) {
                this.createResponseObject(fieldName);
                this.thereIsError = true;
            }
    },



    minMaxCharacters: function (condition, value, fieldName) {
        if (condition.includes('_') && !this.thereIsError) {
            const conditionArray = condition.split('_');
            if (conditionArray[0] === 'min') {
                if (value.length < parseInt(conditionArray[1])) {
                    this.createResponseObject(fieldName, `Deve conter mais de ${conditionArray[1]} caracteres`);
                    this.thereIsError = true;
                }
            } else if (conditionArray[0] === 'max') {
                if (value.length > parseInt(conditionArray[1])) {
                    this.createResponseObject(fieldName, `Deve conter menos de ${conditionArray[1]} caracteres`);
                    this.thereIsError = true;
                }
            }
        }
    },



    validateEmail: function (condition, value, fieldName) {
        if (condition === 'validateEmail' && !this.thereIsError) {
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(value)) {
                this.createResponseObject(fieldName, `Email não é valido`);
                this.thereIsError = true;
            }
        }
    },


    createResponseObject: function (fieldName, message = 'Campo obrigatório') {
        this.arrayResponse.error.push({ status: false, incorrectFieldName: fieldName, message });
    }

}

module.exports = {
    validate
}