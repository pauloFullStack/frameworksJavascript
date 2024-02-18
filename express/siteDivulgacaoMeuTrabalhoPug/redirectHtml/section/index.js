const { utility } = require("../utility");
const section = require('../../models/section');
const page = require('../../models/page');
const { Sequelize, Op } = require("sequelize");

const sections = {

    index: async function (req, statusRedirect = 'success') {
        try {

            req.body.position = req.body.position != null ? req.body.position : '1';
            const datas = await section.findAll({
                attributes: ['id', 'title', 'description', 'icon', 'position', 'sectionType', 'routeParameter'],
                where: {
                    position: req.body.position
                },

            });


            let sectionsBody = `<style>.card-primary-library {
                border: 2px solid transparent;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
    
            .card-primary-library:hover{
                border: 2px solid #000;
            }
    
            body {
                background-color: #f1f1f1;
            }</style>`;
            if (datas.length > 0) {



                datas.forEach(data => {

                    sectionsBody += `                            
                    <div class="quantity-columns-2 col-mobile-6">
                        <div redirect="library/${data.sectionType}" position="${data.routeParameter}" returnToPreviousPosition="${data.position}" routeParameter="${data.routeParameter}" pageId="${data.sectionType === 'section' ? '' : data.id}" class="to-go-back card-primary-library">
                            <div class="paragraph-card flex-row-space-around-style">
                                ${data.icon}
                            </div>
                            <div class="paragraph-card text-center">
                                <h4 class="color-primary">
                                    ${data.title}                                    
                                </h4>
                            </div>
                        </div>
                    </div>`
                });

                return {
                    loadListener: [
                        { typeEvent: 'click', element: '.card-primary-library, .bi-arrow-left', alias: 'redirect', isASingleSelector: false },
                    ],
                    status: statusRedirect,
                    html: `            
                    ${req.body.position !== '1' ? utility.toGoBack(req) : ''}
                        <div id="experience" class="grid-container section">
                            ${sectionsBody}
                        </div>`
                }
            }

            return {
                loadListener: [
                    { typeEvent: 'click', element: '.bi-arrow-left', alias: 'redirect', isASingleSelector: false },
                ],
                status: statusRedirect,
                html: `
                    ${req.body.position !== '1' ? utility.toGoBack(req) : ''}            
                    <div class="flex-row-style">
                        <h1>Nenhuma seção encontrada</h1>
                    </div>`
            }

        } catch (e) {
            console.log(e);
        }

    },
}


module.exports = {
    sections
}