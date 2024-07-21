import rp from 'request-promise';
import $ from 'cheerio';

const urlDisciplines = "https://docs.google.com/document/d/1GMCWygwa8hh9ygY0YMCsPptlAas3tfUDPLYCIBbSPaE/edit";

const gethomePage = () => {
  rp(urlDisciplines)
  .then((html) => {
    console.log(html);
  }).catch((err) => {
    console.log(err);
  })
}

export const getDiscipline = (discipline) => {
  gethomePage();
}

export const clans = []
gethomePage();

//https://medium.com/@acpanjan/download-google-drive-files-using-wget-3c2c025a8b99
//fileid="1GMCWygwa8hh9ygY0YMCsPptlAas3tfUDPLYCIBbSPaE"
//filename="disciplines.docx"
//wget --load-cookies /tmp/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies /tmp/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=${fileid}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=${fileid}" -O disciplines.docx && rm -rf /tmp/cookies.txt
//wget --no-check-certificate "https://docs.google.com/uc?export=download&id=$fileid" -O $filenamehttps://docs.google.com/document/d/1GMCWygwa8hh9ygY0YMCsPptlAas3tfUDPLYCIBbSPaE/edit?usp=sharing