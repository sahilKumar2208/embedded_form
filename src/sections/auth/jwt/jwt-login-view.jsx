import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Link,
  Stack,
  Alert,
  IconButton,
  Typography,
  InputAdornment,
  CircularProgress,
} from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';
// import { useRouter, useSearchParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import axios from '../../../utils/axios';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  console.log(login,"Heylogin")
  const [otpSent, setOtpSent] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  // const searchParams = useSearchParams();

  // const returnTo = searchParams.get('returnTo');

  // const password = useBoolean();

  // const LoginSchema = Yup.object().shape({
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   password: Yup.string().required('Password is required'),
  // });
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    otp: Yup.string().required('OTP is required'),
  });

  // const defaultValues = {
  //   email: 'demo@minimals.cc',
  //   password: 'demo1234',
  // };

  const defaultValues = {
    email: '',
    otp: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
    watch,
  } = methods;

  console.log(watch(), 'form values printed');

  // const {
  //   reset,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.otp);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  const sendOTPRequest = async () => {
    const { email } = getValues();
    if (email) {
      setSendOtp(true);
      setOtpSent(false);
      console.log(email, 'email');
      try {
        await axios.post(
          'https://cmt-backend-playground.intellosync.com/api/v1/users/getLoginOtp',
          { email }
        );
      } catch (e) {
        console.log(e, 'dkjfkdjkfjdk');
      }
      setOtpSent(true);
    }
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in</Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <RHFTextField name="email" label="Email address" />
      <RHFTextField
        name="otp"
        label="Otp"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Stack alignItems="center" sx={{ my: 2 }}>
        <>
          {otpSent && (
            <Typography color="success" sx={{ color: 'green' }}>
              Sent OTP to mail
            </Typography>
          )}{' '}
          {sendOtp && !otpSent && <CircularProgress />}
        </>
      </Stack>
      <Stack alignItems="flex-end" sx={{ my: 2 }}>
        <Link
          variant="body2"
          color="inherit"
          underline="always"
          onClick={() => sendOTPRequest()}
          sx={{ cursor: 'pointer' }}
        >
          {!otpSent ? 'Send OTP to email' : 'Resend OTP to email'}
        </Link>
      </Stack>

      {/* <RHFTextField
      name="password"
      label="Password"
      type={password.value ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={password.onToggle} edge="end">
              <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    /> */}

      {/* <Link
      component={RouterLink}
      href={paths.auth.amplify.forgotPassword}
      variant="body2"
      color="inherit"
      underline="always"
      sx={{ alignSelf: 'flex-end' }}
    >
      Forgot password?
    </Link> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitSuccessful || isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
    // <Stack spacing={2.5}>
    //   <RHFTextField name="email" label="Email address" />

    //   <RHFTextField
    //     name="password"
    //     label="Password"
    //     type={password.value ? 'text' : 'password'}
    //     InputProps={{
    //       endAdornment: (
    //         <InputAdornment position="end">
    //           <IconButton onClick={password.onToggle} edge="end">
    //             <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
    //           </IconButton>
    //         </InputAdornment>
    //       ),
    //     }}
    //   />

    //   <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
    //     Forgot password?
    //   </Link>

    //   <LoadingButton
    //     fullWidth
    //     color="inherit"
    //     size="large"
    //     type="submit"
    //     variant="contained"
    //     loading={isSubmitting}
    //   >
    //     Login
    //   </LoadingButton>
    // </Stack>
  );

  return (
    // <>
    //   {renderHead}

    //   <Alert severity="info" sx={{ mb: 3 }}>
    //     Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
    //   </Alert>

    //   {!!errorMsg && (
    //     <Alert severity="error" sx={{ mb: 3 }}>
    //       {errorMsg}
    //     </Alert>
    //   )}

    //   <FormProvider methods={methods} onSubmit={onSubmit}>
    //     {renderForm}
    //   </FormProvider>
    // </>
    <>
      {renderHead}
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {renderForm}
      </FormProvider>
    </>
  );
}
