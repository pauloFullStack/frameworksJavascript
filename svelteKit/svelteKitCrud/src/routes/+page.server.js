import { fetchAllData } from "../../controller/section";


export async function load() {
   return {
      sections: await fetchAllData()
   };
}
