{
  'use strictt';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',

    },
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };

  const render = function(){
    //const thisList = this;

    for(let book of dataSource.books){
      const generatedHTML = templates.templateBook(book);
      const element = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.containerOf.booksList);
      booksContainer.appendChild(element);
    }
  };
  render();

}
