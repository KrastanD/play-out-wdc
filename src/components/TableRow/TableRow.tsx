import "./TableRow.styles.scss";

function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="TableRow">{children}</tr>;
}

export default TableRow;
