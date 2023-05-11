import React from 'react';
import ListMentor from '../components/ListMentor';
import GridMentor from '../components/GridMentor';
import { useStateValue } from "store/context";

function mentors() {
  const [ {gridState} ] = Object.values(useStateValue())
  console.log(gridState)
  return (
    <div>
     {gridState.showGrid !== false ? (
      <GridMentor />
     ) : (
      <ListMentor />
     )}
    </div>
  )
}

export default mentors