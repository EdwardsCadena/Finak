import React from 'react';
import Grid from '@mui/material/Grid';
import UserForm from './UserForm';
import UserTable from './UserTable';

const Usercom = ({ users, fetchUsers }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <UserForm users={users} fetchUsers={fetchUsers} />
      </Grid>
      <Grid item xs={6}>
        <UserTable users={users} fetchUsers={fetchUsers} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Usercom;
