import "./ErrorScreen.styles.scss";

export default function ErrorScreen({ error }: { error: string }) {
  return (
    <div className="ErrorScreen">
      <h1>{error}</h1>
    </div>
  );
}
