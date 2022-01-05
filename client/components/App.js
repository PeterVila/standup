import React, { useState } from 'react';
import './App.css';
import getDate from './getDate';

const App = () => {
  const [randomized, setRandomized] = useState([]);
  const [members, setMembers] = useState([]);
  const [lateAdditions, setLateAdditions] = useState([]);
  const [input, setInput] = useState('');
  const [dayOf, setDayOf] = useState('');
  const [qotd, setQotd] = useState('');
  const [dayOfEntered, setDayOfEntered] = useState(false);
  const [qotdEntered, setQotdEntered] = useState(false);
  const [display, setDisplay] = useState(false);
  const [added, setAdded] = useState(false);
  const [lateAdded, setLateAdded] = useState(false);

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (name === 'input') {
      setInput(value);
    } else if (name === 'dayOf') {
      setDayOf(value);
    } else if (name === 'qotd') {
      setQotd(value);
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    const name = e.target.name;
    console.log(e.target.name);

    if (name === 'add') {
      if (display) {
        const lateAddition = [...lateAdditions];
        lateAddition.push(input);
        setLateAdded(true);
        setLateAdditions(lateAddition);
      }
      const membersCopy = [...members];
      membersCopy.push(input);
      setAdded(true);
      setMembers(membersCopy);
      setInput('');
    } else if (name === 'dayOf') {
      setDayOfEntered(true);
    } else if (name === 'qotd') {
      setQotdEntered(true);
    }
  };

  const disp = () => {
    randomizer(members);
  };

  const randomizer = (members) => {
    const membersCopy = [...members];
    let len = membersCopy.length,
      temp,
      randomIndex;
    while (len) {
      randomIndex = Math.floor(Math.random() * len--);
      temp = membersCopy[len];
      membersCopy[len] = membersCopy[randomIndex];
      membersCopy[randomIndex] = temp;
    }
    setRandomized(membersCopy);
    setDisplay(true);
  };

  const todayIs = getDate();
  return (
    <div className='wrapper'>
      <section className='date-section'>
        <h1>Morning Stand UP</h1>
        <h2>
          {todayIs.month} {todayIs.day} {todayIs.date}, {todayIs.year}
        </h2>
      </section>
      <section className='dayof-qotd'>
        <div className='day-qotd-container'>
          {dayOfEntered ? (
            <div className='dayof-display'>National {dayOf} Day</div>
          ) : (
            <>
              <input
                className='dayOf'
                name='dayOf'
                type='text'
                placeholder='National Day of...'
                onChange={(e) => handleInputChange(e)}
              />
              <button
                type='submit'
                onClick={(e) => handleButton(e)}
                name='dayOf'
              >
                Enter
              </button>
            </>
          )}
        </div>
        <div className='day-qotd-container'>
          {qotdEntered ? (
            <div className='dayof-display'>{qotd}</div>
          ) : (
            <>
              <input
                className='qotd'
                name='qotd'
                type='text'
                placeholder='Question of the Day'
                onChange={(e) => handleInputChange(e)}
              />
              <button
                type='submit'
                onClick={(e) => handleButton(e)}
                name='qotd'
              >
                Enter
              </button>
            </>
          )}
        </div>
      </section>
      <main className='container'>
        <section className='inputBox'>
          <form onSubmit={(e) => handleButton(e)}>
            <div className='buttonContainer'>
              <input
                name='input'
                onChange={(e) => handleInputChange(e)}
                placeholder="Developer's Name"
                value={input}
              />
              <button type='submit' onClick={(e) => handleButton(e)} name='add'>
                Add
              </button>
            </div>
          </form>
          {added && (
            <ul>
              {members.map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          )}
        </section>

        <section className='outputBox'>
          <div className='buttonContainer'>
            <button className='randomButton' onClick={disp}>
              Randomize
            </button>
          </div>
          <div className='randomList'>
            {display && (
              <ol className='orderedList'>
                {randomized.map((member, index) => (
                  <div key={index}>
                    <li className='name'>{member}</li>
                  </div>
                ))}
                {lateAdditions.map((member, index) => (
                  <li key={index} onClick={(e) => handleMemberClick(e)}>
                    {member}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
