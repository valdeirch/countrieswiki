import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { 
  ApolloClient, 
  InMemoryCache,
  ApolloProvider 
} from '@apollo/client';
import { createBrowserHistory } from "history";
import { Container } from 'react-bootstrap';
import { Provider } from "react-redux";

// Styles
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import { Header } from './components/Header';

// Pages
import Home from "./pages/Home";
import Details from "./pages/Details";

// Store
import { store } from "./store";

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: new InMemoryCache()
});

function App() {
  const history = createBrowserHistory();

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router history={history}>
          <Header />
          <Container fluid>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/details/:id" component={Details} />
            </Switch>
          </Container>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
