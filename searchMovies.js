const search = document.getElementById('appendedPrependedInput');
const urlApi = 'https://kopalniafilmow.pl/api/v1/video?search=';

const selectTag = document.querySelector('.input-append');
const divMoviesList = document.createElement('div');
divMoviesList.id = 'matchList';
divMoviesList.style.position = 'absolute';
divMoviesList.style.zIndex = '1';
divMoviesList.style.width = '28%';
divMoviesList.style.backgroundColor = '#fff';
selectTag.after(divMoviesList);

const searchMovies = async searchText => {
    const respose = await fetch(urlApi + searchText);
    const movies = await respose.json();
    
    if(searchText.length >= 3) {
        outputHtml(movies);
    }
    
    if(searchText.length < 3) {
        divMoviesList.innerHTML = ''; 
	}
};

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(
            match => `
                    <div style='
                        color: #000; 
                        width: 100%; 
                        white-space: nowrap; 
                        overflow: hidden; 
                        text-overflow: ellipsis;
                    '> 
                        <a 
                            href='${match.link}' 
                            style='color: #000;'>
                            ${match.title}
                        </a>
                    </div>
            `).join('');
        divMoviesList.innerHTML = html;
    } 
}

search.addEventListener('input', () => searchMovies(search.value));
