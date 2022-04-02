import React from 'react'
import "./styles/home.css";
import DataCont from '../components/dataCont';

function home() {
  return (
    <div>
        <div className='genaralInfoContainer'>
            <div>
                <DataCont titulo={'Hola mund saf'} descripcion={'Esta es la descripcion del componente'} valor={12}/>
            </div>
            <div>
                <DataCont titulo={'Hola mund saf'} descripcion={'Esta es la descripcion del componente'} valor={12}/>
            </div>
            <div>
                <DataCont titulo={'Hola mund saf'} descripcion={'Esta es la descripcion del componente'} valor={12}/>
            </div>
        </div>
    </div>
  )
}

export default home