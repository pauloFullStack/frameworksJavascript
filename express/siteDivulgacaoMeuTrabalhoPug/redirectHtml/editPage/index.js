const { utility } = require("../utility");
const page = require('../../models/page');
const section = require('../../models/section');

const editPage = {

    index: async function (currentRouteId = '', previousRouteId = '', currentRoute = 'library/page', statusRedirect = 'success') {

        page.belongsTo(section, { foreignKey: 'sectionId' })
        const pages = await page.findAll({
            include: [
                {
                    model: section,
                    attributes: ['title']  // Substitua pelos campos que deseja selecionar
                }
            ]
        });

        let body = "";
        pages.forEach(page => {
            body += `
            <tr>
                <td>${page.title} <input type="hidden" id="${page.id}"  value="${page.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}" /> </td>
                <td>${page.section.title}</td>
            </tr>`;
        });

        const tableSettings = {
            titles: ['Titulo', 'Seção'],
            body
        };

        return {
            status: statusRedirect,
            html: utility.table('Paginas', tableSettings)
        }
    },

    // Não esquecer de passar o trim() antes de validar todos os campos
    formAdd: async function (statusRedirect = 'success') {

        const sections = await section.findAll({
            where: {
                sectionType: 'page'
            },
            order: [['createdAt', 'DESC']]
        });

        let optionsForSelection = `<option value="" selected>Vincular seção</option>`;
        sections.forEach(section => {
            optionsForSelection += `
            <option value="${section.id}" >${section.title}</option>`;
        });

        return {
            loadListener: [
                { typeEvent: 'click', element: '#apiFull', alias: 'btnSaveSection', isASingleSelector: true },
                { typeEvent: 'input', element: 'input, textarea, select', alias: 'listenToInputs', isASingleSelector: false },
                { typeEvent: 'click', element: '.select-clear', alias: 'listenToSelects', isASingleSelector: false }

            ],
            status: statusRedirect,
            html: `
            <div class="grid-container section card-edit-form">
                <div class="quantity-columns-12">
                    <div class="flex-row-style">
                        <h2>Adicionar pagina </h2>
                    </div>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <input class="input-style" id="title" type="text" placeholder="Titulo" />
                    <span class="span-notification-style" id="titleNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <select class="input-style" id="sectionId">
                        ${optionsForSelection}
                    </select>
                    <span class="span-notification-style" id="sectionIdNotification"></span>
                </div>
                <div class="quantity-columns-12">
                    <textarea class="input-style" id="content" cols="30" rows="10" placeholder="Conteudo"></textarea>
                    <span class="span-notification-style" id="contentNotification"></span>
                </div>
                <div class="quantity-columns-12">
                    <div class="flex-row-style">
                        <button class="btn-hover-primary" id="apiFull" method="POST" selectors="#title, #sectionId, #content" url="api/edit/page/add" >Salvar</button>
                    </div>
                </div>
            </div>
                `
        }
    },
}


module.exports = {
    editPage
}