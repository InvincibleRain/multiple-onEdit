/**
 * @typedef {Object} startEnd
 * A object denoting limits of  a row or column
 * @property {number} start
 * @property {number} end
 */

/**
 * @typedef {Object} runcriteria
 * @description Describes which rows/columns to run this function
 * @property {startEnd} row
 * @property {startEnd} column
 * @property {function} function to execute
 */

/**
 * @param {GoogleAppsScript.Events.SheetsOnEdit}  e
 * @param {Object<string,Array<runcriteria>> } run_in
 * @returns {{result:boolean,editedSheet:GoogleAppsScript.Spreadsheet.Sheet,,runcriteriaArr:Array<runcriteria, e:GoogleAppsScript.Events.onEdit}}
 */
const isEditInMyCriteria_ = (e, run_in) => {
  const criteriaSheetNames = new Set(Object.keys(run_in)),
    editedRange = e.range,
    editedSheet = editedRange.getSheet(),
    editedSheetName = editedSheet.getName(),
    isEditedSheetInRun_in = criteriaSheetNames.has(editedSheetName),
    runcriteria = isEditedSheetInRun_in && run_in[editedSheetName],
    { rowStart, columnStart } = editedRange,
    withinBounds = (a, b, e) =>
      a >= (b[e]?.start ?? -Infinity) && a <= (b[e]?.end ?? Infinity),
    editWithinBounds = (obj) =>
      withinBounds(rowStart, obj, 'row') &&
      withinBounds(columnStart, obj, 'column'),
    runcriteriaArr = [];

  //Execute any functions where this runcriteria satisfied
  runcriteria.forEach(
    (obj) =>
      editWithinBounds(obj) &&
      runcriteriaArr.push(obj) &&
      obj.func?.({ e, editedRange, editedSheet, runcriteria: obj })
  );
  return {
    result: runcriteria && runcriteriaArr.length,
    e,
    editedRange,
    runcriteriaArr,
    editedSheet,
  };
};
