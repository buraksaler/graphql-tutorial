import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
//Components
import BookList from "./components/BookList";

//Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const getAllBooks = gql`
{
  books{
    name
  }
}
`;

function AllBooks() {
  const { loading, error, data } = useQuery(getAllBooks);

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return data.books.map((book) => (
    <li>{book.name}</li>
  ))

}

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Burak's Reading List</h1>
        <ul>
          <AllBooks />
        </ul>
      </div>
    </ApolloProvider>
  );
}

export default App;
