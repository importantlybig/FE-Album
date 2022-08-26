import React, { useState } from "react";

function CountDate() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>The number of day, I work at TAPTAP {count}</p>
      <button onClick={() => setCount(count + 1)}>Increament day</button>
    </div>
  );
}
