import React from 'react'
import "./styles/home.css";
import DataCont from '../components/dataCont';

function home() {
  return (
    <div>
        <div className='genaralInfoContainer'>
            <div>
                <DataCont />
            </div>
            <div>
                <DataCont />
            </div>
            <div>
                <DataCont />
            </div>
        </div>
    </div>
  )
}

export default home