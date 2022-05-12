import { gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`;

function BookList() {
  console.log(this.props);
  return (
    <div>
      <ul id="book-list">
        <li>Book name</li>
      </ul>
    </div>
  );
}

export default BookList;
