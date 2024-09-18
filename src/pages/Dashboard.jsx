import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSpinLeft, setTotalScore } from '../redux/userinfoSlice';
import axios from 'axios';
import { BaseUrl } from '../utils/Urls';

const Dashboard = () => {
  const wheelRef = useRef(null);
  const messageRef = useRef(null);
  const [result, setResult] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showAddSpinMessage, setShowAddSpinMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const numbers = [1, 2, 10, -10, -15, 50, -50, 100, -100];
  const positive = [10,50,100]
  const negative = [-10,-15,-50,-100]
  const saveddata = useSelector((state) => state.authuser);
  const id = saveddata.id;
  const totalspinleft = saveddata.spinleft;

  const getRandomNumber = () => {
     let randomIndex=0
      if(saveddata.totalScore <= 500 && saveddata.totalScore >= 380){
           randomIndex = 8
           return numbers[randomIndex];
        }
        randomIndex = Math.floor(Math.random() * positive.length);
        return positive[randomIndex];
  };

  useEffect(() => {
    const savescore = async () => {
      try {
        const resultback = await axios.post(`${BaseUrl}/api/updatedetailsById/${id}`, { result }, {
          withCredentials: true,
          credentials: true,
        });
        if (resultback.data.status) {
          dispatch(setSpinLeft(resultback.data.data.spinleft));
          dispatch(setTotalScore(resultback.data.data.score));
          return;
        }
      } catch (error) {
      }
    };
    if (result !== null) {
      savescore();
      setIsSpinning(false);
    }
  }, [result]);

  const handleSpinError = () => {
    setShowAddSpinMessage(true);
  };

  const spinWheel = async () => {
    if (totalspinleft <= 0) {
      handleSpinError();
      return;
    }

    const randomNumber = getRandomNumber();
    const anglePerSegment = 360 / numbers.length;
    const segmentAngle = numbers.indexOf(randomNumber) * anglePerSegment;
    const totalRotation = rotation + 360 * 20 + segmentAngle;

    setResult(null);
    setIsSpinning(true);

    const segments = document.querySelectorAll('.wheel-segment');
    segments.forEach(segment => {
      segment.classList.remove('highlight');
      segment.style.background = `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 100%)`;
    });

    gsap.to(wheelRef.current, {
      rotation: totalRotation,
      duration: 20,
      ease: 'power4.out',
      onComplete: () => {
        setResult(randomNumber);
        const winningSegment = document.querySelector(`.wheel-segment[data-number="${randomNumber}"]`);
        if (winningSegment) {
          winningSegment.classList.add('highlight');
          winningSegment.style.background = `radial-gradient(circle, rgba(139,0,0,0.8) 0%, rgba(139,0,0,0.6) 70%)`;
        }
      },
    });

    setRotation(totalRotation);
  };

  const handleOkClick = () => {
    const segments = document.querySelectorAll('.wheel-segment');
    segments.forEach(segment => {
      segment.classList.remove('highlight');
      segment.style.background = `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 100%)`;
    });
    setResult(null);
  };

  useEffect(() => {
    if (result !== null && messageRef.current) {
      gsap.fromTo(messageRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: -50,
          rotateX: 45,
          rotateY: 45,
          rotateZ: 0,
          perspective: 1000,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          duration: 1.5,
          ease: 'bounce.out',
          onComplete: () => {
            gsap.to('.surprise', {
              scale: 1.5,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'elastic.out(1, 0.3)',
            });
            gsap.to('.star', {
              scale: 1.2,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'elastic.out(1, 0.3)',
            });
          },
        }
      );
    }
  }, [result]);

  return (
    <div className="relative mt-[-100px] flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Add Spin Message */}
      {showAddSpinMessage && (
        <div
          className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 z-50 p-6"
          style={{ perspective: '1500px' }}
        >
          <div
            className="relative flex flex-col justify-center items-center text-center p-8 rounded-lg bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 text-white shadow-xl transform rotateX-12 rotateY-8"
            ref={messageRef}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-500 to-purple-300 rounded-lg opacity-30"></div>
            <div className="relative z-10 text-3xl font-bold mb-6">
              <span role="img" aria-label="warning">⚠️</span> Out of Spins!
            </div>
            <p className="text-lg mb-6">
              You have no spins left. Add more spins to continue playing.
            </p>
            <button
              onClick={() => navigate('/addmoney')}
              className="px-8 py-3 bg-yellow-500 text-purple-900 font-bold rounded-lg shadow-lg hover:bg-yellow-400 transition duration-300 transform hover:scale-105"
            >
              Add Spins
            </button>
          </div>
        </div>
      )}

      {/* Result Message */}
      {result !== null && (
        <div ref={messageRef} className="relative flex flex-col justify-center items-center mb-10 text-center mx-7 text-2xl font-bold bg-green-700 px-6 py-3 rounded-lg shadow-lg bg-gradient-to-r from-green-800 via-green-600 to-green-400 transform rotate-[-5deg] skew-y-[-5deg] animate-float">
          <div className="absolute top-0 left-0 w-10 h-10 bg-yellow-400 rounded-full surprise"></div>
          <div className="absolute top-0 right-0 w-12 h-12 bg-pink-400 rounded-full star"></div>
          <div className="absolute bottom-0 left-0 w-10 h-10 bg-purple-500 rounded-full surprise"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-300 rounded-full star"></div>
          <div className="relative z-10">
            🎉 Congratulations! <br /> You got: <br /> {result} 🎉
          </div>
          <button onClick={handleOkClick} className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-300">OK</button>
        </div>
      )}

      {/* Wheel Container */}
      <div className="relative w-64 h-64 rounded-full shadow-2xl">
        <div
          ref={wheelRef}
          className="absolute inset-0 flex justify-center items-center rounded-full border-8 border-purple-900 bg-gradient-to-r from-purple-600 to-pink-600"
          style={{ transformStyle: 'preserve-2d', perspective: '1000px', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}
        >
          {numbers.map((num, i) => (
            <div
              key={i}
              className="wheel-segment absolute text-2xl font-bold text-white flex items-center justify-center"
              data-number={num}
              style={{
                transform: `rotate(${i * (360 / numbers.length)}deg) translateY(-130px)`,
                transformOrigin: 'center center',
                background: `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 100%)`,
                border: '3px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                textShadow: '0px 0px 5px rgba(0,0,0,0.6)',
                color: 'white',
              }}
            >
              {num}
            </div>
          ))}

          <div className="absolute w-16 h-16 text-purple-900 font-bold text-2xl bg-yellow-400 rounded-full shadow-lg border-2 border-white flex justify-center items-center">SPIN</div>
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={() => {
          if (totalspinleft > 0) {
            spinWheel();
          } else {
            handleSpinError();
          }
        }}
        className={`mt-20 px-10 py-3 bg-yellow-400 text-purple-900 font-bold rounded-full text-xl shadow-lg hover:bg-yellow-300 transition duration-300 ${isSpinning ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isSpinning}
      >
        Spin the Wheel!
      </button>
    </div>
  );
};

export default Dashboard;
