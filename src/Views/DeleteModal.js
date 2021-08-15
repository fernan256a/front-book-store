import React, {useEffect} from "react";
import {Alert, Button, Form, Modal, ModalBody, ModalHeader} from "reactstrap";
import {useDeleteBook} from "../hooks/useDeleteBook";

export const DeleteModal = ({bookId, bookTitle, isOpen, closeModal, refreshList}) => {
  const [deleteStatus, deleteBook] = useDeleteBook(bookId);

  useEffect(() => {
    if (deleteStatus.fulfilled) {
      refreshList();
      closeModal();
    }
  }, [deleteStatus.isLoading])

  const onSubmit = (e) => {
    e.preventDefault();
    deleteBook();
  }

  return (
    <Modal isOpen={isOpen} centered toggle={closeModal}>
      <ModalHeader toggle={closeModal} className="bg-light py-2">Delete book</ModalHeader>
      <ModalBody>
        {deleteStatus.isError &&
        <Alert color={'warning'} className="py-1 mb-1"><small>Something went wrong!</small></Alert>}
        <Form onSubmit={onSubmit}>
          <div>{`Are you sure you want to remove ${bookTitle} from your library? This action cannot be undone!`}</div>
          <div className="text-end">
            <Button color={'danger'} disabled={deleteStatus.isLoading}>
              {deleteStatus.isLoading &&
              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"/>}
              <span>Delete</span>
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}
