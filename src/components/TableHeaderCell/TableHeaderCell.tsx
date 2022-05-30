import "./TableHeaderCell.styles.scss";

function TableHeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="TableHeaderCell">{children}</th>;
}

export default TableHeaderCell;
