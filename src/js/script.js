{
  'use strictt';

  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    favoriteBook: 'favorite',
    bookImage: 'book__image',
    bookFilters: '.filters',
    hiddenBooks: 'hidden',
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };
  const bookListWrapper = document.querySelector(select.booksList);
  const bookFiltersWrapper = document.querySelector(select.bookFilters);

  const favoriteBooks = [];
  const filters = [];


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
          favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
          clickedElement.classList.remove(select.favoriteBook);
        }
      }
    });

    bookFiltersWrapper.addEventListener('click', function(event){
      const clickedElement = event.target;
      if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          console.log('value:', clickedElement.value);
          filterBooks();
        } else {
          filters.splice(filters.indexOf(clickedElement.value), 1);
          filterBooks();
        }
        console.log('filters:', filters);
      }
    });

  };

  const filterBooks = function(){
    for(const book of dataSource.books){
      let shouldBeHidden = false;
      const toBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

      for(const filter of filters){
        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        toBeHidden.classList.add(select.hiddenBooks);
      } else {
        toBeHidden.classList.remove(select.hiddenBooks);
      }
    }
  };

  render();
  initActions();
}
