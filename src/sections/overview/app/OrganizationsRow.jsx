import PropTypes from 'prop-types';
import { useState } from 'react';
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
} from '@mui/material';
// utils
import { fDate } from 'src/utils/format-time';
// components
import Label from 'src/components/label';
// import Iconify from '../../../components/iconify';
// import MenuPopover from '../../../components/menu-popover';
// import ConfirmDialog from '../../../components/confirm-dialog';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

OrganizationsRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onViewRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onSelectRow: PropTypes.func,
};

export default function OrganizationsRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  // console.log(row, 'row of obligation');
  const { _id, domain, createdAt, updatedAt } = row;

  // const [openConfirm, setOpenConfirm] = useState(false);

  // const [openPopover, setOpenPopover] = useState(null);

  // const handleOpenConfirm = () => {
  //   setOpenConfirm(true);
  // };

  // const handleCloseConfirm = () => {
  //   setOpenConfirm(false);
  // };

  // const handleOpenPopover = (event) => {
  //   setOpenPopover(event.currentTarget);
  // };

  // const handleClosePopover = () => {
  //   setOpenPopover(null);
  // };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/organization/${_id}`);
  };

  return (
    <>
      {/* <TableRow hover selected={selected} onClick={handleClick}> */}
      <TableRow hover onClick={handleClick}>
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row?.name} src={row?.orgLogoUrl} />

            <div>
              <Typography variant="subtitle2" noWrap>
                {row?.name}
              </Typography>
            </div>
          </Stack>
        </TableCell>
        <TableCell>{domain}</TableCell>

        <TableCell align="left">{fDate(createdAt)}</TableCell>
        <TableCell align="left">{fDate(updatedAt)}</TableCell>

        {/* <TableCell align="left">{fDate(dueTimeEpochInMs)}</TableCell> */}

        {/* <TableCell align="center">{category.type}</TableCell> */}

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Label
            color={
              (row?.isDeleted === true && 'error') ||
              (row?.isDeleted === false && 'success') ||
              'success'
            }
          >
            {row?.isDeleted ? 'DeActivated' : 'Activated'}
          </Label>
        </TableCell>

        {/* <TableCell align="left">
          <Label variant="soft" color={"default"}>
            {status}
          </Label>
        </TableCell> */}

        {/* <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
      </TableRow>

      {/* <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:eye-fill" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      /> */}
    </>
  );
}
