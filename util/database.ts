export function database(name:string){
    return JSON.parse(Deno.readTextFileSync("./databases/" + name))
}