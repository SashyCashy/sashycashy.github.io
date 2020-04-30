/*
  Author: Sashank Pindiproli 
  Name: debouncing.js
  Purpose: This file is used to get the results of the news api using debounce feature    
*/

let counter = 0;

const fetchNews = () => {
  let keyword = document.getElementById('newsText').value;
  let parent = document.getElementById('news-container');
  parent.innerHTML = '';
  fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&from=2020-03-30&sortBy=publishedAt&apiKey=d0de553ab1e54b409519e274d12ded76`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Here', data);
      if (data.status === 'error') {
        document.getElementById('counter').innerHTML = 0;
      } else {
        document.getElementById('counter').innerHTML = data.articles.length;

        for (let record of data.articles) {
          let child = document.createElement('div');
          child.innerHTML = `<div class="card" onclick="window.open('${record.url}', '_blank');">
            <img src=${record.urlToImage} alt="Avatar" style="width:100%; height:200px">
              <div class="container">
                <h4><b>${record.title}</b></h4>
                <p>${record.description}</p>
              </div>
          </div>`;
          child = child.firstChild;
          parent.appendChild(child);
        }
      }
    });
};
const debounce = (fn, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

const debounceProductSearchCall = debounce(fetchNews, 1000);
