export default function Message({ user, text, time }) {

  return (
    <div className="message" style={{ marginBottom: "15px" }}>
      <div>
        <strong>{user}</strong> <span style={{ fontSize: "0.8rem", color: "gray" }}>{time}</span>
      </div>
      <div>{text}</div>
    </div>
  );
  
}