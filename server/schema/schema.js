const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

//dummy data
var books = [
  { name: 'Kitle Psikolojisi', genre: 'Psychology', id: '1', authorId: '1' },
  { name: 'Totem ve Tabu', genre: 'Psychology', id: '4', authorId: '1' },
  { name: 'Suc ve Ceza', genre: 'Novel', id: '2', authorId: '2' },
  { name: 'The Lord of the Rings', genre: 'Fantasy', id: '3', authorId: '3' },
  { name: 'Harry Potter and The Goblet of Fire', genre: 'Fantasy', id: '4', authorId: '4' },
  { name: 'The Trial', genre: 'Novel', id: '5', authorId: '5' },
  { name: 'The Metamorphosis', genre: 'Novel', id: '6', authorId: '5' },
  { name: 'Harry Potter and The Half-Blood Prince', genre: 'Fantasy', id: '7', authorId: '4' },

];
var authors = [
  { name: 'Sigmund Freud', age: 45, id: '1' },
  { name: 'Dostoyevski', age: 62, id: '2' },
  { name: 'Tolkien', age: 25, id: '3' },
  { name: 'J.K. Rowling', age: 33, id: '4' },
  { name: 'Franz Kafka', age: 36, id: '5' },

];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        //code to get data from db/other source
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery
});