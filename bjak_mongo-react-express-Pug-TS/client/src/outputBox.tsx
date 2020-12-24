import './App.css';
import { useState, useRef, FunctionComponent } from 'react';
import { Button } from 'react-bootstrap'; 

//React TS files saved as .tsx, vanilla TS files saved as .ts

//This type declaration interface applies to the "props" property being passed in
//Type declarations examples for each data type
//interface Props{} === type Props{} 
//Optional fields marked with "?". These don't need to be included in props
interface Props{
  output: (FunctionComponent | string)[];
  bannerText?: string;
  trueFalse?: boolean;
  counter?: number;
  customType?: CustomType;
  dataArray?: number[];
  dataObject?: object;
  handleFunction?: (p1: string, p2: number[]) => void
}
interface CustomType{
  firstName: string;
  lastName: string;
}


//Ref: https://www.youtube.com/watch?v=Z5iWr6Srsj8&ab_channel=BenAwad
//Ref: https://www.youtube.com/watch?v=F2JCjVSZlG0&ab_channel=freeCodeCamp.org 
//If you'd like to include all Props{}, just place {} inside ()
const OutputBox: React.FC<Props> = ({ output }) => {
  //Declaring type using arrow syntax
  const [count, setCount] = useState<number | null>(5);
  //Declaring interface within arrow syntax
  const [string, setString] = useState<{text:string}>({text: "startup"});
  
  //Hover over ref property to determine correct type
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  //setCount(null);
  //setString({text: "running"})

  //The type of each event here is obtained by hovering over onChange and onClick
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(`Attempted input into ${event.target.id}`)
  }
  const handleInputSubmit = ():void => {
    console.log(`"Submit" button clicked!`)
  }

  return (
    <div>
      <h2>Child output from outputBox.tsx</h2>
      <div ref={containerRef}>
        <input id= "dummyInput" ref={inputRef} onChange={(event) => {handleInputChange(event);}} value={string["text"]}/>
        <Button onClick={(event) => {handleInputSubmit();}}>Submit</Button>
      </div>
      
      {/**
       * Notice the different way to pass props here in TS? 
       * With vanilla React, its props.propName
       * With TS, you first declare the prop's Type then bind it to the functional component (FC)
       * The prop itself must be declared in an object inside the the FC's properties. 
       * Only then can the prop be called in the FC
       * */}
      <div id="outputBox">{output}</div>
    </div>
  );
}

export default OutputBox;
