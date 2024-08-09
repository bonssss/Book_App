import React, { useEffect, useState } from 'react';
import {
  fetchOwnerStats,
  approveOwner,
  deleteOwner,
  updateOwnerStatus,
} from '../../services/ownerService';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Switch,
} from '@mui/material';
import { Visibility, Delete, CheckCircle, Cancel } from '@mui/icons-material';

const OwnerStats = () => {
  const [ownerStats, setOwnerStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const loadOwnerStats = async () => {
      try {
        const data = await fetchOwnerStats();
        setOwnerStats(data);
      } catch (error) {
        setError('Failed to load owner statistics');
      } finally {
        setLoading(false);
      }
    };

    loadOwnerStats();
  }, []);

  const handleApprove = async (id) => {
    try {
      if (!id) throw new Error('Invalid owner ID');
      await approveOwner(id);
      const updatedStats = await fetchOwnerStats();
      setOwnerStats(updatedStats);
      setSnackbarMessage('Owner approved successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        'Failed to approve owner:',
        error.response?.data?.error || error.message
      );
      setSnackbarMessage('Failed to approve owner');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    try {
      await deleteOwner(id);
      const updatedStats = await fetchOwnerStats();
      setOwnerStats(updatedStats);
      setSnackbarMessage('Owner deleted successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Failed to delete owner:', error);
      setSnackbarMessage('Failed to delete owner');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleViewDetails = (owner) => {
    setSelectedOwner(owner);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOwner(null);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await updateOwnerStatus(id, newStatus);
      const updatedStats = await fetchOwnerStats();
      setOwnerStats(updatedStats);
      setSnackbarMessage(
        `Owner ${newStatus === 'active' ? 'enabled' : 'disabled'} successfully`
      );
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Failed to ${newStatus} owner:`, error);
      setSnackbarMessage(`Failed to ${newStatus} owner`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  const columns = [
    {
      header: 'Username',
      accessorKey: 'username',
      size: 100, 
    },
    {
      header: 'Number of Books',
      accessorKey: 'numberOfBooks',
      size: 140,
    },
    {
      header: 'Location',
      accessorKey: 'location',
      size: 140,
    },
    {
      header: 'Status',
      accessorKey: 'status',
      size: 150,
      Cell: ({ cell }) => {
        const status = cell.getValue();
        const isActive = status === 'active';

        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: 1,
              borderRadius: 1,
              backgroundColor: isActive ? 'lightgreen' : 'lightcoral',
            }}
          >
            <Typography
              sx={{
                color: isActive ? 'success.main' : 'error.main',
              }}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Typography>
            <Switch
              checked={isActive}
              onChange={() => handleToggleStatus(cell.row.original.id, status)}
              color={isActive ? 'success' : 'error'}
              sx={{
                '& .MuiSwitch-thumb': {
                  backgroundColor: isActive ? 'success.main' : 'error.main',
                },
                '& .MuiSwitch-track': {
                  backgroundColor: isActive
                    ? 'success.light'
                    : 'error.light',
                },
              }}
            />
          </Box>
        );
      },
    },
    {
      header: 'Actions',
      accessorKey: 'actions',
      size: 150,
      Cell: ({ cell }) => {
        const { id, isApproved } = cell.row.original;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="primary"
              onClick={() => handleViewDetails(cell.row.original)}
              sx={{ mr: 1 }}
            >
              <Visibility />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDelete(id)}
              sx={{ mr: 1 }}
            >
              <Delete />
            </IconButton>
            {!isApproved ? (
              <Button
                variant="contained"
                color="success"
                onClick={() => handleApprove(id)}
                sx={{ minWidth: '75px' }}
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                disabled
                sx={{ minWidth: '75px' }}
              >
                Approved
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: { xs: 1, sm: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Owner Statistics
      </Typography>
      <MaterialReactTable
        columns={columns}
        data={ownerStats}
        muiTableProps={{
          sx: {
            minWidth: 650,
            '& .MuiTableCell-root': {
              padding: { xs: '4px', sm: '8px' },
            },
            '& .MuiTableHead-root': {
              backgroundColor: 'primary.light',
            },
            '& .MuiTableBody-root': {
              backgroundColor: 'background.default',
            },
          },
        }}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Owner Details</DialogTitle>
        <DialogContent>
          {selectedOwner && (
            <Box>
              <Typography>
                <strong>Username:</strong> {selectedOwner.username}
              </Typography>
              <Typography>
                <strong>Number of Books:</strong> {selectedOwner.numberOfBooks}
              </Typography>
              <Typography>
                <strong>Location:</strong> {selectedOwner.location}
              </Typography>
              <Typography>
                <strong>Status:</strong>{' '}
                {selectedOwner.status === 'active' ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OwnerStats;
