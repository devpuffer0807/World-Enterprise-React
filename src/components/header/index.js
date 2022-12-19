/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import React from "react";
import { Helmet } from "react-helmet";

const Index = ({ pageTitle }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default Index;
