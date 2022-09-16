# multiple-onEdit
An elegant way to deal with multiple onEdit functions 

# Examples

````js
function onEdit(e){
  const run_in = {
      Sheet1: [
        {
        /**
         * Run a function named "hello"
         * when a edit is made in Sheet1!D2:I9
         */
          /*2:9*/ row: { start: 2, end: 5 },
          /*D:I*/ column: { start: 4, end: 9 },
          func: hello
        },
        {
        /**
         * Returns {result:truthy}, anywhere after row9
         */
          id:">row9"
          row: { start: 9 } 
        },
      ],
      Sheet2: [/*Returns {result:truthy} everywhere in Sheet2*/ {}],
      Sheet3: [
        { /*Only in rows 5 to rows10 */ row: { start: 5, end: 10 } },
        {
          /*or D15:E25*/ row: { start: 15, end: 25 },
          column: { start: 4, end: 5 },
        },
      ],
  }

  function hello(){console.log("Hello")}
  const {result} = isEditInMyCriteria_(e,run_in);
  if(result) console.log("Edits have been made in range of interest")
}
````
