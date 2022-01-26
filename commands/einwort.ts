import * as harmony from "https://code.harmony.rocks/main"

export async function einwort(i:harmony.Interaction,client:harmony.Client) {
    // WIP
    if(i.isApplicationCommand()){
        let current = Deno.readTextFileSync("./einwortGeschichte.txt")
        if(i.option<string>("wort") == undefined){
            i.respond({
                embeds: [
                    {
                        "title": ":book: 1 Wort Geschichte :book:",
                        "description": "Die 1 Wort Geschichte ist eine Geschichte, in der jeder 1 Wort nacheinander schreibt - und das ganze global! Das Ziel ist es, eine coole oder lustige Geschichte zu vollendenden.",
                        "color": 44469,
                        "fields": [
                          {
                            "name": "Was bisher geschar",
                            "value": current.slice(current.length - 20)
                          },
                          {
                            "name": "Wie es weiter geht",
                            "value": "Du kannst ein neues Wort hinzufügen!\nFühre dazu /einwort <Dein Wort> aus!"
                          },
                          {
                            "name": "Die gesamte Geschichte",
                            "value": "https://zetrox.neocities.org/geschichte.txt"
                            }
                        ],
                        "footer": {
                          "text": "⇢ Zetrox von Folizza Studios",
                          "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                        },
                        "thumbnail": {
                          "url": "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_960_720.jpg"
                        }
                      }
                ]
            })
        }else{
            let wort = i.option<string>("wort")
            if(wort.indexOf(" ") == -1 && wort.length < 20){
                let last = Deno.readTextFileSync("./databases/einwortLast.txt")
                if(i.member && last != i.member?.id){
                    current += " " + wort
                    Deno.writeTextFileSync("./einwortGeschichte.txt", current)
                    Deno.writeTextFileSync("./databases/einwortLast.txt", i.member.id)
                    //uploadGe()
                    i.respond({
                        embeds: [
                            {
                                "title": ":book: 1 Wort Geschichte :book:",
                                "description": "Erfolgreich hinzugefügt!",
                                "color": 44469,
                                "fields": [
                                    {
                                        "name": "Was bisher geschar",
                                        "value": current.slice(current.length - 20)
                                    },
                                    {
                                        "name": "Die gesamte Geschichte",
                                        "value": "https://zetrox.neocities.org/geschichte.txt"
                                    }
                                ],
                                "footer": {
                                    "text": "⇢ Zetrox von Folizza Studios",
                                    "icon_url": "https://sph-download.neocities.org/share/GoDaddyStudioPage-0%202.png"
                                },
                                "thumbnail": {
                                    "url": "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_960_720.jpg"
                                }
                            }
                        ]
                    })
                }else{
                    i.respond({
                        content:":x: Du hast gerade schon ein Wort geschrieben! :x:"
                    })
                }
            }else{
                i.respond({
                    content:":x: Bitte gebe nur ein Wort an! :x:"
                })
            }
        }
    }
}

// export async function uploadGe(){
//     const form2 = new FormData()
//     form2.append("geschichte.txt",Deno.readTextFileSync("./einwortGeschichte.txt"))
//     fetch( "https://zetrox:hasehase@neocities.org/api/upload", {
//         method: 'POST', 
//         headers:form2
//     } )
//         .then( response => response.json() )
//         .then( response => {
//             console.log(response)
//         } );
// }