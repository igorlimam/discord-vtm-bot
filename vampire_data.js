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