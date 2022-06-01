import "./Table.styles.scss";

function Table({ children }: { children: React.ReactNode }) {
  return <table className="Table">{children}</table>;
}

export default Table;
