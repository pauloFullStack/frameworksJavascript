const { utility } = require("../utility");
const section = require('../../models/section');

const editSection = {

    index: async function (statusRedirect = 'success') {

        const sections = await section.findAll({ order: [['createdAt', 'DESC']] });        
        // Fazer a logica para retornar até o inicio com a setar voltar , fazer um array salvando cada posição e pegar sempre o ultimmo voltando...
        // Fazer ocoording , para colocar cada pagina, ver como fazer puro com css e javascript...
        let body = "";
        sections.forEach(section => {
            body += `
            <tr>
                <td>${section.title}</td>
                <td>${section.description}</td>
                <td>${section.icon}</td>
                <td>${section.position}</td>
            </tr>`;
        });

        const tableSettings = {
            titles: ['Titulo', 'Descrição', 'Icone', 'Posição'],
            body
        };


        return {
            // loadListener: [
            //     { typeEvent: 'click', element: '.card-primary-library, .bi-arrow-left', alias: 'redirect', isASingleSelector: false },
            // ],
            status: statusRedirect,
            html: utility.table('Seções', tableSettings)
        }
    },

    // entender a regra de adicionar pagina e seção, mudar o nome do select 'Posição' para 'Paginas' e nos options colocar ,pagina 1, pagina 2... e também mudar o nome do selecte 'Tipo' para 'Card de destino' ou algo do tipo analisar e também mudar o nome 'Parametro rota' analisar qual colocar, e fazer o back end para trazer so as rotas permitidas apartir dos selects selecionado anteriores....

    // fazer o crud para atualizar, deletar as seções... refotarar estrutura , adicionar repositories e organizar todo o codigo

    // depois reescrever todo o conteudo do site e adicionar um botão para biblioteca que criei

    // alimentar a biblioteca com todos os meus conhecimentos guardados na pasta geral

    // depois estudar aws, docker, kubernet... depois criar uma estrutura simples , com docker, .net mvc e blazor, fazer um sitema de estoque para criar essa estrutura simples com docker, .net e blazor, para depois mostrar para os meninos o que acha... criar , services, repositories ...
    formAdd: function (statusRedirect = 'success') {
        return {
            loadListener: [
                { typeEvent: 'click', element: '#apiFull', alias: 'btnSaveSection', isASingleSelector: true },
                { typeEvent: 'input', element: 'input, textarea, select', alias: 'listenToInputs', isASingleSelector: false },
                { typeEvent: 'click', element: '.select-clear', alias: 'listenToSelects', isASingleSelector: false }

            ],
            status: statusRedirect,
            html: `
            <div class="grid-container section card-edit-form" >
                <div class="quantity-columns-12">
                    <div class="flex-row-style">
                        <h2>Adicionar seção </h2>
                    </div>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <input class="input-style" id="title" type="text" placeholder="Titulo" />
                    <span class="span-notification-style" id="titleNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <input class="input-style" id="description" type="text" placeholder="Descrição" />
                    <span class="span-notification-style" id="descriptionNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <textarea class="input-style" id="icon" type="text" placeholder="Icon"></textarea>
                    <span class="span-notification-style" id="iconNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <select class="input-style" id="position">
                        <option value="">Posição</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <span class="span-notification-style" id="positionNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <select class="input-style" id="sectionType">
                        <option value="">Tipo</option>
                        <option value="page">Seção/Pagina</option>
                        <option value="section">Seção/Seção</option>
                    </select>
                    <span class="span-notification-style" id="sectionTypeNotification"></span>
                </div>
                <div class="quantity-columns-3 col-mobile-6">
                    <select class="input-style" id="routeParameter">
                        <option value="">Parametro rota</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <span class="span-notification-style" id="routeParameterNotification"></span>
                </div>
                <div class="quantity-columns-12">
                    <div class="flex-row-style">
                        <button class="btn-hover-primary" id="apiFull" method="POST" selectors="#title, #description, #icon, #position, #sectionType, #routeParameter" url="api/edit/section/add" >
                            Salvar
                        </button>
                    </div>
                </div>
            </div>`
        }
    },
}


module.exports = {
    editSection
}