{
  'use strictt';

  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    favoriteBook: 'favorite',
    bookImage: '.book__image',
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
    const bookImages = bookListWrapper.querySelectorAll(select.bookImage);

    for(let image of bookImages){
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add(select.favoriteBook);
        const bookId = image.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
    }
  };
  render();
  initActions();
}
