# LEIAMEMUCHO

Based on [Discord example app](https://github.com/discord/discord-example-app)

# List of commands

application [page](https://discord.com/developers/applications/1259486699302555688/information)

To execute server:
`nodemon app.js`
`nodemon app.js --ignore fetch_document/*`
ngrok was used:
`docker run --net=host -p 9000:9000 -it -e NGROK_AUTHTOKEN=2iv4W81K9hFhDrOntDhjwBqeLus_4sELAxiK2CWGu1kF74zft ngrok/ngrok http 9000`


`commands.js` possess a list of the commands. It is through that file that you can list something.
`app.js` deals with requests.


### Discipline power description

Used aho-corasick to doc from `"https://docs.google.com/document/d/1GMCWygwa8hh9ygY0YMCsPptlAas3tfUDPLYCIBbSPaE/edit"`

`python fetch_doc.py <discipline> <power> -- lowercase separated by '-'`