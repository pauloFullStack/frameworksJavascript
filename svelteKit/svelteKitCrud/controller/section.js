import { section } from "../model/section";

export const fetchAllData = async () =>  {
   const sections = await section.findAll();
   return sections.map(section => section.toJSON()); 
}