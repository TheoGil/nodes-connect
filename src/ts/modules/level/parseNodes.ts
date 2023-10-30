import { Node, RawLevelData } from "@/ts/modules";

function parseLevelData(data: RawLevelData): Node[][] {
  const rows = [];

  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    const row = [];

    for (let colIndex = 0; colIndex < data[rowIndex].length; colIndex++) {
      row.push(
        new Node({
          type: data[rowIndex][colIndex],
          x: colIndex,
          y: rowIndex,
        })
      );
    }

    rows.push(row);
  }

  return rows;
}

export { parseLevelData };
