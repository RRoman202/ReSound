export function stringToBooleanArray(str: string): boolean[][] {
  // Split the string into rows based on newlines
  const rows = str.split("\n");

  // Create an empty 2D array to store the boolean values
  const booleanArray: boolean[][] = [];

  // Iterate over each row
  for (const row of rows) {
    // Create an empty array to store the boolean values for the current row
    const rowArray: boolean[] = [];

    // Iterate over each character in the row
    for (const char of row) {
      // Convert the character to a boolean value (true for "1", false for "0")
      const boolValue = char === "true" ? true : false;

      // Add the boolean value to the row array
      rowArray.push(boolValue);
    }

    // Add the row array to the 2D array
    booleanArray.push(rowArray);
  }

  // Return the 2D boolean array
  return booleanArray;
}
