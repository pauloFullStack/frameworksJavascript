const { utility } = require("../utility");
const page = require('../../models/page');

const singlePage = {

    index: async function (req, statusRedirect = 'success') {


        const pageData = await page.findAll({
            attributes: ['title', 'content'],
            where: {
                sectionId: req.body.pageId
            }
        });

        let contentOfThePages = "";
        let count = 0;
        let loadListenerLocal = [];

        // Criar tela de login e tabela de login, autenticação... olha no projeto do hugo, la tem pronto a autenticação
        pageData.forEach(element => {
            contentOfThePages += `
            <style>
    
            .accordion-item {
                margin-bottom: 2rem;
                background-color:#ffffff;
            }
    
            .accordion-input {
                display: none;
            }
    
            .accordion-label {
                display: block;
                padding: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }
    
            .accordion-content {
                max-height: 0;
                overflow: hidden;
            }
    
            .accordion-content-open {
                background-color: #202124;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom: solid 1px #000;
                color: #fff;
                padding: 1.5rem;
            }
    
            .accordion-input:checked+.accordion-label+.accordion-content {
                max-height: 1000px;
                /* Ajuste este valor conforme necessário */
            }
    
            body {
                background-color: #f9f9f9 !important;
            }
            </style>
            <div id="accordio-${count}" class="accordion-item" close="0" >
                <input type="checkbox" class="accordion-input" id="section${count}">
                <label class="accordion-label" for="section${count}">${element.title}</label>
                <div class="accordion-content">
                    ${element.content}
                </div>
            </div>
            
            `;

            loadListenerLocal.push({ typeEvent: 'click', element: `#accordio-${count}`, alias: 'collapse', isASingleSelector: true });

            count++;
        });

        

        loadListenerLocal.push({ typeEvent: 'click', element: '.bi-arrow-left', alias: 'redirect', isASingleSelector: true });

        return {
            loadListener: loadListenerLocal,
            status: statusRedirect,
            html: `
            ${utility.toGoBack(req)}
            ${contentOfThePages}`
        }
    },
}


module.exports = {
    singlePage
}