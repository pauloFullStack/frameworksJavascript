import { section } from "../../../../model/section";
import { validate } from "../../../../lib/validate";

export const actions = {
    create: async ({ cookies, request }) => {
        const data = await request.formData();
        
        const res = validate.requestBodyData({ title: ['isNullOrEmpty', 'min_3'], description: ['isNullOrEmpty', 'min_3'], icon: ['isNullOrEmpty', 'min_10'], position: ['isNullOrEmpty', 'min_1'], sectionType: ['isNullOrEmpty', 'min_4'], routeParameter: ['isNullOrEmpty', 'min_1'] }, data.entries(), 'svelteKit')

        try {

            if (!res.error) {
                await section.create(res.data);
                res.status = true;
                res.message = 'Adicionado com sucesso';
                res.data = {};
                res.isClearFields = true;
                res.backgroundColor = 'aquamarine'          
                res.svg = `<span style="color:#000;padding: .5rem;background-color:#fff;border-radius:.5rem" >OK</span>`;      
            }
            
            return res;

        } catch (error) {
            console.log(error)
        }
    },
};