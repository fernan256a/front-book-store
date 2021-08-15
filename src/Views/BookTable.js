import React from "react";
import {Table} from "reactstrap";
import classNames from "classnames";

export const BookTable = ({booksList, setSelectedBook}) => {

  const onRowClick = (book) => {
    setSelectedBook(book);
  }

  return (
    <div>
      <Table striped hover responsive bordered className={classNames({'cells-loading': booksList.isLoading})}>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Author</th>
          <th>Editorial</th>
          <th>Condition</th>
          <th>Quantity</th>
        </tr>
        </thead>
        <tbody>
        {
          (() => {
              if (booksList.isLoading) {
                return Array.from(new Array(5), (val, index) => index + 1)
                  .map((i) => {
                    return <LoadingRow key={i}/>
                  })
              } else if (booksList.fulfilled) {
                if (booksList.data.length > 0) {
                  return booksList.data.map((i, idx) => <TableRow key={idx} id={idx + 1} item={i}
                                                                  onRowClick={() => onRowClick(i)}/>)
                } return (
                  <tr>
                    <td colSpan={6} className="text-center">Start adding the first book to your library</td>
                  </tr>
                )
              }
            }
          )()
        }
        </tbody>
      </Table>
    </div>
  )
}

const TableRow = ({id, item, onRowClick}) => {
  const {title, author, editorial, condition, quantity} = item;

  return (
    <tr className="pointer" onClick={onRowClick}>
      <th scope="row">
        <div>{id}</div>
      </th>
      <td>
        <div>{title}</div>
      </td>
      <td>
        <div>{author}</div>
      </td>
      <td>
        <div>{editorial}</div>
      </td>
      <td>
        <div>{condition}</div>
      </td>
      <td>
        <div>{quantity}</div>
      </td>
    </tr>
  )
};

const LoadingRow = () => TableRow({
    id: 0,
    item: {
      title: "Da Vinci Code",
      author: "Dan Brown",
      editorial: "Doubleday",
      condition: "new",
      quantity: "20"
    }
  }
);

