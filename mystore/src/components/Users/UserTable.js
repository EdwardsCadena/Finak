import React, { useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import UserEditForm from './UserEditForm';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box } from '@mui/system';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

const UserTable = ({ users, fetchUsers }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedUserName, setDeletedUserName] = useState('');
  const [filterTipo, setFilterTipo] = useState(''); // Estado para el filtro de tipo de evento
  const [fechaInicio, setFechaInicio] = useState(''); // Estado para el rango de fecha inicio
  const [fechaFin, setFechaFin] = useState(''); // Estado para el rango de fecha fin

  const handleFilterChange = (event) => {
    setFilterTipo(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  const filterUsers = (user) => {
    // Función para aplicar los filtros
    if (filterTipo && user.tipo !== filterTipo) {
      return false;
    }
    if (fechaInicio && new Date(user.fecha) < new Date(fechaInicio)) {
      return false;
    }
    if (fechaFin && new Date(user.fecha) > new Date(fechaFin)) {
      return false;
    }
    return true;
  };

  const deleteUser = async (id, descripcion) => {
    try {
      await axios.delete(`https://localhost:7255/api/EventLog/${id}`);
      fetchUsers();
      setDeletedUserName(descripcion);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Controles de filtro */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel id="tipo-filter-label">Tipo</InputLabel>
            <Select
              labelId="tipo-filter-label"
              id="tipo-filter"
              value={filterTipo}
              onChange={handleFilterChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Api">Api</MenuItem>
              <MenuItem value="Formulario de eventos manuales">Formulario de eventos manuales</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="fecha-inicio"
            label="Fecha inicio"
            type="date"
            value={fechaInicio}
            onChange={handleFechaInicioChange}
            sx={{ mr: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="fecha-fin"
            label="Fecha fin"
            type="date"
            value={fechaFin}
            onChange={handleFechaFinChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        {/* Tabla de usuarios filtrada */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter(filterUsers).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.tipo}</TableCell>
                  <TableCell>{user.descripcion}</TableCell>
                  <TableCell>{user.fecha}</TableCell>
                  <TableCell>
                    <UserEditForm user={user} fetchUsers={fetchUsers} />
                    <Button variant="contained" color="error" onClick={() => deleteUser(user.id, user.descripcion)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación de la tabla */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={5}
          page={0}
          onPageChange={() => {}}
          onRowsPerPageChange={() => {}}
        />
      </Paper>

      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          User "{deletedUserName}" deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserTable;
