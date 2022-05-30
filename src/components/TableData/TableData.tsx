import "./TableData.styles.scss";

function TableData({ children }: { children: React.ReactNode }) {
  return <td className="TableData">{children}</td>;
}

export default TableData;
