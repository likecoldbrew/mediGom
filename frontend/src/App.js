import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Doctors from './DoctorPage/components/Doctors'
import "./index.css"

function App() {
  const [hello, setHello] = useState('')

  useEffect(() => {
    axios.get('/api/hello')
        .then(response => setHello(response.data))
        .catch(error => console.log(error))
  }, []);

  return (
      <div>
        {/*백엔드에서 가져온 데이터 : {hello}*/}
        {/*<div className="text-sky-500">*/}
        {/*    안녕*/}
        {/*</div>*/}
          <Doctors/>
      </div>

  );
}

export default App;
