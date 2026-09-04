import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Student(prop){
    return(
        <div>
            <h1>student profile</h1>
            <h2>name:{prop.name}</h2>
            <p>course:{prop.course}</p>
            <p>college:{prop.college}</p>

        </div>
    );
}
function Astudent(){
    return(
        <div>
        <Student  name="Himansu Sekhar Mishra"
                 course="CSE AI & ML"
                 college="GIETU"
        />
        <Student name="Debasish Tripathy"
                course="CSE AI & ML"
                college="GIETU"
        
        />
        </div>
    );

}
export default Astudent;