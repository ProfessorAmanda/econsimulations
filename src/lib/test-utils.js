import _ from "lodash";

export const testPopulation = _.range(100).map((num) => ({x: num, y: num, id: num}));

export const testSample = [2, 5, 12, 34, 75].map((num) => ({x: num, y: num, id: num}));
