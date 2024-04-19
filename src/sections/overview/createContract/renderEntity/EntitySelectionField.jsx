import { Grid, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useFormContext } from 'react-hook-form';
import axios from 'axios';
import { dispatch, useSelector } from 'src/redux/store';
import {
  setContractEntity,
  setContractEntitySignatories,
} from 'src/redux/slices/contractFormSlice';

function EntitySelectionFiled({ getAllUsers, orgFeatures, template, methods }) {
  const [allEntities, setAllEntities] = useState([]);
  const { control, setValue, watch } = useFormContext() || {};
  const [flag, setFlag] = useState(false);
  const [signatories, setSignatories] = useState([]);
  const contractBasicInfo = useSelector((state) => state.form);

  const fetchAllEntities = async () => {
    try {
      const fetchAllEntitiesResponse = await axios.get(
        'https://cmt-backend-playground.intellosync.com/api/v1/org/allEntities',
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );
      return fetchAllEntitiesResponse.data;
    } catch (error) {
      console.log('error in fetching all entities', error);
    }
  };

  useEffect(() => {
    const getAllEntities = async () => {
      try {
        const allEntitiesResponse = await fetchAllEntities();
        if (orgFeatures.multipleEntities) {
          if (!template?.entities || template?.entities?.length === 0) {
            console.log('if entered');
            setAllEntities(allEntitiesResponse);
          } else {
            console.log('else entered');
            setAllEntities(template.entities);
          }
        }
      } catch (error) {
        console.log('error in getting all entities', error);
      }
    };

    getAllEntities();
  }, []);

  const fetchAllSignatories = async (entity) => {
    try {
      console.log(template.type, template._id, entity, 'jkefjwbvjhfbvjhfbbvfv');
      const fetchAllSignatoriesResponse = await axios.get(
        `https://cmt-backend-playground.intellosync.com/api/v1/workflow/signatories/${template.type}?templateId=${template._id}&entity=${entity}`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzUwNzAwNywiZXhwIjoxNzEzNTkzNDA3fQ.2pCtPkvoM2QKms3IDV0hdiqK95weWHzUxAXkLpdJ5H0',
          },
        }
      );
      console.log('signa123', fetchAllSignatoriesResponse.data);
      //   setSignatories(signatoriesResponse.data);
      return fetchAllSignatoriesResponse;
    } catch (error) {
      console.log('error getting signatories', error);
    }
  };

  useEffect(() => {
    const fetchAndSetSignatories = async () => {
      const signatoriesResponse = await fetchAllSignatories(watch('entity'));
      console.log('siggggg', signatoriesResponse.data);
      setSignatories(signatoriesResponse.data);
    };

    fetchAndSetSignatories();
  }, [watch('entity')]);

  console.log('signatoriesssss ', signatories);

  useEffect(() => {
    if (methods.watch('entity')) {
      if (!flag) {
        setFlag(true);
      } else {
        setValue('entitySignatory', null);
      }
    }

    getAllUsers(methods.watch('entity'));
  }, [methods.watch('entity')]);

  useEffect(() => {
    dispatch(setContractEntity({ value: watch('entity') }));
    dispatch(setContractEntitySignatories({ value: watch('entitySignatory') }));
  }, [watch('entity'), watch('entitySignatory')]);

  useEffect(() => {
    console.log('entity from redux', contractBasicInfo.entity);
    console.log('signatories from redux ', contractBasicInfo.entitySignatory);
    setValue('entity', contractBasicInfo.entity);
    setValue('entitySignatory', contractBasicInfo.entitySignatory);
  }, []);

  console.log(watch(), 'hello basic');

  return (
    <>
      <Grid xs={6} sm={6} md={6}>
        <RHFSelect fullWidth name="entity" label="Entity*" InputLabelProps={{ shrink: true }}>
          {allEntities &&
            allEntities.length > 0 &&
            allEntities.map((res, index) => {
              return (
                <MenuItem key={res._id} value={res._id}>
                  {res.registeredName}
                </MenuItem>
              );
            })}
        </RHFSelect>
      </Grid>
      {methods.watch('entity') && (
        <Grid xs={6} sm={6} md={6}>
          <RHFSelect
            fullWidth
            name="entitySignatory"
            label="Entity signatory*"
            InputLabelProps={{ shrink: true }}
          >
            <MenuItem value={null} sx={{ height: '12px' }}>
              {/* <RenderPriority priority={"Urgent"} /> */}
              {''}
            </MenuItem>

            {signatories &&
              signatories.length > 0 &&
              signatories?.map((res, index) => {
                return (
                  <MenuItem key={res._id} value={res._id}>
                    {res.fullName}
                  </MenuItem>
                );
              })}
          </RHFSelect>
        </Grid>
      )}
    </>
  );
}

export default EntitySelectionFiled;

// import { Grid, MenuItem } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { RHFSelect, RHFTextField } from 'src/components/hook-form';
// import { useFormContext } from 'react-hook-form';
// import axios from 'axios';

