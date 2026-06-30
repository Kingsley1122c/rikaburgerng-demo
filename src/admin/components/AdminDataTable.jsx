import React from 'react';

const AdminDataTable = ({ columns, rows, renderActions, caption }) => {
  const columnCount = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
            {renderActions ? <th>Actions</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows.map((row) => (
            <tr key={row.id || row.code || row.name}>
              {columns.map((column) => (
                <td key={`${row.id || row.code || row.name}-${column.key}`}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {renderActions ? <td>{renderActions(row)}</td> : null}
            </tr>
          )) : (
            <tr>
              <td colSpan={columnCount} style={{ color: 'var(--admin-muted)' }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDataTable;
