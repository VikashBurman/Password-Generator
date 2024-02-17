
import React, { useCallback, useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumber] = useState(false);
  const [charcter, setChar] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);
  const copyPassword = useCallback(()=>{
    window.navigator.clipboard.writeText(password);
  },[password])
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charcter) {
      str += "@#&*$%^!()-_{}[]:;<>,.";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charcter, setPassword]);

  // passwordGenerator();
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charcter, passwordGenerator]);

  return (
    <>
      <div className="flex items-center justify-center h-[40vh] bg-gray-300 flex-col p-6">
  <h1 className="text-2xl font-semibold mb-4">Password Generator</h1>
  <div className="mb-4">
    <input
      type="text"
      value={password}
      placeholder="Enter password"
      className="border p-2 rounded mr-2 focus:outline-none"
      ref={passwordRef}
    />
    <button
      className="bg-blue-500 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
      onClick={copyPassword}
    >
      Copy
    </button>
  </div>
  <div className="mb-4">
    <input
      type="range"
      min={6}
      max={100}
      value={length}
      onChange={(e) => {
        setLength(e.target.value);
      }}
      className="w-full"
    />
    <label className="block">Length: {length}</label>
  </div>
  <div className="mb-4">
    <input
      type="checkbox"
      defaultChecked={numberAllowed}
      onChange={() => {
        setNumber((prev) => !prev);
      }}
      className="mr-2"
    />
    <label className="mr-4">Numbers</label>
    <input
      type="checkbox"
      defaultChecked={charcter}
      onChange={() => {
        setChar((prev) => !prev);
      }}
      className="mr-2"
    />
    <label>Characters</label>
  </div>
</div>

    </>
  );
};

export default App;
