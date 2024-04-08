import PropTypes from 'prop-types';
// @mui
import {
  Stack,
  Button,
  Divider,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
  Avatar,
  Chip,
} from '@mui/material';
// utils
import { fDateTime } from 'src/utils/format-time';
import React, { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

OrgUserGroupsRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function OrgUserGroupsRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const { _id, name, type, createdAt, updatedAt } = row;

  return (
    <TableRow hover>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">
        {' '}
        <Chip label={type} variant="soft" sx={{ mr: 1, mb: 1 }} />
      </TableCell>
      <TableCell align="left">{fDateTime(createdAt)}</TableCell>
      <TableCell align="left">{fDateTime(updatedAt)}</TableCell>
    </TableRow>
  );
}
