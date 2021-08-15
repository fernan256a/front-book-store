import './App.scss';
import {BookTable} from "./Views/BookTable";
import {BookSummary} from "./Views/BookSummary";
import {Container} from "reactstrap";
import {useEffect, useState} from "react";
import {useListBook} from "./hooks/useListBooks";
import Header from "./Views/Header";

const App = () => {
  const [selectedBook, setSelectedBook] = useState({title: '', author: '', editorial: '',});
  const [booksList, refreshList] = useListBook();

  useEffect(() => {
    if (booksList.fulfilled) {
      const firstBook = booksList.data ? booksList.data[0] : {};
      setSelectedBook(firstBook);
    }
  }, [booksList.isLoading])

  return (
    <Container className="pt-4">
      <Header/>
      <BookSummary book={selectedBook} refreshList={refreshList} booksList={booksList}/>
      <BookTable booksList={booksList} setSelectedBook={setSelectedBook}/>
    </Container>
  );
}

export default App;
