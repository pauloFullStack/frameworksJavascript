const connectDB = require('../config/db');

const post = async (data, model, arrayValidate) => {

    try {

        if (arrayValidate.arrayResponse.error.length === 0) {

            await model.create(data.body);
            return {
                status: true,
                message: 'Adicionado com sucesso!',
                statusColor: 'success',
            }
        }

        return arrayValidate.arrayResponse;

    } catch (e) {
        return {
            status: false,
            message: 'Erro de conexão tente novamente!',
            statusColor: 'warning',
            color: 'red',
            isClearFields: false
        }
    }
}

const put = async (updateSettings, req, arrayValidate) => {

    try {

        if (arrayValidate.arrayResponse.length === 0) {

            let replaceFields = {};

            updateSettings[0].forEach(field => {
                replaceFields[field] = req.body[field];
            });

            const query = `UPDATE ${updateSettings[2]} SET ${updateSettings[1][0]} WHERE ${updateSettings[1][1]} `;

            const result = await connectDB.query(query, {
                replacements: {
                    ...replaceFields
                },
                type: connectDB.QueryTypes.UPDATE
            });

            return {
                status: true,
                message: 'Alterado com sucesso!'
            }

        }

        return arrayValidate.arrayResponse;

    } catch (error) {
        return {
            status: false,
            message: 'Erro de conexão tente novamente!',
        }
    }
};



const destroy = async (model, condition) => {

    try {

        const result = await model.destroy({
            where: {
                ...condition
            }
        });

        if (result != 0) {
            return {
                status: true,
                message: 'Deletado como sucesso!',
            }
        } else {
            return {
                status: false,
                message: 'Item não encontrado!',
            }
        }

    } catch (e) {
        return {
            status: false,
            message: 'Erro de conexão tente novamente!',
        }
    }
};


const selectCustomData = async (gettingTheReplacements, query) => {

    try {

        const results = await connectDB.query(query, {
            replacements: { ...gettingTheReplacements },
            type: connectDB.QueryTypes.SELECT,
        });


        if (results.length > 0) {
            return {
                status: true,
                data: results,
            }
        } else {
            return {
                status: false,
                message: 'Nenhum resultado encontrado!',
            }
        }

    } catch (e) {
        return {
            status: false,
            message: 'Erro de conexão tente novamente!',
        }
    }
}


module.exports = {
    post,
    put,
    destroy,
    selectCustomData
}

