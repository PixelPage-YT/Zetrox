import * as harmony from "https://code.harmony.rocks/main"

export async function ready(client:harmony.Client) {
    console.log(`[Info] Client-Benutzername: ${client.user?.username}`)
    console.log(`[Info] Client-ID: ${client.user?.id}`)
}