// function EntitySelectionFiled({ getAllUsers, orgFeatures, template, methods }) {
//   const [allEntities, setAllEntities] = useState([]);
//   const [users, setUsers] = useState([]);
//   const { control } = useFormContext() || {};
//   console.log(methods, 'methods');
//   //   const { template } = useSelector((state) => state.contract);
//   //   const { entities } = useSelector((state) => state.entity);
//   //   const { signatories } = useSelector((state) => state.users);
//   //   const { watch, setValue, reset } = methods;
//   const [flag, setFlag] = useState(false);

//   const signatories = null;

//   const fetchAllEntities = async () => {
//     try {
//       const fetchAllEntitiesResponse = await axios.get(
//         'https://cmt-backend-playground.intellosync.com/api/v1/org/allEntities',
//         {
//           headers: {
//             Authorization:
//               'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzM0NjY0OSwiZXhwIjoxNzEzNDMzMDQ5fQ.QmazaK_jWR5Kyn3SLf_3SAYYdOj_BgD7jGZ26lXLn2U',
//           },
//         }
//       );
//       console.log(fetchAllEntitiesResponse, 'ejfhbrjhfbfjbvjef');
//       return fetchAllEntitiesResponse.data;
//     } catch (error) {
//       console.log('error in fetching all entities', error);
//     }
//   };
//   useEffect(() => {
//     console.log("orgFeatures", orgFeatures.data);
//     if (orgFeatures.data.multipleEntities) {
//       // get all entities

//       console.log("sejal")

//       const getAllEntities = async () => {
//         try {
//           const allEntitiesResponse = await fetchAllEntities();
//           console.log('All entities --->', allEntitiesResponse);
//           return allEntitiesResponse;
//         } catch (error) {
//           console.log('error in getting all entities', error);
//         }
//       };

//       const allEntitiesResponse = getAllEntities();
//       console.log("xxxxxyyyyyyyzzzz", allEntitiesResponse);

//       // get all signatories

//       const fetchAllSignatories = async () => {
//         try {
//           const fetchAllSignatoriesResponse = await axios.get(
//             `https://cmt-backend-playground.intellosync.com/api/v1/workflow/signatories/${template.type}?templateId=${template._id}&entity=${entity}`,
//             {
//               headers: {
//                 Authorization:
//                   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU3ZjQ4MDI5Y2FhYjdlNGM4OGMyNDkiLCJmdWxsTmFtZSI6IlNhaGlsIEt1bWFyIiwiZW1haWwiOiJzYWhpbC5rdW1hckBpbnRlbGxvc3luYy5jb20iLCJvcmdJZCI6IjY1ZTdlNWY3MmU3Y2QzNGMzY2EyNTk2NCIsInJvbGUiOiJhZG1pbiIsImVkaXRvckFjY2VzcyI6IndyaXRlciIsImVudmlyb25tZW50IjoicGxheWdyb3VuZCIsImlhdCI6MTcxMzM0NjY0OSwiZXhwIjoxNzEzNDMzMDQ5fQ.QmazaK_jWR5Kyn3SLf_3SAYYdOj_BgD7jGZ26lXLn2U',
//               },
//             }
//           );
//         } catch (error) {
//           console.log('error getting signatories', error);
//         }
//       };

//       if (!template?.entities || template?.entities?.length === 0) {
//         // getAllEntities();
//         setAllEntities(allEntitiesResponse);
//       } else {
//         setAllEntities(template.entities);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (methods.watch('entity')) {
//       // contractInfo.entity = watch("entity")
//       if (!flag) {
//         setFlag(true);
//       } else {
//         setValue('entitySignatory', null);
//       }
//     }

//     getAllUsers(methods.watch('entity'));
//     // reset({entitySignatory: null})
//   }, [methods.watch('entity')]);
//   console.log(allEntities, 'aaaaaaaaaaaaaaa');
//   return (
//     <>
//       <Grid xs={6} sm={6} md={6}>
//         <RHFSelect fullWidth name="entity" label="Entity*" InputLabelProps={{ shrink: true }}>
//           {allEntities &&
//             allEntities.length > 0 &&
//             allEntities.map((res, index) => {
//               return (
//                 <MenuItem key={res._id} value={res._id}>
//                   {res.registeredName}
//                 </MenuItem>
//               );
//             })}
//         </RHFSelect>
//         <RHFTextField name="entity" />
//       </Grid>
//       {methods.watch('entity') && (
//         <Grid xs={6} sm={6} md={6}>
//           <RHFSelect
//             fullWidth
//             name="entitySignatory"
//             label="Entity signatory*"
//             InputLabelProps={{ shrink: true }}
//           >
//             <MenuItem value={null} sx={{ height: '12px' }}>
//               {/* <RenderPriority priority={"Urgent"} /> */}
//               {''}
//             </MenuItem>

//             {signatories &&
//               signatories.length > 0 &&
//               signatories?.map((res, index) => {
//                 return (
//                   <MenuItem key={res._id} value={res._id}>
//                     {res.fullName}
//                   </MenuItem>
//                 );
//               })}
//           </RHFSelect>
//         </Grid>
//       )}
//     </>
//   );
// }

// export default EntitySelectionFiled;
