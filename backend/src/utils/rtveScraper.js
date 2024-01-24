import * as cheerio from 'cheerio';

const mainURL = 'https://www.rtve.es/play/videos/modulos/capitulos/';

const rtveCategories = {
    'somos-cine': 61150,
    'cine-internacional': 77590,
    'cine-de-siempre': 136150
};


async function getHtml(url) {

    try {
        console.log(`Fetching...\nURL: ${url}`);
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Could not fetch`);
        }        
        const html = await response.text();
        return html;


    } catch(error) {
        console.error(error);
    }
}

async function scrapImdbLink(name, id, categoryName){    
    const nameFormatted = name.toLowerCase().replaceAll(' ', '-')

    const url = `https://www.rtve.es/play/videos/${categoryName}/${nameFormatted}/${id}/`

    const html = await getHtml(url)
    const $ = cheerio.load(html)
    const imdbURL =  $('.logo_imdb').attr('href')

    if (imdbURL != undefined){
        const imdbId =  imdbURL.split('/')[4]
        return imdbId
    };   

};

async function scrapCategory(categoryId, categoryName){

    const url = mainURL + categoryId;   

    const movies = [];
    let pageNumber = 1;

    while(true){
        const fullUrl = `${url}?page=${pageNumber}`;   
        const html = await getHtml(fullUrl);

        if (html === undefined){break};
        
        const $ = cheerio.load(html);        
        const allMovies = $('div .cellBox');

        
        allMovies.each(async (index, elemnet) => {
            const id = elemnet.attribs['data-idasset'];            
            const name = $(elemnet).find('.maintitle').text();
            const imdbId = await scrapImdbLink(name, id, categoryName)
   
            movies.push({id: id, name: name, imdbId: imdbId});          
        });
        
        pageNumber ++;
    }    
    return movies;    
}


export async function scrapAllCategories() {
  
    const allCategories = [];

    for(const category in rtveCategories){        
        const array = {categoryName: category, categoryId: rtveCategories[category], movies: []};
                    
        const movies = await scrapCategory(rtveCategories[category], category);      
        array.movies = movies;        
        allCategories.push(array);
    }

    return allCategories;
};
