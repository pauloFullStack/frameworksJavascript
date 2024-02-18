export const validate = {

    arrayResponse: {},
    thereIsError: false,

    requestBodyData: function (objectValidate, req, type = 'nodejs') {

        this.arrayResponse = {
            error: [],
            status: false,
            message: 'Preencha os campos obrigatórios!',
            statusColor: 'warning',
            color: 'red',
            isClearFields: false,
            data: {},
            backgroundColor: '#ee8787',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" style="color: #fff;" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
          </svg>`
        };

        if (type === 'svelteKit') {

            const formData = req;
            req = { body: {} };

            for (const [key, value] of formData) {
                req.body[key] = value;
            }

            this.arrayResponse.data = req.body;
        }

        Object.entries(objectValidate).forEach(([fieldName, conditions]) => {
            this.thereIsError = false;
            conditions.forEach(condition => {
                this.isNullOrEmpty(condition, req.body[fieldName], fieldName);
                this.minMaxCharacters(condition, req.body[fieldName], fieldName);
                this.validateEmail(condition, req.body[fieldName], fieldName);
            });
        });

        if (this.arrayResponse.error.length > 0) {
            this.arrayResponse.data = {};
        }else{
            this.arrayResponse.error = false
        }

        return this.arrayResponse;
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
