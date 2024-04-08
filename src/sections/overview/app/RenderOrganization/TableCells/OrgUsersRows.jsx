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
import { fDate, fDateTime } from 'src/utils/format-time';
// components
import Label from 'src/components/label';
// import Iconify from '../../../components/iconify';
// import MenuPopover from '../../../components/menu-popover';
// import ConfirmDialog from '../../../components/confirm-dialog';
import { useNavigate } from 'react-router';
import React, { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

OrgUsersRows.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  orgUserGroups: PropTypes.arrayOf(PropTypes.object),
};

export default function OrgUsersRows({
  row,
  orgUserGroups,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const {
    _id,
    profileURL,
    fullName,
    role,
    email,
    latestActivity,
    userGroup,
    // ipAddress,
  } = row;

  const userGroupIds = userGroup || []; // Ensure userGroupIds is an array

  const userGroupNames = userGroupIds
    .map((groupId) => {
      const foundGroup = orgUserGroups.find((group) => group._id === groupId);
      return foundGroup ? foundGroup.name : null;
    })
    .filter(Boolean);

  const latestIpAddress = latestActivity?.ipAddress;
  const latestCreatedAt = latestActivity?.createdAt;

  const navigate = useNavigate();

  const handleClick = () => {
    // navigate(`/organization/${_id}`);
    console.log('Hey, This is me');
  };

  return (
    <TableRow hover onClick={handleClick}>
      <TableCell align="left">
        <Avatar alt={fullName} src={profileURL} />
      </TableCell>
      <TableCell align="left">{fullName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">
        {userGroupNames.map((groupName, index) => (
          <Chip key={index} label={groupName} variant="soft" sx={{ mr: 1, mb: 1 }} />
        ))}
      </TableCell>
      <TableCell align="left">
        <Chip variant="outlined" label={latestIpAddress || 'N/A'} />
      </TableCell>
      <TableCell align="left">
        {latestCreatedAt ? <>{fDateTime(latestCreatedAt)}</> : <div>Not logged in yet</div>}
      </TableCell>
    </TableRow>
  );
}
