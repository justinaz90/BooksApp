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

  class BooksList {

    constructor(){
      const thisBooksList = this;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.bookListWrapper = document.querySelector(select.booksList);
      thisBooksList.bookFiltersWrapper = document.querySelector(select.bookFilters);

      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    render(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.templateBook(book);
        const element = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(select.booksList);
        booksContainer.appendChild(element);
      }
    }

    initActions(){
      const thisBooksList = this;

      thisBooksList.bookListWrapper.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains(select.bookImage)){

          const bookId = clickedElement.getAttribute('data-id');

          if(!clickedElement.classList.contains(select.favoriteBook)){
            thisBooksList.favoriteBooks.push(bookId);
            clickedElement.classList.add(select.favoriteBook);
          } else {
            thisBooksList.favoriteBooks.splice(thisBooksList.favoriteBooks.indexOf(bookId), 1);
            clickedElement.classList.remove(select.favoriteBook);
          }
        }
      });

      thisBooksList.bookFiltersWrapper.addEventListener('click', function(event){
        const clickedElement = event.target;
        if(clickedElement.tagName === 'INPUT' && clickedElement.type === 'checkbox' && clickedElement.name === 'filter'){

          if(clickedElement.checked){
            thisBooksList.filters.push(clickedElement.value);
            console.log('value:', clickedElement.value);
            thisBooksList.filterBooks();
          } else {
            thisBooksList.filters.splice(thisBooksList.filters.indexOf(clickedElement.value), 1);
            thisBooksList.filterBooks();
          }
          console.log('filters:', thisBooksList.filters);
        }
      });
    }

    filterBooks(){
      const thisBooksList = this;

      for(const book of thisBooksList.data){
        let shouldBeHidden = false;
        const toBeHidden = document.querySelector('.book__image[data-id="' + book.id + '"]');

        for(const filter of thisBooksList.filters){

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
    }

    determineRatingBgc(rating){
      let bgc = '';

      if(rating < 6){
        bgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }
      if(rating > 6 && rating <= 8){
        bgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }
      if(rating > 8 && rating <= 9){
        bgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }
      if(rating > 9){
        bgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return bgc;
    }
  }
  const app = new BooksList();
  app();
}
