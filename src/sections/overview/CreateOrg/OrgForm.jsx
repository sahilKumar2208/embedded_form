import { Divider, Grid, Tooltip, Typography } from '@mui/material';
import { RHFSwitch, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { fData } from 'src/utils/format-number';

export default function OrgForm({ handleDrop, imageUrl }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Tooltip title="Try to Put a Unique Name" placement="top-end">
            <span>
              <RHFTextField
                size="medium"
                name="name"
                label="Organization Name*"
                placeholder="Organization Name"
                InputLabelProps={{ shrink: true }}
              />
            </span>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <span>
            <RHFUploadAvatar
              //   file="https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/08/image-url-3.jpg"
              file={imageUrl}
              name="orgLogoUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </span>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              //   required
              name="adminFullName"
              label="Admin Full Name*"
              placeholder="Admin Full Name"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              //   required
              size="medium"
              name="contactEmail"
              label="Email*"
              placeholder="Contact email"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Address
          </Typography>
          <Divider variant="middle" />
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              name="permanentAddress"
              label="Permanent Address"
              placeholder="Permanent Address"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              name="city"
              label="City"
              placeholder="City"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              name="state"
              label="State"
              placeholder="State"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              name="country"
              label="Country"
              placeholder="Country"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          {/* <Tooltip title="Try to Put a Unique Name" placement="top-end"> */}
          <span>
            <RHFTextField
              size="medium"
              name="addressCode"
              label="Address Code"
              placeholder="Address Code"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          {/* </Tooltip> */}
        </Grid>
        {/* <Grid item xs={12} sm={12} md={12}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Services
          </Typography>
          <Divider variant="middle" />
          <br />
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Try to Put a Unique Name" placement="top-end">
            <span>
              <RHFTextField
                size="medium"
                name="maxNumberofUsers"
                label="Max Number of Users"
                placeholder="Max Number of Users"
                InputLabelProps={{ shrink: true }}
              />
            </span>
          </Tooltip>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Try to Put a Unique Name" placement="top-end">
          <span>
            <RHFTextField
              size="medium"
              name="editorAccessLimit"
              label="Editor Access Limit"
              placeholder="Editor Access Limit"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          </Tooltip>
        </Grid> */}
        {/* <Grid item xs={12} sm={6} md={4}>
          <Tooltip title="Try to Put a Unique Name" placement="top-end">
          <span>
            <RHFTextField
              size="medium"
              name="contractForEsignPerMonth"
              label="Contract For Esign Per Month"
              placeholder="Contract For Esign Per Month"
              InputLabelProps={{ shrink: true }}
            />
          </span>
          </Tooltip>
        </Grid> */}
        <Grid item xs={12} sm={12} md={12}>
          <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
            Features
          </Typography>
          <Divider variant="middle" />
          <br />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFSwitch name="editor" label="Editor" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFSwitch name="esign" label="E-sign" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <RHFSwitch name="aiAssist" label="AI assist" />
        </Grid>
      </Grid>
    </>
  );
}
