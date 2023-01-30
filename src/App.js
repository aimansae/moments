import styles from './App.module.css'

import NavBar from './components/NavBar';
import 'bootstrap/dist/js/bootstrap.bundle';


function App() {
  return (
    <div className={styles.App}>
      <div>
      <NavBar/>
      </div>
    </div>
  );
}

export default App;
