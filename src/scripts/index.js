let inputElement = document.querySelector('#container .user');
let buttonElement = document.querySelector('#container .search');
let listElement = document.querySelector('#container .repo-list');

const searchInfo = () => {    
    let inputText = inputElement.value;
    
    listElement.innerHTML = '';

    renderLoading();

    axios.get(`https://api.github.com/users/${inputText}/repos`)
        .then(response => {
            const repositories = response.data;
            listElement.innerHTML= '';

            renderInfo(repositories);
        })
        .catch(error => {
            console.warn(error);
            alert('User does not exist');
    });
};

const renderLoading = () => {
    listElement.innerHTML = '';

    let loadingElement = document.createElement('li');
        loadingElement = document.createTextNode('Loading...');
        
    listElement.appendChild(loadingElement);
};

const renderInfo = (repositories) => {
    repositories.forEach(item => {
                
        let repoElementLi = document.createElement('li');
        let repoElementA = document.createElement('a');
        let repoAText = document.createTextNode(`${item.full_name}`);
            
            repoElementA.appendChild(repoAText);
            repoElementA.setAttribute('href', `${item.html_url}`);
            repoElementA.setAttribute('target', '_blank')
            
            repoElementLi.appendChild(repoElementA);

            listElement.appendChild(repoElementLi);
    });
};