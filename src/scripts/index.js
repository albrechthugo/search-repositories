let inputElement = document.querySelector('#container .user');
let buttonElement = document.querySelector('#container .search');
let listElement = document.querySelector('#container .repo-list');

let repositories = [];

const searchInfo = () => {    
    let inputText = inputElement.value;
    
    axios.get(`https://api.github.com/users/${inputText}/repos`)
        .then(response => {
            repositories.push(...response.data);
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
        })
        .catch(error => {
            console.warn('Erro na requisição.');
            alert('User does not exist');
    });
};
