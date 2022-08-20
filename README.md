<img src="https://pbs.twimg.com/profile_banners/1508143076539314187/1650288426/600x200">

# Zetrox

<p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white">
    <img src="https://shield.deno.dev/x/harmony">
</p>

> Zetrox war ein von Folizza Studios betriebener Discord Bot. Er wird nicht mehr weitergeführt bzw. gemaintained.

### Starten

1. Installiere dir [GIT](https://git-scm.com/)
2. Installiere dir [Deno](https://deno.land/)
3. Installiere dir [Visual Studio Code](https://code.visualstudio.com/)
4. Installiere dir in Visual Studio Code
   [das Addon Deno](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)
5. Clone dir diese Repository:
   `git clone https://github.com/PixelPage-YT/Zetrox.git`
6. Erstelle eine Supabase und kopiere den Token.
7. Erstelle eine `config.json` Datei und füge folgenden Inhalt ein:
```json
{
    "token": "Bot token",
    "devtoken": "Der Token für den Test Bot",
    "supabaseToken": "Token zu der Supabase datenbank"
}
```
8. Führe im Repository `dpm dev` aus um den Bot zu starten. Dadurch wird die
   Entwicklungsversion gestartet!
9. Um den richtigen Bot zu starten, führe `dpm prod` aus!