import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useDomLocation } from '../.';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const locationCallBack = () => {
    console.log('🔥');
  };
  const { lastUpdateTime } = useDomLocation({
    locationCallBack,
    throttleDuration: 500,
    useMendixNav: false,
  });

  React.useEffect(() => {
    console.log('lastUpdateTime', lastUpdateTime);
  }, [lastUpdateTime]);
  //   return (
  //     <div>
  //       <div>
  //         <h2>Hello</h2>
  //         <button onClick={() => setToggle(!toggle)}>
  //           Toggle big Dom Change
  //         </button>
  //         <button
  //           onClick={() => {
  //             //@ts-ignore
  //             var searchParams = new URLSearchParams(window.location.search);
  //             searchParams.set('foo', 'bar');
  //             window.location.search = searchParams.toString();
  //           }}
  //         >
  //           Path
  //         </button>
  //       </div>
  //       {toggle ? <h3>Sup</h3> : <h4>Cool</h4>}
  //     </div>
  //   );
  // };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const [toggle, setToggle] = React.useState(false);
  return (
    <div>
      <div>
        <h2>Hello</h2>
        <button onClick={() => setToggle(!toggle)}>
          Toggle big Dom Change
        </button>
        <button
          onClick={() => {
            //@ts-ignore
            var searchParams = new URLSearchParams(window.location.search);
            searchParams.set('foo', 'bar');
            window.location.search = searchParams.toString();
          }}
        >
          Path
        </button>
      </div>
      {toggle ? <h3>Sup</h3> : <h4>Cool</h4>}
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

ReactDOM.render(<App />, document.getElementById('root'));
