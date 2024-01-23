import * as cheerio from 'cheerio';

const mainURL = 'https://www.rtve.es/play/videos/modulos/capitulos/';

const rtveCategories = {
    somosCine: 61150,
    cineInternacional: 77590,
    cineDeSiempre: 136150
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

async function scrapCategory(url){

    const movies = [];
    let pageNumber = 1;

    while(true){
        const fullUrl = `${url}?page=${pageNumber}`;   
        const html = await getHtml(fullUrl);

        if (html === undefined){break};
        
        const $ = cheerio.load(html);        
        const allMovies = $('div .cellBox');

        
        allMovies.each((index, elemnet) => {
            const id = elemnet.attribs['data-idasset'];            
            const name = $(elemnet).find('.maintitle').text();            
            movies.push({id: id, name: name});          
        })
        
        pageNumber ++;
    }    
    return movies;    
}


export async function scrapAllCategories() {
    
    const allCategories = [];

    for(const category in rtveCategories){        
        const array = {categoryName: category, categoryId: rtveCategories[category], movies: []};  

        const url = mainURL + rtveCategories[category];         
        const movies = await scrapCategory(url);       

        array.movies = movies;        
        allCategories.push(array);
    }

    return allCategories;
};
