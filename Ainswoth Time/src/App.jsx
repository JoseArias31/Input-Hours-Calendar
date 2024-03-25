import { useState, useEffect } from 'react';
import './App.css';

const RecordForm = ({ address, recordIndex, onSubmit, initialHours, onHourChange }) => {
  const [formData, setFormData] = useState({ dia: '', fecha: '', hours: initialHours });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    if (id === `row${recordIndex + 1}-col1`) {
      onHourChange(address, value);
    }
  };

  const diaNumber = recordIndex + 1;

  return (
    <div key={`${address}-${recordIndex}`}>
      <form onSubmit={onSubmit}>
        <label htmlFor={`row${recordIndex + 1}-col1`}>Dia</label>
        <input
          type="text"
          id={`row${recordIndex + 1}-col1`}
          value={diaNumber}
          onChange={handleChange}
          className="small-input"
        />
        <label htmlFor={`row${recordIndex + 1}-col2`}>Fecha</label>
        <input
          type="text"
          id={`row${recordIndex + 1}-col2`}
          value={formData.fecha}
          onChange={handleChange}
          className="small-input"
        />
        <label htmlFor={`row${recordIndex + 1}-col3`}>Hours</label>
        <input
          type="text"
          id={`row${recordIndex + 1}-col3`}
          value={initialHours[address]}
          onChange={handleChange}
          className="small-input"
        />
      </form>
    </div>
  );
};

const App = () => {
  const addresses = ['131 Bermondsay Rd', '100 Ridgeto Rd', '106 Ridgeto Rd'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar la lógica de envío de datos si es necesario
  };


  const initialHours = {
    '131 Bermondsay Rd': '8',
    '100 Ridgeto Rd': '3',
    '106 Ridgeto Rd': '1',
  };

  const [hours, setHours] = useState(initialHours);
  const [totalHours, setTotalHours] = useState({});
  const [daysWorked, setDaysWorked] = useState(20); // Usarás este estado para determinar el número de filas

  const handleHourChange = (address, value) => {
    setHours((prevHours) => ({ ...prevHours, [address]: value }));
  };

  useEffect(() => {
    const initialTotalHours = {};
    for (const address of addresses) {
      initialTotalHours[address] = Array.from({ length: daysWorked }, () =>
        parseInt(hours[address] || 0, 10)
      ).reduce((acc, curr) => acc + curr, 0);
    }
    setTotalHours(initialTotalHours);
  }, [hours, addresses, daysWorked]);

  return (
    <div id='form'>
      {addresses.map((address) => (
        <div key={address}>
            <h3 id='h3'>{address}</h3>
           <div id='horasYDias'>
            <div>
          <label htmlFor={`row1-col1`}>Hora por Oficina:</label>
          <input
            type="text"
            id={`row1-col1`}
            value={hours[address]}
            className="small-input2"
            onChange={(e) => {
              handleHourChange(address, e.target.value);
            }} />
            </div>
            <div>
          <label htmlFor={`days-worked-${address}`}>Dias trabajados:</label>
          <input
            type="number" // Cambia el tipo a number para facilitar el ingreso de valores numéricos
            id={`days-worked-${address}`}
            className='small-input2'
            value={daysWorked}
            onChange={(e) => setDaysWorked(Number(e.target.value))} // Asegúrate de convertir el valor a Number
          />
          </div>
          </div>
          {Array.from({ length: daysWorked }, (_, recordIndex) => ( // Usa daysWorked para determinar el número de filas
            <RecordForm
              key={`${address}-${recordIndex}`}
              address={address}
              recordIndex={recordIndex}
              onSubmit={handleSubmit}
              initialHours={hours}
              onHourChange={handleHourChange}
            />
          ))}
              <label htmlFor={`row1-col1`}>Total de Horas:</label>
          <input
            type='text'
            id={`row1-col1`}
            value={totalHours[address] || 0}
          />
        </div>
      ))}
    </div>
  );
};

export default App;