const url = 'https://work-out-api1.p.rapidapi.com/search?Muscles=biceps';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd90d74c695mshc15508914646469p1a6202jsnd703efdcfde0',
		'x-rapidapi-host': 'work-out-api1.p.rapidapi.com'
	}
};

export const searchMucleGroup = (query) => {
    return fetch(`https://work-out-api1.p.rapidapi.com/search?Muscles=${query}`,options)
}