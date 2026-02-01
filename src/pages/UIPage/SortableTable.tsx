import React, { useState } from 'react';

interface TableProps {
  columns: string[];
  data: any[];
}

const SortableTable: React.FC<TableProps> = ({ columns, data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortTable = (column: string) => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);

    const sorted = [...sortedData].sort((a, b) => {
      if (a[column] < b[column]) return newSortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  };

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              style={{
                padding: '12px',
                backgroundColor: '#6200ea',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
              }}
              onClick={() => sortTable(column)}
            >
              {column} {sortDirection === 'asc' ? '🔼' : '🔽'}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, columnIndex) => (
              <td
                key={columnIndex}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  textAlign: 'left',
                }}
              >
                {row[column] || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;