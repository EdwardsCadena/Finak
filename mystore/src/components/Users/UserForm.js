import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const UserForm = ({ fetchUsers }) => {
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7255/api/EventLog/manual-event', { Tipo: tipo, Descripcion: descripcion, Fecha: fecha });
      fetchUsers();
      setTipo('');
      setDescripcion('');
      setFecha('');
      setShowAlert(true);
    } catch (error) {
      console.error('Error adding EventLog:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Campo oculto para tipo */}
          <input type="hidden" value={tipo} onChange={(e) => setTipo(e.target.value)} />

          <Grid item xs={12}>
            <TextField
              id="filled-email-input"
              label="Description"
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="filled-date-input"
              label="Date"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          User registered successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserForm;
