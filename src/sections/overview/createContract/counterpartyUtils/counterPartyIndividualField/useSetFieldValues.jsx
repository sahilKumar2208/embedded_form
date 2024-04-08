import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function useSetFieldValues(fieldDetails) {
  const { watch, setValue } = useFormContext();

  useEffect(() => {
    const {
      address,
      fullName,
      firstName,
      lastName,
      jobTitle,
      email,
      companyAddress,
      jurisdiction,
      registeredName,
    } = watch(fieldDetails.id);

    console.log(" full name in useSetField -----> ", fullName);
    console.log("field details xyz ---->", fieldDetails);

    if (
      fieldDetails.type === "counterpartyOrgPerson" ||
      fieldDetails.type === "counterpartyIndividual"
    ) {
      setValue(`${fieldDetails.id}.fullName`, fullName ? fullName : "");
      setValue(`${fieldDetails.id}.firstName`, firstName ? firstName : "");
      setValue(`${fieldDetails.id}.lastName`, lastName ? lastName : "");
      setValue(`${fieldDetails.id}.jobTitle`, jobTitle ? jobTitle : "");
      setValue(`${fieldDetails.id}.email`, email ? email : "");
      if (address) {
        console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(watch(fieldDetails.id), 'eeeeeeeeeeeeeeeeeeeeeeee')
        setValue(
          `${fieldDetails.id}.address.addressLine1`,
          address.addressLine1 ? address.addressLine1 : ""
        );
        setValue(`${fieldDetails.id}.address.city`, address.city ? address.city : "");
        setValue(`${fieldDetails.id}.address.country`, address.country ? address.country : "");
        setValue(`${fieldDetails.id}.address.state`, address.state ? address.state : "");
        setValue(`${fieldDetails.id}.address.postCode`, address.postCode ? address.postCode : "");
      }
    }
    if (fieldDetails.type === "counterpartyOrg") {
      setValue(`${fieldDetails.id}.registeredName`, registeredName ? registeredName : "");
      setValue(`${fieldDetails.id}.jurisdiction`, jurisdiction ? jurisdiction : "");
      if (companyAddress) {
        setValue(
          `${fieldDetails.id}.companyAddress.addressLine1`,
          companyAddress.addressLine1 ? companyAddress.addressLine1 : ""
        );
        setValue(
          `${fieldDetails.id}.companyAddress.city`,
          companyAddress.city ? companyAddress.city : ""
        );
        setValue(
          `${fieldDetails.id}.companyAddress.country`,
          companyAddress.country ? companyAddress.country : ""
        );
        setValue(
          `${fieldDetails.id}.companyAddress.state`,
          companyAddress.state ? companyAddress.state : ""
        );
        setValue(
          `${fieldDetails.id}.companyAddress.postCode`,
          companyAddress.postCode ? companyAddress.postCode : ""
        );
      }
    }
  }, [watch(fieldDetails.id)]);
}

export default useSetFieldValues;
