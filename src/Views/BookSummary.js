import React, {useState} from "react";
import {Button, Label} from "reactstrap";
import {TextPlaceHolder} from "../utils/placeholders";
import {UpdateModal} from "./UpdateModal";
import {AddBookModal} from "./AddBookModal";
import {DeleteModal} from "./DeleteModal";

export const BookSummary = ({book, refreshList, booksList}) => {
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [isNewBookOpen, setNewBookOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const isReady = booksList.fulfilled || booksList.isError;
  const isEmpty = isReady && booksList.data.length === 0;

  const toggleUpdate = () => setUpdateOpen(!isUpdateOpen);
  const toggleNewBook = () => setNewBookOpen(!isNewBookOpen);
  const toggleDelete = () => setDeleteOpen(!isDeleteOpen);

  return (
    <>
      <div className="mb-3">
        {
          (() => {
              if (isEmpty) {
                return (
                  <blockquote>
                    <div>
                      <strong>
                        <em>“All we have to decide is what to do with the time that is given us.”</em>
                      </strong>
                    </div>
                    <small>The Fellowship of the Ring, J.R.R. Tolkein</small>
                  </blockquote>
                )
              } else {
                return (
                  <>
                    <div className="d-flex">
                      <Label for={'book-id'} className="me-2 fw-bold">Title:</Label>
                      <TextPlaceHolder ready={isReady} labelHeight={'18px'} labelWidth={'200px'} light>
                        <div id={'book-id'}>{book.title}</div>
                      </TextPlaceHolder>
                    </div>
                    <div className="d-flex">
                      <Label for={'author-id'} className="me-2 fw-bold">Author:</Label>
                      <TextPlaceHolder ready={isReady} labelHeight={'18px'} labelWidth={'200px'} light>
                        <div id={'author-id'}>{book.author}</div>
                      </TextPlaceHolder>
                    </div>
                    <div className="d-flex">
                      <Label for={'editorial-id'} className="me-2 fw-bold">Editorial:</Label>
                      <TextPlaceHolder ready={isReady} labelHeight={'18px'} labelWidth={'200px'} light>
                        <div id={'editorial-id'}>{book.editorial}</div>
                      </TextPlaceHolder>
                    </div>
                  </>
                )
              }
            }
          )()
        }
        <div className="d-flex justify-content-between">
          <div>
            <Button color={'secondary'} size="sm" className="me-2" onClick={toggleUpdate} disabled={isEmpty}>
              Update
            </Button>
            <Button color={'danger'} size="sm" onClick={toggleDelete} disabled={isEmpty}>Delete</Button>
          </div>
          <Button color={'success'} size="sm" onClick={toggleNewBook}>Add Book</Button>
        </div>
      </div>
      {isUpdateOpen &&
      <UpdateModal book={book} closeModal={toggleUpdate} isOpen={isUpdateOpen} refreshList={refreshList}
      />}
      {isNewBookOpen &&
      <AddBookModal book={book} closeModal={toggleNewBook} isOpen={isNewBookOpen} refreshList={refreshList}/>}
      {isDeleteOpen &&
      <DeleteModal bookId={book._id} bookTitle={book.title} closeModal={toggleDelete} isOpen={isDeleteOpen}
                   refreshList={refreshList}/>}
    </>
  )
}

