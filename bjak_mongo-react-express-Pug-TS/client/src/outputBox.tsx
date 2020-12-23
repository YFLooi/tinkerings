import './App.css';
import { useState, useRef, FunctionComponent } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap'; 

//React TS files saved as .tsx, vanilla TS files saved as .ts

//This type declaration interface applies to props being passed in
//Type declarations examples for each data type
//Optional fields marked with "?". These don't need to be included in props
interface Props{
  output: (FunctionComponent | string)[];
  bannerText?: string;
  trueFalse?: boolean;
  counter?: number;
  customType?: CustomType;
  dataArray: number[];
  dataObject: object;
  handleFunction: (p1: string, p2: number[]) => void
}
interface CustomType{
  firstName: string;
  lastName: string;
}


//Ref: https://www.youtube.com/watch?v=Z5iWr6Srsj8&ab_channel=BenAwad
//If you'd like to include all Props{}, just place {} inside ()
const OutputBox: React.FC<Props> = (props) => {
  //Declaring type using arrow syntax
  const [count, setCount] = useState<number | null>(5);
  //Declaring interface within arrow syntax
  const [string, setString] = useState<{text:string}>({text: "startup"});
  
  //Hover over ref property to determine correct type
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null);

  setCount(null);
  setString({text: "running"})

  //The type of each event here is obtained by hovering over onChange and onClick
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(`Attempted input into ${event.target.id}`)
  }
  const handleInputSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
    console.log(`"Submit" button clicked!`)
  }

  return (
    <>
      <div ref={containerRef}>
        <input id= "dummyInput" ref={inputRef} onChange={handleInputChange} value={string["text"]}/>
        <button onClick={handleInputSubmit}>Submit</button>
      </div>
      <div id="outputBox">{props.output}</div>
    </>
  );
}

export default OutputBox;
