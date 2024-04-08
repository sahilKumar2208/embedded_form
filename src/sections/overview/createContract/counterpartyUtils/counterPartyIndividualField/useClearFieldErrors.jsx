import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function useClearFieldErrors(fieldDetails) {
  const { watch, clearErrors } = useFormContext();

  useEffect(() => {
    if (watch(fieldDetails.id)) {
      const {
        jobTitle,
        firstName,
        lastName,
        address,
        companyAddress,
        registeredName,
        jurisdiction,
      } = watch(fieldDetails.id);
      if (
        fieldDetails.type === "counterpartyIndividual" ||
        fieldDetails.type === "counterpartyOrgPerson"
      ) {
        if (jobTitle) {
          clearErrors(`${fieldDetails.id}.jobTitle`, null);
        }
        if (firstName) {
          clearErrors(`${fieldDetails.id}.firstName`, null);
        }
        if (lastName) {
          clearErrors(`${fieldDetails.id}.lastName`, null);
        }
        if (address) {
          if (address.city) {
            clearErrors(`${fieldDetails.id}.address.city`, null);
          }
          if (address.country) {
            clearErrors(`${fieldDetails.id}.address.country`, null);
          }
        }
      }

      if (fieldDetails.type === "counterpartyOrg") {
        if (registeredName) {
          clearErrors(`${fieldDetails.id}.registeredName`, null);
        }
        if (jurisdiction) {
          clearErrors(`${fieldDetails.id}.jurisdiction`, null);
        }
        if (companyAddress) {
          if (companyAddress.city) {
            clearErrors(`${fieldDetails.id}.companyAddress.city`, null);
          }
          if (companyAddress.country) {
            clearErrors(`${fieldDetails.id}.companyAddress.country`, null);
          }
        }
      }
    }
  }, [
    watch(fieldDetails.id),
    watch(`${fieldDetails.id}.jobTitle`),
    watch(`${fieldDetails.id}.firstName`),
    watch(`${fieldDetails.id}.lastName`),
    watch(`${fieldDetails.id}.address`),
    watch(`${fieldDetails.id}.companyAddress`),
    watch(`${fieldDetails.id}.jurisdiction`),
    watch(`${fieldDetails.id}.registeredName`),
  ]);
}

export default useClearFieldErrors;
