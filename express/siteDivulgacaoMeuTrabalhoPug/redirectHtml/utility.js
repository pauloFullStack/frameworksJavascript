const utility = {

    toGoBack: function (req) {

        try {
            
            const toGoBack = `
                        <svg style="margin-bottom:.8rem;cursor:pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" redirect="${req.body.pageId !== '' ? 'library/section' : req.body.redirect}" position="${req.body.returnToPreviousPosition}" routeParameter="${req.body.returnToPreviousPosition}" returnToPreviousPosition="${req.body.position}" pageId="${req.body.pageId !== '' ? '' : req.body.pageId}" fill="currentColor" class="bi bi-arrow-left"
                        redirect="library/section" style="cursor:pointer" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>`;



            return toGoBack;

        } catch (e) {
            console.log(e)
        }


    },

    subMenuEdit: function (endpointList, endpointAdd) {
        return `<style>
        .card-primary-library {
            /* box-shadow: 2px 2px 4px 2px rgba(1, 1, 1, 0.2); */
            border: 0 solid transparent;
            background: transparent;
            padding: 0;
            border-radius: 0;
            margin-bottom: 0;
            border-radius: 1rem;
            color: var(--color-black);
            cursor: pointer;
        }
    </style>
    <div class="grid-container section">
        <div class="quantity-columns-1 col-mobile-1">
            <div class="to-go-back flex-row-style subMenuEdit card-primary-library" redirect="${endpointList}"
                isSelected="true">
                <div class="paragraph-card flex-row-left-style">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-card-list" viewBox="0 0 16 16">
                        <path
                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                        <path
                            d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="quantity-columns-1 col-mobile-1">
            <div class="to-go-back flex-row-style subMenuEdit card-primary-library" redirect="${endpointAdd}">
                <div class="paragraph-card flex-row-left-style">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                    </svg>
                </div>
            </div>
        </div>
    </div>`;
    },


    table: function (title, tableSettings) {

        let tableTitles = "";
        tableSettings.titles.forEach(title => {
            tableTitles += `<th>${title}</th>`;
        });



        return `
        <div class="card-edit-form" >
            <div style="padding: 1rem 0" >
                <h3>${title}</h3>        
            </div>
            <style>
            /* Estilos básicos para a tabela */
            .table-responsive {
                display: block;
                width: 100%;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
              }
              
              .table {
                width: 100%;
                max-width: 100%;
                margin-bottom: 1rem;
                border-collapse: collapse;
              }
              
              .table-bordered {
                border: 1px solid #dee2e6;
              }
              
              .table-bordered th,
              .table-bordered td {
                border: 1px solid #dee2e6;
              }
              
              .table-striped tbody tr:nth-of-type(odd) {
                background-color: #f9f9f9;
              }
              
              th {
                text-align: left;
                vertical-align: bottom;
                padding: 1rem;
                border-bottom: 2px solid #dee2e6;
              }
              
              td {
                padding: 0.5rem;
                vertical-align: middle;
                border-bottom: 1px solid #dee2e6;
              }
        </style>
            <div class="table-responsive">
                <table class="table" >
                    <thead>
                        <tr>
                            ${tableTitles}
                        </tr>
                    </thead>
                    <tbody>
                        ${tableSettings.body}
                    </tbody>
                </table>
            </div>
        </div>`;
    },
}


module.exports = {
    utility
}