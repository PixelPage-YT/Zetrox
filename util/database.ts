export function database(name:string){
    return JSON.parse(Deno.readTextFileSync("./databases/" + name))
}
export function saveDatabase(name:string,data:object){
    Deno.writeTextFileSync("./databases/" + name,JSON.stringify(data))
}