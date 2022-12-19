/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import React, { useEffect, Fragment } from "react";
import { useWeb3React } from "@web3-react/core";

import Header from "../components/header/index";
import { Landing, DashBoard1, DashBoard2 } from "../components/open";

import store from "../store/store";
import { STEP, STORE_KEYS } from "../store/constant";
import { enterpriseInitialState } from "../store/initialState";

const IndexPage = () => {
  const { account, active } = useWeb3React();

  const [enterprises, setEnterprises, updateEnterprises] = store.useState(
    STORE_KEYS.id.enterprises
  );
  const [, setStep] = store.useState(STORE_KEYS.id.step);
  const joinState = enterprises.joined;

  useEffect(() => {
    setEnterprises((prev) => {
      prev.tempEnterprise.info = enterpriseInitialState.tempEnterprise.info;
      prev.tempEnterprise.shareholders =
        enterpriseInitialState.tempEnterprise.shareholders;
      prev.tempEnterprise.admins = enterpriseInitialState.tempEnterprise.admins;
      return prev;
    });

    setStep(STEP.INDEX);
  }, [setStep, setEnterprises]);

  useEffect(() => {
    console.log(account, active);
    if (account === undefined || !active) {
      updateEnterprises((prev) => {
        prev.joined = false;
        return prev;
      });
    }
  }, [account, active, updateEnterprises]);

  return (
    <Fragment>
      <Header pageTitle="Home" />
      {!account && <Landing />}
      {account &&
        enterprises.filter((enterprise) => enterprise.mine).length === 0 &&
        !joinState && <DashBoard1 />}
      {account &&
        (enterprises.filter((enterprise) => enterprise.mine).length !== 0 ||
          joinState) && <DashBoard2 />}
    </Fragment>
  );
};

export default IndexPage;
