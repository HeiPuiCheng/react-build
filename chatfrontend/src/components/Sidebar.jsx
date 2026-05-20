export default function Sidebar() {

  const rooms = ["General", "Gaming", "Homework-Help", "Random"];

  return (
    <div className="sidebar">
      <h2>Servers</h2>
      <ul>
        {/* The .map() function loops through our array and returns HTML for each item */}
        {rooms.map((room, index) => (
          <li key={index}># {room}</li>
        ))}
      </ul>
    </div>
  );
  
}