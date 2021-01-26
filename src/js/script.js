{
  'use strictt';

  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    favoriteBook: 'favorite',
    bookImage: 'book__image',
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };
  const bookListWrapper = document.querySelector(select.booksList);

  const favoriteBooks = [];

  const render = function(){

    for(let book of dataSource.books){
      const generatedHTML = templates.templateBook(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.booksList);
      booksContainer.appendChild(element);
    }
  };

  const initActions = function(){

    bookListWrapper.addEventListener('dblclick', function(event){
      event.preventDefault();
      const clickedElement = event.target.offsetParent;

      if(clickedElement.classList.contains(select.bookImage)){

        const bookId = clickedElement.getAttribute('data-id');

        if(!clickedElement.classList.contains(select.favoriteBook)){
          favoriteBooks.push(bookId);
          clickedElement.classList.add(select.favoriteBook);
        } else {
          favoriteBooks.splice(favoriteBooks.indexOf(bookId));
          clickedElement.classList.remove(select.favoriteBook);
        }
      }
    });
  };
  render();
  initActions();
}
