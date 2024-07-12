import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserEditForm = ({ user, fetchUsers }) => {
  const [editedUser, setEditedUser] = useState({
    fecha: user.fecha,
    descripcion: user.descripcion,
    tipo: user.tipo,
  });
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const updateUser = async () => {
    try {
      await axios.put(`https://localhost:7255/api/EventLog/${user.id}`, editedUser);
      fetchUsers();
      handleClose();
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // 5000 milliseconds = 5 seconds
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<EditIcon />}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
          </Typography>
          <TextField
            name="descripcion"
            label="Description"
            value={editedUser.descripcion}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          {/* Campo tipo oculto */}
          <TextField
            name="tipo"
            type="hidden"
            value={editedUser.tipo}
            onChange={handleInputChange}
          />
          <TextField
            name="fecha"
            label="Date"
            type="date"
            value={editedUser.fecha}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={updateUser} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowAlert(false)}
          sx={{
            mt: 2,
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          User updated successfully!
        </Alert>
      )}
    </div>
  );
};

export default UserEditForm;
