import React, {useEffect, useState} from "react";
import {useUpdateBook} from "../hooks/useUpdateBook";
import {Alert, Button, Form, Input, InputGroup, Label, Modal, ModalBody, ModalHeader} from "reactstrap";

export const UpdateModal = ({book, isOpen, closeModal, refreshList}) => {
  const [newBook, setBook] = useState({...book});
  const [updateStatus, updateBook] = useUpdateBook(newBook);

  useEffect(() => {
    if (updateStatus.fulfilled) {
      refreshList();
      closeModal();
    }
  }, [updateStatus.isLoading])

  const onClick = (e) => {
    e.preventDefault();
    updateBook();
  }

  return (
    <Modal isOpen={isOpen} centered toggle={closeModal}>
      <ModalHeader toggle={closeModal} className="bg-light py-2">{newBook.title}</ModalHeader>
      <ModalBody>
        {updateStatus.isError &&
        <Alert color={'warning'} className="py-1 mb-1"><small>Something went wrong!</small></Alert>}
        <Form onSubmit={onClick}>
          <InputGroup className="mb-2 align-items-center">
            <Label for={'author-id'} className="me-2">Author:</Label>
            <Input id={'author-id'} value={newBook.author} bsSize="sm"
                   onChange={(e) => setBook({...newBook, author: e.target.value})}/>
          </InputGroup>
          <InputGroup className="mb-2 align-items-center">
            <Label for={'editorial-id'} className="me-2">Editorial:</Label>
            <Input id={'editorial-id'} value={newBook.editorial} bsSize="sm"
                   onChange={(e) => setBook({...newBook, editorial: e.target.value})}/>
          </InputGroup>
          <InputGroup className="mb-2 align-items-center">
            <Label for={'quantity-id'} className="me-2">Quantity:</Label>
            <Input id={'quantity-id'} value={newBook.quantity} bsSize="sm"
                   onChange={(e) => setBook({...newBook, quantity: e.target.value})}/>
          </InputGroup>
          <div className="text-end">
            <Button color={'danger'} disabled={updateStatus.isLoading}>
              {updateStatus.isLoading &&
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"/>}
              <span>Update</span>
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}
