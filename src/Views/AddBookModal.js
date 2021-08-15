import React, {useEffect, useState} from "react";
import {Alert, Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from "reactstrap";
import {useCreateBook} from "../hooks/useCreateBook";

export const AddBookModal = ({isOpen, closeModal, refreshList}) => {
  const [book, setBook] = useState({title: '', author: '', editorial: '', quantity: '', condition: "New"});
  const [creationStatus, createBook] = useCreateBook(book);
  const [isValidForm, setValidForm] = useState({
    title: true,
    author: true,
    editorial: true,
    quantity: true
  });

  useEffect(() => {
    if (creationStatus.fulfilled) {
      refreshList();
      closeModal();
    }
  }, [creationStatus.isLoading])

  const onSubmit = (e) => {
    e.preventDefault();
    const validTitle = book.title.length > 0;
    const validAuthor = book.author.length > 0;
    const validEditorial = book.editorial.length > 0;
    const validQuantity = book.quantity > 0;

    if (validTitle && validAuthor && validEditorial && validQuantity) {
      createBook();
    } else {
      setValidForm({
        title: validTitle,
        author: validAuthor,
        editorial: validEditorial,
        quantity: validQuantity
      })
    }
  }

  return (
    <Modal isOpen={isOpen} centered toggle={closeModal}>
      <ModalHeader toggle={closeModal} className="bg-light py-2">Add book</ModalHeader>
      <ModalBody>
        {creationStatus.isError &&
        <Alert color={'warning'} className="py-1 mb-1"><small>Something went wrong!</small></Alert>}
        <Form onSubmit={onSubmit}>
          <FormGroup className="mb-2">
            <Label for={'title-id'}>Title</Label>
            <Input id={'title-id'} value={book.title} bsSize="sm" invalid={!isValidForm.title}
                   onChange={(e) => setBook({...book, title: e.target.value})}/>
            <FormFeedback>Title cannot be empty!</FormFeedback>
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for={'author-id'}>Author</Label>
            <Input id={'author-id'} value={book.author} bsSize="sm" invalid={!isValidForm.author}
                   onChange={(e) => setBook({...book, author: e.target.value})}/>
            <FormFeedback>Author cannot be empty!</FormFeedback>
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for={'editorial-id'} className="me-2">Editorial</Label>
            <Input id={'editorial-id'} value={book.editorial} bsSize="sm" invalid={!isValidForm.editorial}
                   onChange={(e) => setBook({...book, editorial: e.target.value})}/>
            <FormFeedback>Editorial cannot be empty!</FormFeedback>
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for={'condition-id'}>Condition</Label>
            <Input type="select" id={'condition-id'} bsSize="sm" value={book.condition}
                   onChange={(e) => setBook({...book, condition: e.target.value})}>
              <option>New</option>
              <option>Used</option>
            </Input>
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for={'author-id'} className="me-2">Quantity</Label>
            <Input type="Number" id={'author-id'} value={book.quantity} bsSize="sm" invalid={!isValidForm.quantity}
                   onChange={(e) => setBook({...book, quantity: e.target.value})}/>
            <FormFeedback>Quantity cannot be empty!</FormFeedback>
          </FormGroup>
          <div className="text-end">
            <Button color={'success'} disabled={creationStatus.isLoading}>
              {creationStatus.isLoading &&
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"/>}
              <span>Create</span>
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}
