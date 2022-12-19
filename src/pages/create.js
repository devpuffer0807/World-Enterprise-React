/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import React, { useEffect } from "react";
import Header from "../components/header/index";
import { Confirm, Final } from "../components/create";
import { EnterpriseCreate } from "../components/enterprise";
import { ShareholderAdd, ShareholdersView } from "../components/shareholders";
import { AdminAdd, AdminsView } from "../components/admins";
import store from "../store/store";
import { STORE_KEYS, STEP } from "../store/constant";

const CreatePage = () => {
  const [step, setStep] = store.useState(STORE_KEYS.id.step);

  useEffect(() => {
    setStep(STEP.CREATE_ENTERPRISE_INPUT);
  }, [setStep]);

  return (
    <>
      <Header pageTitle="Create" />
      {step === STEP.CREATE_ENTERPRISE_INPUT && <EnterpriseCreate />}
      {step === STEP.CREATE_SHAREHOLDERS_VIEW && <ShareholdersView />}
      {(step === STEP.CREATE_SHAREHOLDER_ADD ||
        step === STEP.CREATE_SHAREHOLDER_EDIT) && <ShareholderAdd />}
      {step === STEP.CREATE_ADMINS_VIEW && <AdminsView />}
      {(step === STEP.CREATE_ADMIN_ADD || step === STEP.CREATE_ADMIN_EDIT) && (
        <AdminAdd />
      )}
      {step === STEP.CREATE_PROCESSING && <Confirm />}
      {step === STEP.CREATE_SUCCESSED && <Final />}
    </>
  );
};

export default CreatePage;
