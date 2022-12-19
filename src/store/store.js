/**
 * @author Puffer
 * @createdAt 12/19/2022
 * @updatedAt 12/19/2022
 **/

import { createStore } from "state-pool";
import { enterpriseInitialState } from "./initialState";
import { STEP } from "./constant";

const store = createStore();
store.setState("enterprises", enterpriseInitialState);
store.setState("step", STEP.INDEX);

export default store;
