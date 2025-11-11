import React, { useEffect } from 'react'
import './index.css'
import { useState,useRef } from 'react';
import { Navigate } from "react-router-dom";


export default  function Dashboard({ socket,isLoggedIn, setIsLoggedIn,userdata,setUserData,frData }) {


  console.log(userdata);
 // userdata.process.courses[indeex].Actv[ii]
 

  let handleStart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  
      intervalRef.current = setInterval(() => {
      totalSecondsRef.current += 1;  
      const hourss = Math.floor(totalSecondsRef.current / 3600);
      const remainingSeconds = totalSecondsRef.current % 3600;
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      setActualH(`${hourss}h. ${minutes}min. ${seconds}sec.`);
    }, 1000);
  };
  
  let handleStop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  let actvHandling =  ({lvl,actv,msg,username,email,password}) =>{
    setActvsEvent('flex');
    //console.log({ lvl,actv,msg,username,email,password });
    socket.emit('runActv',{ lvl,actv,msg,username,email,password });
  }

  socket.on('hoursStatus', async ({ status, hours }) => {
    // Parse the input string to extract hours and minutes
    const match = hours.match(/(\d+)h\. (\d+)min\./);
    if (!match) {
      throw new Error("Invalid time format");
    }
  
    const hourss = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const seconds = 0;  
    // Convert the time into total seconds and persist it in the ref
    totalSecondsRef.current = hourss * 3600 + minutes * 60 + seconds;
  
    setActualH(`${hourss}h. ${minutes}min. ${seconds}sec.`);
    setLoadingHEvent('hidden');
  
    handleStart(); // Start the interval
  });

  socket.on('actvMsg',async({msg,status})=>{

       setActvMsg(msg);
       if (status){
        setActvsEvent('hidden');
       }

  });

 

  socket.on('actvStatus',async(msg)=>{
  
    setActvStatus(msg);
    if (msg ==='Done'){
      setActvStatus('wait a moment...');
      setActvsEvent('hidden');

    }
   
   
  });
  

  const [hoursBtn,setHoursBtn] = useState(false);
  const [email,setEmail] = useState(userdata.email);
  const [password,setPassword] = useState(userdata.password);
  const [activeLevel,setActiveLevel] = useState('A1-');
  const [hoursEvent,setHoursEvent]= useState('hidden');
  const [loadingHEvent,setLoadingHEvent] = useState('flex');

  const [hoursC,setHoursC] = useState('');
  const [actualH,setActualH] = useState('');
  const [hInterval,setHInterval] = useState(null);

  const [actvsEvent,setActvsEvent] = useState('hidden');
  const [loadingAEvent,setLoadingAEvent] = useState('flex');
  const [actvMsg,setActvMsg] = useState('loading the modules');
  const [actvStatus,setActvStatus] = useState('wait a moment...');

  const intervalRef = useRef(null);
  const totalSecondsRef = useRef(0); // Ref to persist totalSeconds

  useEffect(()=>{


    let toggleBtns = document.querySelectorAll('.activityBtn');
    
    let toggleContents = document.querySelectorAll('.activitiesC');
  
    toggleBtns.forEach(  (btn, index) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        toggleContents[index].classList.toggle('hidden'); 
        toggleContents[index].classList.toggle('flex');

      });
    });

    let levelBtns =  document.querySelectorAll('button.levelBtns');
    let levelsC = document.querySelectorAll('div.levels');

    levelBtns.forEach(  (btn, index) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault(); 
        [...levelsC].map((level)=>{
          level.classList.add('hidden'); 
        });
        [...levelBtns].map((btnn)=> btnn.classList.remove('btnClick'));
        levelsC[index].classList.toggle('hidden'); 
        levelsC[index].classList.toggle('flex');
        btn.classList.add('btnClick');


      });
    });




   },[]);

   useEffect(()=>{
        if (hoursBtn){
              setHoursEvent('flex');
        }else{
          setHoursEvent('hidden');
        }

        // if ( hInterval) {
        //   console.log('clear');
        //   clearInterval(hInterval);
        //   setHInterval(null); // Reset interval state
        // }
   },[hoursBtn]);


  
  return (
  <>    
    <div className="h-screen w-full flex flex-col ">
        <nav className='flex w-full align-middle text-center justify-between p-4  bg-gray-50  ' >
         <h1 className='py-1 sm:py-2 text-center align-middle justify-center font-semibold capitalize text-xs sm:text-sm lg:text-lg '>bonjour {userdata?.username?.toLowerCase()}</h1>
          <ul className='flex gap-9 justify-center text-center align-middle content-center '>
          <li className='bg-[#1c4072] text-white py-2 px-2 lg:py-2 lg:px-5 rounded-full border-white border-0 hover:scale-95 hover:opacity-85 duration-200'>
            <button className={`${hoursBtn? 'hidden':'block'}   text-xs sm:text-sm lg:text-lg`} onClick={()=>{socket.emit('runHours',{username:userdata?.username?.toLowerCase(),email,password}); setHoursBtn(!hoursBtn)  }} >Add hours</button>
          <button className={`${hoursBtn? 'block':'hidden'}  text-xs sm:text-sm lg:text-lg`} onClick={()=>{socket.emit('stopHours',{username:userdata?.username?.toLowerCase()},email,password); setHoursBtn(!hoursBtn); setLoadingHEvent('flex'); handleStop()  }} >Stop Function</button>
            </li>

            {/* <li className='py-1  hover:scale-95 duration-200'>
                <a href='/'>Discord</a>
            </li> */}

            <li className='py-1 hover:scale-95 duration-200'>
                <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem('isLoggedIn');
                <Navigate to='/'/>;socket.disconnect(); console.log('logout'); }}> <i className="fa-solid fa-right-from-bracket"></i></button>
            </li>
          </ul>
        </nav>
          <section className='flex h-screen justify-center align-start   items-start  '>

                  <section className='w-full h-full flex flex-col justify-between '>
                      <section className={`${hoursEvent}  flex-col z-50  h-full w-full absolute `}>
                          <div id='loading' className={ ` ${loadingHEvent}  bg-gray-100 absolute z-50 w-full h-full  justify-center pb-32 items-center flex-col `} >
                            <lottie-player
                                src="https://lottie.host/d23a830a-429b-4e63-b5e7-3f03b1281d4d/tPYCTl1Vty.json"
                                background="##F3F4F6"
                                speed="1"
                                style={{ width: "150px", height: "150px" }}
                                loop
                                autoplay
                                direction="1"
                                mode="normal"
                                ></lottie-player>
                                <p className='font-semibold ' >{'in any second'}</p>
                          </div>
                          <div className='flex  bg-gray-100 absolute  w-full h-full  justify-center pb-32 items-center flex-col ' >
                              <p className='font-bold text-5xl'>{actualH}</p>
                          </div>
                      </section>  

                      <section className={`${actvsEvent}  flex-col z-50  h-full w-full absolute `}>
                          <div id='loading' className={ ` ${loadingAEvent}  bg-gray-100 absolute z-50 w-full h-full  justify-center pb-32 items-center flex-col `} >
                            <lottie-player
                                src="https://lottie.host/d23a830a-429b-4e63-b5e7-3f03b1281d4d/tPYCTl1Vty.json"
                                background="##F3F4F6"
                                speed="1"
                                style={{ width: "150px", height: "150px" }}
                                loop
                                autoplay
                                direction="1"
                                mode="normal"
                                ></lottie-player>
                                <p className='font-semibold ' >{actvStatus}</p>
                                <button className='mt-5 text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all btnClick hover:text-white hover:bg-[#1c4072] ' onClick={()=>location.reload()}>Stop</button>
                          </div>
                          <div className='hidden  bg-gray-100 absolute  w-full h-full  justify-center pb-32 items-center flex-col ' >
                              <p className='font-bold text-5xl'>{actualH}</p>
                           
                          </div>
                      </section>  

                      <section className="w-full h-full flex flex-col justify-start  gap-5 mt-9   ">
                        <div className='  w-full flex flex-wrap   justify-evenly gap-y-2' >
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all btnClick hover:text-white hover:bg-[#1c4072] levelBtns`} >
                                A1-
                            </button>
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all hover:text-white hover:bg-[#1c4072] levelBtns opacity-80  `} >
                                A1
                            </button>
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all hover:text-white hover:bg-[#1c4072] levelBtns opacity-80  `} >
                                A2
                            </button>
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all hover:text-white hover:bg-[#1c4072] levelBtns opacity-80  `} >
                                B1
                            </button>
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all hover:text-white hover:bg-[#1c4072] levelBtns opacity-80  `} >
                                B2
                            </button>
                            <button  className={ `text-[#1c4072] bg-transparent  border border-[#1c4072] px-6 py-1 rounded-[15px] transition-all hover:text-white hover:bg-[#1c4072] levelBtns opacity-80  `} >
                                C1
                            </button>
                        </div>

                        <div className='flex flex-col justify-between'>
                          {frData.map((level, indeex) => (
                            <div
                              key={`data${indeex}`}
                              name={level.level}
                              className={`${
                                indeex === 0 ? 'flex' : 'hidden'
                              } w-full h-full max-h-[90vh] flex-col gap-3 pb-8 mt-6 justify-start  overflow-y-auto custom-scrollbar levels`}
                            >
                            {level.activities.map((activity, ii) =>{  
                               return (
                                <div key={`activity${ii}`} className="activities  flex">
                                  <div className="mt-2 w-[90%] flex justify-center flex-col align-middle items-center bg-slate-400 rounded-md hover:bg-slate-300 duration-200">
                                    <button className="activityBtn">
                                      {activity.name}
                                    </button>
                                    <div className="activitiesC hidden ">
                                      {activity.modulesName.map((module, i) => (
                                        <div
                                          key={`module${i}`}
                                          onClick={(e) => {
                                            console.log(userdata.process.courses[indeex]);
                                            console.log(userdata.process.courses[indeex].Actv);
                                          //  console.log( userdata.process.courses[indeex].Actv[ii]);
                                            // Call the activity handler with required data
                                            actvHandling({
                                              lvl: level,
                                              actv: activity.name,
                                              msg: module,
                                              username: userdata?.username?.toLowerCase(),
                                              email: userdata?.email,
                                              password: userdata?.password,
                                            });

                                      
                                          //  setUserData(...userdata.process.courses[indeex].Actv[ii].match(/\d+/g)[0]+=1);
                                            // Update the clicked element
                                            e.currentTarget.classList.add('opacity-90');
                                            const lvlss = Array.from(document.querySelectorAll(`.activities:nth-of-type(${ii+1}) p.lvl `));
                                              
                                            // Ensure we find the correct `p.lvl` to add `lvlAc`
                                            lvlss.forEach((lvl, indexx) => {
                                              if (indexx == i) {
                                                console.log(indexx);
                                                console.log(lvl);
                                                lvl.classList.remove('lvlD');
                                                lvl.classList.add('lvlAc');
                                                lvl.classList.add('!bg-green-500')
                                              }
                                            });

                                          }}
                                          className={` ${  userdata?.process.courses[indeex].Actv[ii].match(/\d+/g)[0] >= i+1 ? 'opacity-90 ': ' cursor-pointer' } bg-slate-200 activity `}                                      >
                                          <div
                                            className="min-w-20 h-20 bg-cover bg-center rounded-full m-5"
                                            style={{
                                              backgroundImage: `url(${activity.modulesImg[i]})`,
                                            }}
                                          ></div>
                                          <p className="pt-8 flex justify-start">{module}</p>
                                          <p className={ ` ${ userdata.process.courses[indeex].Actv[ii].match(/\d+/g)[0] >= i+1 ? 'lvlAc': 'lvlD' } lvl pt-8 min-w-9 flex justify-center  rounded-r-xl font-semibold`}>
                                            0{i + 1}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                          )
                        }
                        )
                            }

                            </div>
                          ))}
                        </div>

                      </section>

                  </section>

           

          </section>      
 

    </div>
    </>

  );
}

