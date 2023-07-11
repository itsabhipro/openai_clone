import {surpriseMePrompts} from "../constants";
export default function getRendomPrompts(){
    const randomIndex = Math.floor(Math.random()* surpriseMePrompts.length);
    
    return surpriseMePrompts[randomIndex];
}